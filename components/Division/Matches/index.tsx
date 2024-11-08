import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableHeader,
} from "@/components/Table";
import clsx from "clsx";
import { getTeamUrl, isSelectedTeam } from "@/utils";
import Link from "next/link";
import HeaderText from "@/components/HeaderText";
import { Match } from "@/pages/division/[year]/[club]/[team]/[division]/config";
import useIsMobile from "@/hooks/useIsMobile";
import ClubLogo from "@/components/ClubLogo";

interface Props {
  matches: Match[][];
  team: string;
  header: string;
}

const Matches = ({ matches, team, header }: Props) => {
  const isMobile = useIsMobile();

  const formatDate = (str: string) => {
    const date = new Date(str);
    return Intl.DateTimeFormat("sv-SE", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const renderHomeTeam = (match: Match) => (
    <a
      className={isSelectedTeam(match.matchHomeTeamId, team) ? "font-bold" : ""}
      href={getTeamUrl(
        match.matchSeason,
        match.homeTeamClubId,
        match.matchHomeTeamId,
        match.matchDivisionId
      )}
      target="_blank"
    >
      {match.matchHomeTeamName}
    </a>
  );

  const renderAwayTeam = (match: Match) => (
    <a
      className={isSelectedTeam(match.matchAwayTeamId, team) ? "font-bold" : ""}
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
  );

  const renderOilPattern = (match: Match) =>
    match.matchOilPatternId !== 0 ? (
      <a
        href={`https://bits.swebowl.se/MiscDisplay/Oilpattern/${match.matchOilPatternId}`}
        target="_blank"
      >
        {match.matchOilPatternName}
      </a>
    ) : (
      match.matchOilPatternName
    );

  const renderAlleyLink = (match: Match) => (
    <a
      href={`https://bits.swebowl.se/seriespel?hallId=${match.matchHallId}`}
      target="_blank"
    >
      {match.matchHallName}
    </a>
  );

  return isMobile ? (
    <div className="flex flex-col items-center text-center gap-2 w-full">
      <HeaderText>{header}</HeaderText>
      {matches.map((round) => (
        <div className="flex flex-col gap-2 w-full" key={round[0].matchRoundId}>
          <h3 className="bg-slate-500 w-full text-white p-2">
            Omgång {round[0].matchRoundId}
          </h3>
          <div className="flex flex-col items-center gap-2">
            {round.map((match) => (
              <div
                key={match.matchId}
                className={clsx(
                  "flex flex-col items-center w-11/12 p-2 bg-slate-100 shadow-md border-slate-200 rounded-lg gap-y-1",
                  (isSelectedTeam(match.matchAwayTeamId, team) ||
                    isSelectedTeam(match.matchHomeTeamId, team)) &&
                    "border-slate-400"
                )}
                style={{
                  borderWidth:
                    isSelectedTeam(match.matchAwayTeamId, team) ||
                    isSelectedTeam(match.matchHomeTeamId, team)
                      ? 2
                      : 1,
                }}
              >
                <div className="flex justify-between w-full">
                  <span className="flex-1 items-center flex flex-col justify-center text-sm">
                    <div className="relative h-9 w-9">
                      <ClubLogo
                        id={match.homeTeamClubId}
                        name={match.matchHomeTeamName}
                        imageProps={{
                          fill: true,
                          sizes: "36px",
                          style: {
                            objectFit: "contain",
                            objectPosition: "center center",
                          },
                        }}
                      />
                    </div>
                    {renderHomeTeam(match)}
                  </span>
                  <div className="flex flex-col flex-1">
                    <span className="font-thin">
                      <Link href={`/match/${match.matchId}`}>
                        {formatDate(match.matchDateTime)}
                      </Link>
                    </span>
                    {match.matchHasBeenPlayed ? (
                      <span className="text-2xl font-semibold">
                        {match.matchVsResult}
                      </span>
                    ) : null}
                  </div>
                  <span className="flex-1 items-center flex flex-col justify-center text-sm">
                    <div className="relative h-9 w-9">
                      <ClubLogo
                        id={match.awayTeamClubId}
                        name={match.matchAwayTeamName}
                        imageProps={{
                          fill: true,
                          sizes: "36px",
                          style: {
                            objectFit: "contain",
                            objectPosition: "center center",
                          },
                        }}
                      />
                    </div>
                    {renderAwayTeam(match)}
                  </span>
                </div>
                <span className="text-sm">{renderOilPattern(match)}</span>
                <span className="text-sm">{renderAlleyLink(match)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <HeaderText>{header}</HeaderText>
      <Table autoHeight={matches.length <= 1}>
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
                className={clsx(
                  "border",
                  i % 2 === 0 && "bg-slate-100",
                  "h-20"
                )}
              >
                <TableCell>
                  <Link href={`/match/${match.matchId}`}>
                    {formatDate(match.matchDateTime)}
                  </Link>
                </TableCell>
                <TableCell>
                  {renderHomeTeam(match)} - {renderAwayTeam(match)}
                </TableCell>
                <TableCell>
                  {match.matchHasBeenPlayed ? match.matchVsResult : "-"}
                  <br />
                  <i className="text-xs">
                    {match.matchHasBeenPlayed
                      ? `(${match.matchHomeTeamScore} - ${match.matchAwayTeamScore})`
                      : null}
                  </i>
                </TableCell>
                <TableCell>{renderOilPattern(match)}</TableCell>
                <TableCell>{renderAlleyLink(match)}</TableCell>
                <TableCell>
                  {match.matchHallOnlineScoringUrl && (
                    <a href={match.matchHallOnlineScoringUrl} target="_blank">
                      Scoring
                    </a>
                  )}
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
