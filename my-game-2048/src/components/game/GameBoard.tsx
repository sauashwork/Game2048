import { GameTile } from "./GameTile";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  board: (number | null)[][];
  size: number;
}

const getBoardSize = (size: number): string => {
  const gapMap: Record<number, string> = {
    3: "gap-4",
    4: "gap-3",
    5: "gap-2.5",
    6: "gap-2",
  };
  
  return gapMap[size] || "gap-3";
};

export const GameBoard = ({ board, size }: GameBoardProps) => {
  const gap = getBoardSize(size);
  
  return (
    <div 
      className={cn(
        "bg-game-board rounded-2xl p-4 shadow-2xl",
        "border-4 border-border"
      )}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <div key={`${i}-${j}`} className={gap}>
            <GameTile value={cell} size={size} />
          </div>
        ))
      )}
    </div>
  );
};
