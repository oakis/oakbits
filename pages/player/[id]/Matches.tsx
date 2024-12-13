import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { CompetitionGame } from "./config";
import { formatDate } from "@/utils/date";

interface MatchesProps {
  games: CompetitionGame[];
  gameType: "match" | "tournament";
  title: string;
}

const Matches = ({ games, gameType, title }: MatchesProps) => {
  if (!games.length) return null;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <Table autoHeight>
        <TableHead>
          <TableHeader>
            <TableHeadCell classes="!text-left">Tävling</TableHeadCell>
            <TableHeadCell>Placering</TableHeadCell>
            <TableHeadCell>Kategori</TableHeadCell>
            <TableHeadCell>Hall, Ort</TableHeadCell>
            <TableHeadCell>Lag</TableHeadCell>
            <TableHeadCell>Resultat</TableHeadCell>
            {gameType === "tournament" && <TableHeadCell>HCP</TableHeadCell>}
            <TableHeadCell>Antal serier</TableHeadCell>
            <TableHeadCell>Snitt</TableHeadCell>
            <TableHeadCell>Datum</TableHeadCell>
          </TableHeader>
        </TableHead>
        <TableBody>
          {games.map((game, i) => (
            <TableRow key={game.id} index={i}>
              <TableCell classes="!text-left">{game.name}</TableCell>
              <TableCell>{game.placement}</TableCell>
              <TableCell>{game.category}</TableCell>
              <TableCell>{game.location}</TableCell>
              <TableCell>{game.team}</TableCell>
              <TableCell>{game.result}</TableCell>
              {gameType === "tournament" && <TableCell>{game.hcp}</TableCell>}
              <TableCell>{game.numSeries}</TableCell>
              <TableCell>{game.avg}</TableCell>
              <TableCell>{formatDate(game.startDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Matches;
