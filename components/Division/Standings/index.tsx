import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableHeader,
} from "@/components/Table";
import { Standing } from "@/types";
import clsx from "clsx";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { getTeamUrl, isSelectedTeam } from "@/utils";
import HeaderText from "@/components/HeaderText";
import ClubLogo from "@/components/ClubLogo";

interface Props {
  standings: Standing[];
  team: string;
  season: string;
  divisionName: string;
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

const Standings = ({ standings, team, season, divisionName }: Props) => {
  return (
    <div>
      <HeaderText>
        {divisionName} {season}
      </HeaderText>
      <Table>
        <TableHead>
          <TableHeader>
            <TableHeadCell classes="!text-left">Lag</TableHeadCell>
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
              <TableCell classes="!text-left">
                <span className="flex items-center">
                  <span className="flex items-center gap-3">
                    <ClubLogo
                      type="fixed"
                      height={32}
                      width={32}
                      id={standing.clubTeamClubId}
                      name={standing.standingsTeamName}
                    />
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
                    <MdOutlineArrowDropUp
                      size={32}
                      className="text-green-400"
                    />
                  )}
                  {hasDemotion(i, standings) && (
                    <MdOutlineArrowDropDown
                      size={32}
                      className="text-red-400"
                    />
                  )}
                </span>
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
    </div>
  );
};

export default Standings;
