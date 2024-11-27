import clsx from "clsx";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/Table";
import { GameInfo, GameStats } from "@/pages/match/[id]/config";

interface Props {
  gameInfo: GameInfo;
  gameStats: GameStats;
}

const Results = ({ gameInfo, gameStats }: Props) => {
  return (
    gameStats.length !== 0 && (
      <Table autoHeight classes="max-w-md" wrapperClasses="w-auto">
        <TableHead>
          <tr>
            <TableHeadCell>BanP</TableHeadCell>
            <TableHeadCell>KägelP</TableHeadCell>
            <TableHeadCell>Serie</TableHeadCell>
            <TableHeadCell>KägelP</TableHeadCell>
            <TableHeadCell>BanP</TableHeadCell>
          </tr>
        </TableHead>
        <TableBody>
          {gameStats.map((row, i) => (
            <TableRow
              key={row.series}
              index={i}
              classes="rounded-3xl border-none"
            >
              <TableCell
                classes={clsx(
                  row.homeRp >= row.awayRp && "font-bold",
                  i === 0 && "rounded-tl-3xl"
                )}
              >
                {row.homeRp}
              </TableCell>
              <TableCell
                classes={clsx(row.homeScore >= row.awayScore && "font-bold")}
              >
                {row.homeScore}
              </TableCell>
              <TableCell classes="text-2xl">{row.series}</TableCell>
              <TableCell
                classes={clsx(row.homeScore <= row.awayScore && "font-bold")}
              >
                {row.awayScore}
              </TableCell>
              <TableCell
                classes={clsx(
                  row.homeRp <= row.awayRp && "font-bold",
                  i === 0 && "rounded-tr-3xl"
                )}
              >
                {row.awayRp}
              </TableCell>
            </TableRow>
          ))}
          <TableRow index={0} classes="rounded-3xl border-none">
            <TableCell
              classes={clsx(
                gameInfo.matchHomeTeamResult >= gameInfo.matchAwayTeamResult &&
                  "font-bold",
                "rounded-bl-3xl"
              )}
            >
              {gameInfo.matchHomeTeamResult}
            </TableCell>
            <TableCell
              classes={clsx(
                gameInfo.matchHomeTeamScore >= gameInfo.matchAwayTeamScore &&
                  "font-bold"
              )}
            >
              {gameInfo.matchHomeTeamScore}
            </TableCell>
            <TableCell classes="text-2xl">Total</TableCell>
            <TableCell
              classes={clsx(
                gameInfo.matchHomeTeamScore <= gameInfo.matchAwayTeamScore &&
                  "font-bold"
              )}
            >
              {gameInfo.matchAwayTeamScore}
            </TableCell>
            <TableCell
              classes={clsx(
                gameInfo.matchHomeTeamResult <= gameInfo.matchAwayTeamResult &&
                  "font-bold",
                "rounded-br-3xl"
              )}
            >
              {gameInfo.matchAwayTeamResult}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  );
};

export default Results;
