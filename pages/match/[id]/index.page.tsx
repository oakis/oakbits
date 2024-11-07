import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  Props,
  Params,
  GameStatsData,
  PlayerStats,
  IScores,
  GameInfo,
  GameStats,
  Series,
  Board,
} from "./config";
import Main from "@/components/Main";
import Results from "@/components/Match/Results";
import Team from "@/components/Match/Team";
import Stats from "@/components/Match/Stats";
import Boards from "@/components/Match/Boards";

export const getServerSideProps = (async (context) => {
  const { id } = context.params!;
  const apiKey = process.env.APIKEY;

  const gameInfo: GameInfo = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetHeadInfo?APIKey=${apiKey}&id=${id}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const gameStatsData: GameStatsData = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetHeadResultInfo?APIKey=${apiKey}&id=${id}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const gameStats: GameStats = gameStatsData.awayHeadDetails.map((_, i) => ({
    series: gameStatsData.homeHeadDetails[i].squadId,
    homeRp: gameStatsData.homeHeadDetails[i].teamRP,
    awayRp: gameStatsData.awayHeadDetails[i].teamRP,
    awayScore: gameStatsData.awayHeadDetails[i].teamScore,
    homeScore: gameStatsData.homeHeadDetails[i].teamScore,
  }));

  const scoresData: IScores = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetMatchScores?APIKey=${apiKey}&matchId=${id}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const createDynamicGroups = (dataArray: Series[]): Series[] => {
    if (dataArray.length === 0 || dataArray[0].boards.length === 0) return [];
    const mappedData = dataArray.map((serie) => {
      const numOfPlayers = serie.boards[0].scores.length;

      const newBoards: Board[] = Array.from(
        { length: numOfPlayers },
        (_, i) => ({
          scores: serie.boards.map((board) => board.scores[i]),
          boardId: "",
          boardName: "",
        })
      );

      return {
        ...serie,
        boards: newBoards,
      };
    });

    return mappedData;
  };

  const scores: IScores = {
    ...scoresData,
    series: createDynamicGroups(scoresData.series),
  };

  const playerStats: PlayerStats = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetMatchResults?APIKey=${apiKey}&matchId=${id}&matchSchemeId=${gameInfo.matchSchemeId}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  return {
    props: { gameStats, playerStats, scores, gameInfo },
  };
}) satisfies GetServerSideProps<Props, Params>;

export default function Page({
  gameInfo,
  gameStats,
  playerStats,
  scores,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Main>
      <div className="flex w-full sm:justify-between justify-center gap-4 overflow-hidden">
        <Team
          teamName={gameInfo.matchHomeTeamName}
          clubId={gameInfo.matchHomeClubId}
        />
        <Results gameInfo={gameInfo} gameStats={gameStats} />
        <Team
          teamName={gameInfo.matchAwayTeamName}
          clubId={gameInfo.matchAwayClubId}
        />
      </div>
      {gameStats.length !== 0 && (
        <>
          <Boards scores={scores} />
          <Stats
            homeOrAway="home"
            stats={playerStats.playerListHome}
            teamName={gameInfo.matchHomeTeamName}
          />
          <Stats
            homeOrAway="away"
            stats={playerStats.playerListAway}
            teamName={gameInfo.matchAwayTeamName}
          />
        </>
      )}
    </Main>
  );
}
