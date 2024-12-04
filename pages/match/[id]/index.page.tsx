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
import useIsMobile from "@/hooks/useIsMobile";
import { AlleyInfo } from "@/types";
import { FaTv } from "react-icons/fa";
import { fetchFromBits } from "@/utils/swebowl";

export const getServerSideProps = (async (context) => {
  const { id } = context.params!;

  const [gameInfo, gameStatsData, scoresData] = await Promise.all([
    (await fetchFromBits("matchResult/GetHeadInfo", `&id=${id}`)) as GameInfo,
    (await fetchFromBits(
      "matchResult/GetHeadResultInfo",
      `&id=${id}`
    )) as GameStatsData,
    (await fetchFromBits(
      "matchResult/GetMatchScores",
      `&matchId=${id}`
    )) as IScores,
  ]);

  console.log({ id, gameInfo, gameStatsData, scoresData });

  const gameStats: GameStats = gameStatsData.awayHeadDetails.map((_, i) => ({
    series: gameStatsData.homeHeadDetails[i].squadId,
    homeRp: gameStatsData.homeHeadDetails[i].teamRP,
    awayRp: gameStatsData.awayHeadDetails[i].teamRP,
    awayScore: gameStatsData.awayHeadDetails[i].teamScore,
    homeScore: gameStatsData.homeHeadDetails[i].teamScore,
  }));

  const createDynamicGroups = (dataArray: Series[]): Series[] => {
    if (dataArray.length === 0 || dataArray[0].boards.length === 0) return [];
    const mappedData = dataArray.map((serie) => {
      if (!serie.boards[0]) return serie;
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

  const playerStats: PlayerStats = await fetchFromBits(
    "matchResult/GetMatchResults",
    `&matchId=${id}&matchSchemeId=${gameInfo.matchSchemeId}`
  );

  let scoringUrl = null;

  if (!gameInfo.matchFinished) {
    await fetchFromBits(`Hall/${gameInfo.matchHallId}`).then(
      (json: AlleyInfo) => {
        scoringUrl = json.hallOnlineScoringUrl;
      }
    );
  }

  return {
    props: {
      gameStats,
      playerStats,
      scores,
      gameInfo,
      scoringUrl,
    },
  };
}) satisfies GetServerSideProps<Props, Params>;

export default function Page({
  gameInfo,
  gameStats,
  playerStats,
  scores,
  scoringUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isMobile = useIsMobile();
  return (
    <Main>
      {!gameInfo.matchFinished && (
        <div className="relative h-8">
          <div className="flex absolute top-0 left-0 w-full bg-slate-300 justify-center items-center p-4 font-bold text-xl gap-2">
            <span>Match ej avslutad</span>
            {scoringUrl && (
              <a href={scoringUrl} target="_blank">
                <FaTv />
              </a>
            )}
          </div>
        </div>
      )}
      {isMobile ? (
        <div className="flex flex-row w-full justify-around gap-4">
          <div className="flex flex-col gap-2 items-center w-full px-4">
            <span className="text-1xl uppercase">
              {gameInfo.matchDayFormatted} {gameInfo.matchTimeFormatted}
            </span>
            <h2 className="text-xl text-center">
              {gameInfo.matchHomeTeamName} - {gameInfo.matchAwayTeamName}
            </h2>
            <span className="text-4xl font-bold">{gameInfo.matchResult}</span>
            <Results gameInfo={gameInfo} gameStats={gameStats} />
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          <Team
            teamName={gameInfo.matchHomeTeamName}
            clubId={gameInfo.matchHomeClubId}
          />
          <div className="flex flex-col items-center">
            <span className="text-1xl uppercase">
              {gameInfo.matchDayFormatted} {gameInfo.matchTimeFormatted}
            </span>
            <span className="text-4xl font-bold">{gameInfo.matchResult}</span>
            <Results gameInfo={gameInfo} gameStats={gameStats} />
          </div>
          <Team
            teamName={gameInfo.matchAwayTeamName}
            clubId={gameInfo.matchAwayClubId}
          />
        </div>
      )}
      <>
        <div className="border border-slate-200" />
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
    </Main>
  );
}
