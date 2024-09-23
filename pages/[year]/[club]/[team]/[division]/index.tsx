import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Fragment, PropsWithChildren } from "react";
import { Props, Params, Match } from "./config";

const TableData = ({ children }: PropsWithChildren) => (
  <td className="p-4">{children}</td>
);

const TableHead = ({ children }: PropsWithChildren) => (
  <th className="p-4">{children}</th>
);

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
  const isSelectedTeam = (teamId: number) => teamId.toString() === params.team;

  const formatDate = (str: string) => {
    const date = new Date(str);
    return Intl.DateTimeFormat("sv-SE", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const getTeamUrl = (
    season: number,
    clubId: number,
    teamId: number,
    divisionId: number
  ) =>
    `https://bits.swebowl.se/team-detail?seasonId=${season}&clubId=${clubId}&teamId=${teamId}&divisionId=${divisionId}`;

  const renderTeams = (match: Match) => (
    <>
      <a
        className={isSelectedTeam(match.matchHomeTeamId) ? "font-bold" : ""}
        href={getTeamUrl(
          match.matchSeason,
          match.homeTeamClubId,
          match.matchHomeTeamId,
          match.matchDivisionId
        )}
        target="_blank"
      >
        {match.matchHomeTeamName}
      </a>{" "}
      -{" "}
      <a
        className={isSelectedTeam(match.matchAwayTeamId) ? "font-bold" : ""}
        href={getTeamUrl(
          match.matchSeason,
          match.awayTeamClubId,
          match.matchAwayTeamId,
          match.matchDivisionId
        )}
        target="_blank"
      >
        {match.matchAwayTeamName}
      </a>
    </>
  );

  return (
    <main className="container mx-auto flex justify-center">
      <table className="max-w-5xl">
        <tbody>
          {matches.map((round) => (
            <Fragment key={round[0].matchRoundId}>
              <tr className="border">
                <TableHead>Omgång {round[0].matchRoundId}</TableHead>
              </tr>
              <>
                {round.map((match) => (
                  <tr key={match.matchId} className="border">
                    <TableData>{formatDate(match.matchDateTime)}</TableData>
                    <TableData>{renderTeams(match)}</TableData>
                    <TableData>
                      {match.matchVsResult}
                      <br />({match.matchHomeTeamScore} -{" "}
                      {match.matchAwayTeamScore})
                    </TableData>
                    <TableData>
                      {match.matchOilPatternId !== 0 ? (
                        <a
                          href={`https://bits.swebowl.se/MiscDisplay/Oilpattern/${match.matchOilPatternId}`}
                          target="_blank"
                        >
                          {match.matchOilPatternName}
                        </a>
                      ) : (
                        match.matchOilPatternName
                      )}
                    </TableData>
                    <TableData>
                      <a
                        href={`https://bits.swebowl.se/match-detail?matchid=${match.matchId}`}
                        target="_blank"
                      >
                        {match.matchId}
                      </a>
                    </TableData>
                    <TableData>
                      <a
                        href={`https://bits.swebowl.se/seriespel?hallId=${match.matchHallId}`}
                        target="_blank"
                      >
                        {match.matchHallName}
                      </a>
                    </TableData>
                    <TableData>
                      <a href={match.matchHallOnlineScoringUrl} target="_blank">
                        Scoring
                      </a>
                    </TableData>
                  </tr>
                ))}
              </>
            </Fragment>
          ))}
        </tbody>
      </table>
    </main>
  );
}
