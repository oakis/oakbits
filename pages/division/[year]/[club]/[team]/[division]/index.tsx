import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Props, Params, Match } from "./config";
import Matches from "@/components/Division/Matches";
import Standings from "@/components/Division/Standings";
import Main from "@/components/Main";
import { MatchData, StandingData } from "@/types";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

// Gör Lag, Diff och P sticky i sidled. Övriga scrollbara.

export const getServerSideProps = (async (context) => {
  const { year, division } = context.params!;
  const apiKey = process.env.APIKEY;

  const flatMatches: MatchData[] = await fetch(
    `https://api.swebowl.se/api/v1/Match?APIKey=${apiKey}&divisionId=${division}&seasonId=${year}&matchStatus=`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const groupedMatches = flatMatches
    .map((m) => ({
      matchRoundId: m.matchRoundId,
      matchHasBeenPlayed: m.matchHasBeenPlayed,
      matchDivisionName: m.matchDivisionName,
      matchHomeTeamId: m.matchHomeTeamId,
      matchSeason: m.matchSeason,
      homeTeamClubId: m.homeTeamClubId,
      matchDivisionId: m.matchDivisionId,
      matchHomeTeamName: m.matchHomeTeamName,
      matchAwayTeamId: m.matchAwayTeamId,
      awayTeamClubId: m.awayTeamClubId,
      matchAwayTeamName: m.matchAwayTeamName,
      matchId: m.matchId,
      matchDateTime: m.matchDateTime,
      matchVsResult: m.matchVsResult,
      matchHomeTeamScore: m.matchHomeTeamScore,
      matchAwayTeamScore: m.matchAwayTeamScore,
      matchOilPatternId: m.matchOilPatternId,
      matchOilPatternName: m.matchOilPatternName,
      matchHallId: m.matchHallId,
      matchHallName: m.matchHallName,
      matchHallOnlineScoringUrl: m.matchHallOnlineScoringUrl,
    }))
    .reduce<Record<number, Match[]>>((acc, match) => {
      const { matchRoundId } = match;

      if (!acc[matchRoundId]) {
        acc[matchRoundId] = [];
      }

      acc[matchRoundId].push(match);

      return acc;
    }, {});

  const matches = Object.values(groupedMatches);

  const currentRoundIndex =
    matches.findIndex((matchArray) =>
      matchArray.some((match) => !match.matchHasBeenPlayed)
    ) ?? matches.length - 1;

  const currentRound =
    currentRoundIndex === -1 ? [] : matches[currentRoundIndex];
  const isNewRound = currentRound.every((match) => !match.matchHasBeenPlayed);

  const played = isNewRound
    ? matches[currentRoundIndex - 1] ?? []
    : currentRound.filter((match) => match.matchHasBeenPlayed) ?? [];
  const upcoming =
    currentRound.filter((match) => !match.matchHasBeenPlayed) ?? [];

  const standings: StandingData[] = await fetch(
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
    },
  };
}) satisfies GetServerSideProps<Props, Params>;

export default function Page({
  matches,
  standings,
  played,
  upcoming,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { team, year }: Pick<Params, "team" | "year"> = useParams();
  return (
    <>
      <Header />
      <Main>
        {played.length > 0 && (
          <Matches matches={[played]} team={team} header="Aktuella matcher" />
        )}
        <Standings
          standings={standings}
          team={team}
          season={year}
          divisionName={matches[0][0].matchDivisionName}
        />
        {upcoming.length > 0 && (
          <Matches matches={[upcoming]} team={team} header="Kommande matcher" />
        )}
        <Matches matches={matches} team={team} header="Alla matcher" />
      </Main>
    </>
  );
}
