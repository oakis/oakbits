import { Match } from "@/types";
import TableHeadCell from "./Table/TableHeadCell";
import TableCell from "./Table/TableCell";
import clsx from "clsx";
import TableHeader from "./Table/TableHeader";
import Table from "./Table/Table";
import TableHead from "./Table/TableHead";
import TableBody from "./Table/TableBody";
import { getTeamUrl, isSelectedTeam } from "@/utils";
import Link from "next/link";
import HeaderText from "./HeaderText";

interface IMatches {
  matches: Match[][];
  team: string;
  header: string;
}

const Matches = ({ matches, team, header }: IMatches) => {
  const formatDate = (str: string) => {
    const date = new Date(str);
    return Intl.DateTimeFormat("sv-SE", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const renderTeams = (match: Match) => (
    <>
      <a
        className={
          isSelectedTeam(match.matchHomeTeamId, team) ? "font-bold" : ""
        }
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
        className={
          isSelectedTeam(match.matchAwayTeamId, team) ? "font-bold" : ""
        }
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
    <div>
      <HeaderText>{header}</HeaderText>
      <Table>
        <TableHead>
          <TableHeader>
            <TableHeadCell>Tid</TableHeadCell>
            <TableHeadCell>Match</TableHeadCell>
            <TableHeadCell>Resultat</TableHeadCell>
            <TableHeadCell>Oljeprofil</TableHeadCell>
            <TableHeadCell>Hall</TableHeadCell>
            <TableHeadCell>Scoring</TableHeadCell>
          </TableHeader>
        </TableHead>
        {matches.map((round) => (
          <TableBody key={round[0].matchRoundId}>
            <tr className="sticky top-14">
              <th
                colSpan={7}
                className="p-4 text-left bg-slate-500 text-slate-100"
              >
                Omgång {round[0].matchRoundId}
              </th>
            </tr>
            {round.map((match, i) => (
              <tr
                key={match.matchId}
                className={clsx("border", i % 2 === 0 && "bg-slate-100", "h-20")}
              >
                <TableCell>
                  <Link href={`/match/${match.matchId}`}>
                    {formatDate(match.matchDateTime)}
                  </Link>
                </TableCell>
                <TableCell>{renderTeams(match)}</TableCell>
                <TableCell>
                  {match.matchHasBeenPlayed ? match.matchVsResult : "-"}
                  <br />
                  <i className="text-xs">
                    {match.matchHasBeenPlayed
                      ? `(${match.matchHomeTeamScore} - ${match.matchAwayTeamScore})`
                      : null}
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
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default Matches;
