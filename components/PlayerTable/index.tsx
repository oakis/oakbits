import { formatDate } from "@/utils/date";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../Table";
import Pagination from "../Table/Pagination";
import { Props } from "@/pages/player/config";

const twoDecimals = (num: number): string | number =>
  num === 0 ? "-" : num.toFixed(2);

const PlayerTable = ({ players, totalPlayers, defaultPageSize }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow index={0} classes="bg-slate-600 text-slate-100">
          <TableHeadCell classes="!text-left">Licensnr.</TableHeadCell>
          <TableHeadCell classes="!text-left">Förnamn</TableHeadCell>
          <TableHeadCell classes="!text-left">Efternamn</TableHeadCell>
          <TableHeadCell>Födelsedatum</TableHeadCell>
          <TableHeadCell classes="!text-left">Distrikt</TableHeadCell>
          <TableHeadCell classes="!text-left">Förening</TableHeadCell>
          <TableHeadCell classes="!text-left">Licenstyp</TableHeadCell>
          <TableHeadCell>Spelstyrka</TableHeadCell>
          <TableHeadCell>Snitt</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {players.map((player, i) => (
          <TableRow key={player.licNbr} index={i + 1}>
            <TableCell classes="!text-left">
              <a href={`/player/${player.licNbr}`}>{player.licNbr}</a>
            </TableCell>
            <TableCell classes="!text-left">{player.firstName}</TableCell>
            <TableCell classes="!text-left">{player.surName}</TableCell>
            <TableCell>{formatDate(player.age)}</TableCell>
            <TableCell classes="!text-left">{player.county}</TableCell>
            <TableCell classes="!text-left">{player.clubName}</TableCell>
            <TableCell classes="!text-left">{player.licTypeName}</TableCell>
            <TableCell>{twoDecimals(player.licenceSkillLevel)}</TableCell>
            <TableCell>{twoDecimals(player.licenceAverage)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <tfoot>
        <TableRow index={0} classes="bg-slate-600 text-slate-100">
          <TableCell colSpan={9}>
            <Pagination total={totalPlayers} defaultSize={defaultPageSize} />
          </TableCell>
        </TableRow>
      </tfoot>
    </Table>
  );
};

export default PlayerTable;
