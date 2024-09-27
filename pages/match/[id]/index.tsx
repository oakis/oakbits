import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Props, Params, GameStats } from "./config";
import Main from "@/components/Main";
import ClubLogo from "@/components/ClubLogo";

export const getServerSideProps = (async (context) => {
  const { id } = context.params!;
  const apiKey = process.env.APIKEY;

  const gameStats: GameStats = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetHeadInfo?APIKey=${apiKey}&id=${id}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const scores = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetMatchScores?APIKey=${apiKey}&matchId=${id}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const playerStats = await fetch(
    `https://api.swebowl.se/api/v1/matchResult/GetMatchResults?APIKey=${apiKey}&matchId=${id}&matchSchemeId=${gameStats.matchSchemeId}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  return {
    props: { gameStats, playerStats, scores },
  };
}) satisfies GetServerSideProps<Props, Params>;

export default function Page({
  gameStats,
  playerStats,
  scores,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Main>
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl">{gameStats.matchHomeTeamName}</h2>
          <ClubLogo
            id={gameStats.matchHomeClubId}
            name={gameStats.matchHomeTeamName}
            height={140}
            width={210}
          />
        </div>
        <div>score</div>
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl">{gameStats.matchAwayTeamName}</h2>
          <ClubLogo
            id={gameStats.matchAwayClubId}
            name={gameStats.matchAwayTeamName}
            height={140}
            width={210}
          />
        </div>
      </div>
    </Main>
  );
}
