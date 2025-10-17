import { GameTile } from "./GameTile";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface GameBoardProps {
  board: (number | null)[][];
  size: number;
  onMove?: (dir: "up" | "down" | "left" | "right") => void;
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

export const GameBoard = ({ board, size, onMove }: GameBoardProps) => {
  const gap = getBoardSize(size);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Game grid */}
      <div
        className={cn(
          "bg-game-board rounded-2xl p-4 shadow-2xl border-4 border-border grid"
        )}
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gap: "0.75rem",
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`}>
              <GameTile value={cell} size={size} />
            </div>
          ))
        )}
      </div>

      {/* Directional arrows */}
      <div className="flex flex-col items-center gap-3 mt-4 select-none">
        <button
          onClick={() => onMove?.("up")}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 active:scale-90 transition-all"
        >
          <ArrowUp size={28} color="#fff" />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => onMove?.("left")}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 active:scale-90 transition-all"
          >
            <ArrowLeft size={28} color="#fff" />
          </button>
          <button
            onClick={() => onMove?.("down")}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 active:scale-90 transition-all"
          >
            <ArrowDown size={28} color="#fff" />
          </button>
          <button
            onClick={() => onMove?.("right")}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 active:scale-90 transition-all"
          >
            <ArrowRight size={28} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};
