import { Player } from "@/pages/match/[id]/config";
import Table from "./Table/Table";
import TableHead from "./Table/TableHead";
import TableHeadCell from "./Table/TableHeadCell";
import TableBody from "./Table/TableBody";
import TableRow from "./Table/TableRow";
import TableCell from "./Table/TableCell";

interface IPlayerStats {
  stats: Player[];
}

const MatchPlayerStats = ({ stats }: IPlayerStats) => {
  return (
    <Table>
      <TableHead>
        <TableHeadCell></TableHeadCell>
        <TableHeadCell classes="!text-left" colSpan={8}>
          Serier
        </TableHeadCell>
        <TableHeadCell classes="!text-left" colSpan={3}>
          Ranking
        </TableHeadCell>
      </TableHead>
      <TableHead>
        <TableHeadCell classes="!text-left">Spelare</TableHeadCell>
        <TableHeadCell>1</TableHeadCell>
        <TableHeadCell>2</TableHeadCell>
        <TableHeadCell>3</TableHeadCell>
        <TableHeadCell>4</TableHeadCell>
        <TableHeadCell>Resultat</TableHeadCell>
        <TableHeadCell>Antal</TableHeadCell>
        <TableHeadCell>BanP</TableHeadCell>
        <TableHeadCell>Placering</TableHeadCell>
        <TableHeadCell>RankP</TableHeadCell>
        <TableHeadCell>BanRP</TableHeadCell>
        <TableHeadCell>Totalt</TableHeadCell>
      </TableHead>
      <TableBody>
        {stats.map((row, i) => (
          <TableRow key={row.licNbr} index={i}>
            <TableCell classes="!text-left">
              {row.player.split("(")[0]}
              <br />({row.player.split("(")[1].replace(")", "")})
            </TableCell>
            <TableCell>{row.result1}</TableCell>
            <TableCell>{row.result2}</TableCell>
            <TableCell>{row.result3}</TableCell>
            <TableCell>{row.result4}</TableCell>
            <TableCell>{row.totalResult}</TableCell>
            <TableCell>{row.totalSeries}</TableCell>
            <TableCell>{row.lanePoint}</TableCell>
            <TableCell>{row.place}</TableCell>
            <TableCell>{row.rankPoints.toFixed(2)}</TableCell>
            <TableCell>{row.laneRankPoints.toFixed(2)}</TableCell>
            <TableCell>{row.totalPoints.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MatchPlayerStats;
