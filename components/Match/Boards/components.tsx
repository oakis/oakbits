import { Board, BoardScore, IScores } from "@/pages/match/[id]/config";
import clsx from "clsx";

interface HeaderProps {
  scores: IScores;
}

export const Header = ({ scores }: HeaderProps) => (
  <div className="flex flex-row justify-around w-full gap-4 relative">
    <div
      className="flex justify-center items-center font-bold absolute top-0 left-0 w-20"
      style={{ flex: "0 0 3rem" }}
    >
      Serie
    </div>
    <div style={{ flex: "0 0 4rem" }} />
    {scores.boardNames.map((board, i) => (
      <div
        key={board + i}
        className="flex flex-row justify-around w-full font-bold min-w-64"
      >
        {board.trim()}
      </div>
    ))}
  </div>
);

interface CardProps {
  board: Board;
  boardI: number;
  rowI: number;
}

const findIndexOfHighestScore = (scores: BoardScore[]): number =>
  scores.reduce((highestIndex, player, index, array) => {
    return parseInt(player.laneScore) > parseInt(array[highestIndex].laneScore)
      ? index
      : highestIndex;
  }, 0);

export const Card = ({ board, boardI, rowI }: CardProps) => (
  <div className="flex flex-col w-full my-2 min-w-64 shadow-md rounded-lg">
    {board.scores.map((score, scoreI) => (
      <div
        key={rowI + "score" + boardI + score.playerName}
        className={clsx(
          "flex flex-row w-full p-2",
          Math.floor(scoreI / 2) % 2 === 0 ? "bg-indigo-400" : "bg-slate-100",
          (scoreI === 0 || scoreI === 1) && "border-indigo-500 border-x-2",
          scoreI === 0 && "rounded-tr-lg rounded-tl-lg border-t-2",
          (scoreI === 2 || scoreI === 3) && "border-slate-400 border-x-2",
          scoreI === 3 && "rounded-br-lg rounded-bl-lg border-b-2"
        )}
      >
        <div className="w-4/6">{score.playerName}</div>
        <div className="w-1/6 text-left">{score.score}</div>
        {scoreI % 2 !== 0 && (
          <div
            className={clsx(
              "w-1/6 h-10 text-center",
              scoreI === findIndexOfHighestScore(board.scores) && "font-bold"
            )}
            style={{ marginTop: "-20px" }}
          >
            {score.laneScore}
          </div>
        )}
      </div>
    ))}
  </div>
);

const Default = { Header, Card };
export default Default;
