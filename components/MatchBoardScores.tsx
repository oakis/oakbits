import { BoardScore, Scores } from "@/pages/match/[id]/config";
import clsx from "clsx";

interface IMatchBoardScores {
  scores: Scores;
}

const findIndexOfHighestScore = (scores: BoardScore[]): number =>
  scores.reduce((highestIndex, player, index, array) => {
    return parseInt(player.laneScore) > parseInt(array[highestIndex].laneScore)
      ? index
      : highestIndex;
  }, 0);

const MatchBoardScores = ({ scores }: IMatchBoardScores) => {
  return (
    <div className="w-full overflow-auto">
      <div className="flex flex-col">
        <div className={clsx("flex flex-row")}>
          <div
            className="pl-4 flex justify-center items-center"
            style={{ flex: "0 0 4rem" }}
          >
            Serie
          </div>
          {scores.boardNames.map((board, i) => (
            <div
              key={board + i}
              className="flex flex-row justify-around w-full min-w-72"
            >
              {board.trim()}
            </div>
          ))}
        </div>
        {scores.series.map((row, rowI) => (
          <div key={"serie" + rowI} className={clsx("flex flex-row")}>
            <div
              className="pl-4 flex justify-center items-center"
              style={{ flex: "0 0 4rem" }}
            >
              {rowI + 1}
            </div>
            <div
              className="flex flex-row justify-around w-full"
              style={{ marginRight: "-1rem" }}
            >
              {row.boards.map((board, boardI) => (
                <div
                  key={rowI + "row" + boardI}
                  className={clsx("flex flex-col p-4 w-full min-w-72")}
                >
                  {board.scores.map((score, scoreI) => (
                    <div
                      key={rowI + "score" + boardI + score.playerName}
                      className={clsx(
                        "flex flex-row w-full p-2",
                        Math.floor(scoreI / 2) % 2 === 0
                          ? "bg-red-50"
                          : "bg-sky-50",
                        scoreI === 1 && "mb-2"
                      )}
                    >
                      <div className="w-4/6">{score.playerName}</div>
                      <div className="w-1/6 text-right">{score.score}</div>
                      {scoreI % 2 !== 0 && (
                        <div
                          className={clsx(
                            "w-1/6 h-10 text-right",
                            scoreI === findIndexOfHighestScore(board.scores) &&
                              "font-bold"
                          )}
                          style={{ marginTop: "-20px" }}
                        >
                          {score.laneScore}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchBoardScores;
