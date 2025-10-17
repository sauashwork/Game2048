import { useState, useEffect, useCallback } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameControls } from "@/components/game/GameControls";
import { createEmptyBoard, addRandomTile, move, canMove, hasWon, Direction } from "@/lib/gameLogic";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ShareCard } from "@/components/game/ShareCard";

type GameState = {
  board: (number | null)[][];
  score: number;
};

const Index = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved) : 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState<GameState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem('username');
    return saved || 'Player';
  });
  const [showShareCard, setShowShareCard] = useState(false);

  const saveToHistory = useCallback((board: (number | null)[][], score: number) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, { board: board.map(row => [...row]), score }];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const initGame = useCallback(() => {
    let newBoard = createEmptyBoard(boardSize);
    newBoard = addRandomTile(newBoard, boardSize);
    newBoard = addRandomTile(newBoard, boardSize);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setHistory([{ board: newBoard.map(row => [...row]), score: 0 }]);
    setHistoryIndex(0);
    toast.success("New game started!");
  }, [boardSize]);

  useEffect(() => {
    initGame();
  }, [boardSize, initGame]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore', score.toString());
    }
  }, [score, bestScore]);

  const handleMove = useCallback((direction: Direction) => {
    if (gameOver) return;

    const result = move(board, direction);
    
    if (!result.moved) return;

    let newBoard = result.board;
    const newScore = score + result.scoreGained;
    setScore(newScore);
    
    newBoard = addRandomTile(newBoard, boardSize);
    setBoard(newBoard);
    saveToHistory(newBoard, newScore);

    if (hasWon(newBoard, boardSize) && !won) {
      setWon(true);
      toast.success("🎉 You won! You reached 2048!", { duration: 5000 });
    }

    if (!canMove(newBoard, boardSize)) {
      setGameOver(true);
      toast.error("Game Over! No more moves available.", { duration: 5000 });
    }
  }, [board, boardSize, gameOver, won, score, saveToHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevState = history[prevIndex];
      setBoard(prevState.board.map(row => [...row]));
      setScore(prevState.score);
      setHistoryIndex(prevIndex);
      setGameOver(false);
      toast.info("Move undone");
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextState = history[nextIndex];
      setBoard(nextState.board.map(row => [...row]));
      setScore(nextState.score);
      setHistoryIndex(nextIndex);
      toast.info("Move redone");
    }
  }, [history, historyIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        
        const directionMap: Record<string, Direction> = {
          'ArrowUp': 'up',
          'ArrowDown': 'down',
          'ArrowLeft': 'left',
          'ArrowRight': 'right',
        };
        
        handleMove(directionMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  const handleBoardSizeChange = (size: number) => {
    setBoardSize(size);
  };

  const handleUsernameChange = (name: string) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-2xl animate-pulse relative">
          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl"></span>
          <span className="relative">2️⃣0️⃣4️⃣8️⃣</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Use arrow keys to move tiles. Combine them to reach 2048!
        </p>
      </div>

      <GameControls
        score={score}
        bestScore={bestScore}
        boardSize={boardSize}
        username={username}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onNewGame={initGame}
        onBoardSizeChange={handleBoardSizeChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onShare={() => setShowShareCard(true)}
        onUsernameChange={handleUsernameChange}
      />

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-2">
        <GameBoard board={board} size={boardSize} onMove={handleMove} />
      </Card>

      {gameOver && (
        <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-2xl font-bold text-destructive">Game Over!</p>
          <p className="text-muted-foreground">Final Score: {score}</p>
        </div>
      )}

      {won && !gameOver && (
        <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-2xl font-bold text-accent">🎉 You Won! 🎉</p>
          <p className="text-muted-foreground">Keep playing to increase your score!</p>
        </div>
      )}

      <ShareCard
        open={showShareCard}
        onClose={() => setShowShareCard(false)}
        username={username}
        score={score}
        bestScore={bestScore}
        boardSize={boardSize}
      />
    </div>
  );
};

export default Index;
