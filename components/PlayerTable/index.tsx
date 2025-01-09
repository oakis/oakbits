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
import useSort from "@/hooks/useSort";

const twoDecimals = (num: number): string | number =>
  num === 0 ? "-" : num.toFixed(2);

const PlayerTable = ({
  players,
  totalPlayers,
  defaultPageSize,
  onSortCallback,
}: Props) => {
  const { items, handleSort, sortConfig } = useSort(players);

  const onSort = (value: string) => {
    if (onSortCallback) {
      handleSort(value);
      onSortCallback(sortConfig);
    } else {
      handleSort(value);
    }
  };

  const renderSortIcon = (key: string) =>
    sortConfig.key === key ? (
      <span className="text-xs">
        {sortConfig.direction === "desc" ? "▲" : "▼"}
      </span>
    ) : null;

  return (
    <Table>
      <TableHead>
        <TableRow index={0} classes="bg-slate-600 text-slate-100">
          <TableHeadCell onClick={() => onSort("licNbr")} classes="!text-left">
            Licensnr. {renderSortIcon("licNbr")}
          </TableHeadCell>
          <TableHeadCell
            onClick={() => onSort("firstName")}
            classes="!text-left"
          >
            Förnamn {renderSortIcon("firstName")}
          </TableHeadCell>
          <TableHeadCell onClick={() => onSort("surName")} classes="!text-left">
            Efternamn {renderSortIcon("surName")}
          </TableHeadCell>
          <TableHeadCell onClick={() => onSort("age")}>
            Födelsedatum {renderSortIcon("age")}
          </TableHeadCell>
          <TableHeadCell onClick={() => onSort("county")} classes="!text-left">
            Distrikt {renderSortIcon("county")}
          </TableHeadCell>
          <TableHeadCell
            onClick={() => onSort("clubName")}
            classes="!text-left"
          >
            Förening {renderSortIcon("clubName")}
          </TableHeadCell>
          <TableHeadCell
            onClick={() => onSort("licTypeName")}
            classes="!text-left"
          >
            Licenstyp {renderSortIcon("licTypeName")}
          </TableHeadCell>
          <TableHeadCell onClick={() => onSort("licenceSkillLevel")}>
            Spelstyrka {renderSortIcon("licenceSkillLevel")}
          </TableHeadCell>
          <TableHeadCell onClick={() => onSort("licenceAverage")}>
            Snitt {renderSortIcon("licenceAverage")}
          </TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((player, i) => (
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
