import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Props, Params } from "./config";
import Matches from "@/components/Matches";
import { Match } from "@/types";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { year, division, club, team } = context.params as Params;
  const apiKey = "62fcl8gPUMXSQGW1t2Y8mc2zeTk97vbd";

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

  const standings = await fetch(
    `https://api.swebowl.se/api/v1/Standing?APIKey=${apiKey}&divisionId=${division}&seasonId=${year}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  return {
    props: { matches, standings, params: { year, division, club, team } },
  };
};

export default function Page({
  matches,
  standings,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="container mx-auto flex justify-center py-8">
      <Matches matches={matches} team={params.team} />
    </main>
  );
}
