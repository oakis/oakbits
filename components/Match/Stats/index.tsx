import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/Table";
import { Player } from "@/pages/match/[id]/config";

interface Props {
  stats: Player[];
  teamName: string;
  homeOrAway: "home" | "away";
}

const Stats = ({ stats, teamName, homeOrAway }: Props) => {
  return (
    <Table autoHeight>
      <TableHead>
        <TableRow
          index={0}
          color={homeOrAway === "home" ? "bg-red-50" : "bg-sky-50"}
        >
          <TableHeadCell classes="!text-left">{teamName}</TableHeadCell>
          <TableHeadCell classes="!text-left" colSpan={7}>
            Serier
          </TableHeadCell>
          <TableHeadCell classes="!text-left" colSpan={4}>
            Ranking
          </TableHeadCell>
        </TableRow>
      </TableHead>
      <TableHead>
        <TableRow index={1}>
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
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map((row, i) => (
          <TableRow
            key={row.licNbr}
            index={i}
            color={homeOrAway === "home" ? "bg-red-50" : "bg-sky-50"}
            classes="text-sm sm:text-base"
          >
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

export default Stats;
