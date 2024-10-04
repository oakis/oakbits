import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  Props,
  Params,
  GameStatsData,
  PlayerStats,
  Scores,
  GameInfo,
  GameStats,
  Series,
  BoardScore,
  Board,
} from "./config";
import Main from "@/components/Main";
import MatchResults from "@/components/MatchResults";
import MatchTeam from "@/components/MatchTeam";
import MatchPlayerStats from "@/components/MatchPlayerStats";
import MatchBoardScores from "@/components/MatchBoardScores";

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

  const scoresData: Scores = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetMatchScores?APIKey=${apiKey}&matchId=${id}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const createDynamicGroups = (dataArray: Series[]): Series[] => {
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

  const scores: Scores = {
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
  console.log(scores);
  return (
    <Main>
      <div className="flex w-full sm:justify-between justify-center gap-4">
        <MatchTeam
          teamName={gameInfo.matchHomeTeamName}
          clubId={gameInfo.matchHomeClubId}
        />
        <MatchResults gameInfo={gameInfo} gameStats={gameStats} />
        <MatchTeam
          teamName={gameInfo.matchAwayTeamName}
          clubId={gameInfo.matchAwayClubId}
        />
      </div>
      <MatchBoardScores scores={scores} />
      <MatchPlayerStats
        stats={playerStats.playerListHome}
        teamName={gameInfo.matchHomeTeamName}
      />
      <MatchPlayerStats
        stats={playerStats.playerListAway}
        teamName={gameInfo.matchAwayTeamName}
      />
    </Main>
  );
}
