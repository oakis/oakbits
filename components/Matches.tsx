import { Match } from "@/types";
import TableHead from "./Table/TableHead";
import TableCell from "./Table/TableCell";
import clsx from "clsx";

interface IMatches {
  matches: Match[][];
  team: string;
}

const Matches = ({ matches, team }: IMatches) => {
  const isSelectedTeam = (teamId: number) => teamId.toString() === team;

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
    <table className="table-auto max-w-6xl">
      <thead>
        <tr className="border sticky top-0 bg-slate-600 text-slate-100">
          <TableHead>Tid</TableHead>
          <TableHead>Match</TableHead>
          <TableHead>Resultat</TableHead>
          <TableHead>Oljeprofil</TableHead>
          <TableHead>Matchinfo</TableHead>
          <TableHead>Hall</TableHead>
          <TableHead>Scoring</TableHead>
        </tr>
      </thead>
      {matches.map((round) => (
        <tbody key={round[0].matchRoundId}>
          <tr className="sticky top-14">
            <th
              colSpan={7}
              className="p-4 text-left bg-slate-600 text-slate-100"
            >
              Omgång {round[0].matchRoundId}
            </th>
          </tr>
          {round.map((match, i) => (
            <tr
              key={match.matchId}
              className={clsx("border", i % 2 === 0 && "bg-slate-100")}
            >
              <TableCell>{formatDate(match.matchDateTime)}</TableCell>
              <TableCell>{renderTeams(match)}</TableCell>
              <TableCell>
                {match.matchVsResult}
                <br />
                <i className="text-xs">
                  ({match.matchHomeTeamScore} - {match.matchAwayTeamScore})
                </i>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <a
                  href={`https://bits.swebowl.se/match-detail?matchid=${match.matchId}`}
                  target="_blank"
                >
                  {match.matchId}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={`https://bits.swebowl.se/seriespel?hallId=${match.matchHallId}`}
                  target="_blank"
                >
                  {match.matchHallName}
                </a>
              </TableCell>
              <TableCell>
                <a href={match.matchHallOnlineScoringUrl} target="_blank">
                  Scoring
                </a>
              </TableCell>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
};

export default Matches;
