import TableHeadCell from "./Table/TableHeadCell";
import TableCell from "./Table/TableCell";
import TableHeader from "./Table/TableHeader";
import Table from "./Table/Table";
import { Standing } from "@/types";
import clsx from "clsx";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import TableHead from "./Table/TableHead";
import TableBody from "./Table/TableBody";
import { getTeamUrl, isSelectedTeam } from "@/utils";

interface IStandings {
  standings: Standing[];
  team: string;
  season: string;
}

const getPromotions = (standings: Standing[]) => {
  const result = standings.findIndex(
    (s) => s.standingsIsLastPositionBeforeDivider
  );
  return result;
};

const getDemotions = (standings: Standing[]) => {
  const result = standings.findLastIndex(
    (s) => s.standingsIsLastPositionBeforeDivider
  );
  return result;
};

const hasPromotion = (position: number, standings: Standing[]) =>
  position <= getPromotions(standings);

const hasDemotion = (position: number, standings: Standing[]) =>
  position > getDemotions(standings);

const Standings = ({ standings, team, season }: IStandings) => {
  return (
    <Table>
      <TableHead>
        <TableHeader>
          <TableHeadCell>Lag</TableHeadCell>
          <TableHeadCell>S</TableHeadCell>
          <TableHeadCell>V</TableHeadCell>
          <TableHeadCell>O</TableHeadCell>
          <TableHeadCell>F</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
          <TableHeadCell>Diff</TableHeadCell>
          <TableHeadCell>P</TableHeadCell>
        </TableHeader>
      </TableHead>
      <TableBody>
        {standings.map((standing, i) => (
          <tr
            key={standing.clubTeamClubId}
            className={clsx(
              "border",
              i % 2 === 0 && "bg-slate-100",
              standing.standingsDividerType === "S" &&
                "border-b-slate-800 border-b-2"
            )}
          >
            <TableCell classes="!text-left flex">
              <span className="flex items-center">
                <a
                  className={
                    isSelectedTeam(standing.standingsTeamId, team)
                      ? "font-bold"
                      : ""
                  }
                  href={getTeamUrl(
                    season,
                    standing.clubTeamClubId,
                    standing.standingsTeamId,
                    standing.divisionLeagueId
                  )}
                  target="_blank"
                >
                  {standing.standingsTeamName}
                </a>
              </span>
              {hasPromotion(i, standings) && (
                <MdOutlineArrowDropUp size={32} className="text-green-400" />
              )}
              {hasDemotion(i, standings) && (
                <MdOutlineArrowDropDown size={32} className="text-red-400" />
              )}
            </TableCell>
            <TableCell>{standing.standingsMatches}</TableCell>
            <TableCell>{standing.standingsWin}</TableCell>
            <TableCell>{standing.standingsDraw}</TableCell>
            <TableCell>{standing.standingsLoss}</TableCell>
            <TableCell>{standing.standingsTotal}</TableCell>
            <TableCell>{standing.standingsDiff}</TableCell>
            <TableCell>{standing.standingsPoints}</TableCell>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default Standings;
