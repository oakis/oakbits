import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/Table";
import { Team } from "@/pages/club/[id]/config";

interface TeamsTableProps {
  teams: Team[];
}

const TeamsTable = ({ teams }: TeamsTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow index={0} classes="bg-slate-600 text-slate-100">
          <TableHeadCell classes="!text-left">Namn</TableHeadCell>
          <TableHeadCell classes="!text-left">Typ</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {teams.map((team, index) => (
          <TableRow key={team.id} index={index + 1}>
            <TableCell classes="!text-left">{team.name}</TableCell>
            <TableCell classes="!text-left">{team.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamsTable;
