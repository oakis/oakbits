import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  Props,
  Params,
  GameStatsData,
  PlayerStats,
  Scores,
  GameInfo,
  GameStats,
} from "./config";
import Main from "@/components/Main";
import ClubLogo from "@/components/ClubLogo";
import MatchResults from "@/components/MatchResults";

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

  console.log({ gameStats });

  const scores: Scores = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetMatchScores?APIKey=${apiKey}&matchId=${id}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

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
  console.log(gameInfo);
  return (
    <Main>
      <div className="flex w-full sm:justify-between justify-center gap-4">
        <div className="sm:flex flex-col items-center gap-3 hidden">
          <h2 className="text-2xl">{gameInfo.matchHomeTeamName}</h2>
          <ClubLogo
            id={gameInfo.matchHomeClubId}
            name={gameInfo.matchHomeTeamName}
            height={140}
            width={210}
          />
        </div>
        <MatchResults gameInfo={gameInfo} gameStats={gameStats} />
        <div className="sm:flex flex-col items-center gap-3 hidden">
          <h2 className="text-2xl">{gameInfo.matchAwayTeamName}</h2>
          <ClubLogo
            id={gameInfo.matchAwayClubId}
            name={gameInfo.matchAwayTeamName}
            height={140}
            width={210}
          />
        </div>
      </div>
    </Main>
  );
}
