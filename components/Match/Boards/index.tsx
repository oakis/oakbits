import { IScores } from "@/pages/match/[id]/config";
import { Card, Header } from "./components";

interface Props {
  scores: IScores;
}

const Boards = ({ scores }: Props) => {
  return (
    <div className="w-full overflow-auto">
      <div className="flex flex-col">
        <Header scores={scores} />
        {scores.series.map((row, rowI) => (
          <div key={"serie" + rowI} className="flex flex-row">
            <div
              className="flex justify-center items-center text-3xl"
              style={{ flex: "0 0 5rem" }}
            >
              {rowI + 1}
            </div>
            <div className="flex flex-row justify-around w-full gap-8">
              {row.boards.map((board, boardI) => (
                <Card
                  key={rowI + "row" + boardI}
                  board={board}
                  boardI={boardI}
                  rowI={rowI}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
