import { cn } from "@/lib/utils";

interface GameTileProps {
  value: number | null;
  size: number;
}

const getTileColor = (value: number | null): string => {
  if (!value) return "bg-tile-empty";
  
  const colorMap: Record<number, string> = {
    2: "bg-tile-2",
    4: "bg-tile-4",
    8: "bg-tile-8",
    16: "bg-tile-16",
    32: "bg-tile-32",
    64: "bg-tile-64",
    128: "bg-tile-128",
    256: "bg-tile-256",
    512: "bg-tile-512",
    1024: "bg-tile-1024",
    2048: "bg-tile-2048",
  };
  
  return colorMap[value] || "bg-tile-super";
};

const getTileSize = (boardSize: number): string => {
  const sizeMap: Record<number, string> = {
    3: "w-24 h-24 text-3xl",
    4: "w-20 h-20 text-2xl",
    5: "w-16 h-16 text-xl",
    6: "w-14 h-14 text-lg",
  };
  
  return sizeMap[boardSize] || "w-20 h-20 text-2xl";
};

export const GameTile = ({ value, size }: GameTileProps) => {
  const tileColor = getTileColor(value);
  const tileSize = getTileSize(size);
  const textColor = value && value > 4 ? "text-foreground" : "text-accent-foreground";
  
  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center font-bold transition-all duration-200",
        "shadow-lg hover:scale-105",
        tileColor,
        tileSize,
        textColor,
        value && "animate-in zoom-in-50 duration-200"
      )}
    >
      {value || ""}
    </div>
  );
};
