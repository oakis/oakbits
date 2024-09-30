import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Props, Params } from "./config";
import Matches from "@/components/Matches";
import { Match } from "@/types";
import Standings from "@/components/Standings";
import Main from "@/components/Main";

export const getServerSideProps = (async (context) => {
  const { year, division, club, team } = context.params!;
  const apiKey = process.env.APIKEY;

  const flatMatches: Match[] = await fetch(
    `https://api.swebowl.se/api/v1/Match?APIKey=${apiKey}&divisionId=${division}&seasonId=${year}&matchStatus=`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const groupedMatches = flatMatches.reduce<Record<number, Match[]>>(
    (acc, match) => {
      const { matchRoundId } = match;

      if (!acc[matchRoundId]) {
        acc[matchRoundId] = [];
      }

      acc[matchRoundId].push(match);

      return acc;
    },
    {}
  );

  const matches = Object.values(groupedMatches);

  const currentRoundIndex =
    matches.findIndex((matchArray) =>
      matchArray.some((match) => !match.matchHasBeenPlayed)
    ) ?? matches.length - 1;

  const currentRound = matches[currentRoundIndex];
  const isNewRound = currentRound.every(
    (match) => !match.matchHasBeenPlayed
  );

  const played = isNewRound
    ? matches[currentRoundIndex - 1]
    : currentRound.filter((match) => match.matchHasBeenPlayed);
  const upcoming = currentRound.filter((match) => !match.matchHasBeenPlayed);

  const standings = await fetch(
    `https://api.swebowl.se/api/v1/Standing?APIKey=${apiKey}&divisionId=${division}&seasonId=${year}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  return {
    props: {
      matches,
      standings,
      played,
      upcoming,
      params: { year, division, club, team },
    },
  };
}) satisfies GetServerSideProps<Props, Params>;

export default function Page({
  matches,
  standings,
  params,
  played,
  upcoming,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Main>
      <Matches
        matches={[played]}
        team={params.team}
        header="Aktuella matcher"
      />
      <Standings
        standings={standings}
        team={params.team}
        season={params.year}
        divisionName={matches[0][0].matchDivisionName}
      />
      <Matches
        matches={[upcoming]}
        team={params.team}
        header="Kommande matcher"
      />
      <Matches matches={matches} team={params.team} header="Alla matcher" />
    </Main>
  );
}
