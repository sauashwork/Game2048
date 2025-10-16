import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Undo2, Redo2, Share2, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GameControlsProps {
  score: number;
  bestScore: number;
  boardSize: number;
  username: string;
  canUndo: boolean;
  canRedo: boolean;
  onNewGame: () => void;
  onBoardSizeChange: (size: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onShare: () => void;
  onUsernameChange: (name: string) => void;
}

export const GameControls = ({ 
  score, 
  bestScore, 
  boardSize,
  username,
  canUndo,
  canRedo,
  onNewGame, 
  onBoardSizeChange,
  onUndo,
  onRedo,
  onShare,
  onUsernameChange
}: GameControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
      <div className="flex items-center gap-2 w-full max-w-xs">
        <User className="text-muted-foreground" size={20} />
        <Input
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Enter your name"
          className="text-center font-semibold"
          maxLength={20}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex gap-4">
        <div className="bg-card rounded-lg px-6 py-3 shadow-lg border-2 border-border">
          <div className="text-sm text-muted-foreground uppercase font-semibold">Score</div>
          <div className="text-2xl font-bold text-primary">{score}</div>
        </div>
        <div className="bg-card rounded-lg px-6 py-3 shadow-lg border-2 border-border">
          <div className="text-sm text-muted-foreground uppercase font-semibold">Best</div>
          <div className="text-2xl font-bold text-accent">{bestScore}</div>
        </div>
      </div>
      
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onUndo}
                disabled={!canUndo}
                size="icon"
                variant="outline"
                className="border-2"
              >
                <Undo2 size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onRedo}
                disabled={!canRedo}
                size="icon"
                variant="outline"
                className="border-2"
              >
                <Redo2 size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>

          <Select 
            value={boardSize.toString()} 
            onValueChange={(val) => onBoardSizeChange(Number(val))}
          >
            <SelectTrigger 
              className="w-32 bg-secondary border-2 border-border"
              onKeyDown={(e) => {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3×3</SelectItem>
              <SelectItem value="4">4×4</SelectItem>
              <SelectItem value="5">5×5</SelectItem>
              <SelectItem value="6">6×6</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={onNewGame}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg"
          >
            New Game
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onShare}
                size="icon"
                variant="secondary"
                className="border-2"
              >
                <Share2 size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share Score</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
