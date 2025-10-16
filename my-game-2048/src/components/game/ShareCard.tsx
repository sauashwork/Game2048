import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Grid3x3, Star, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareCardProps {
  open: boolean;
  onClose: () => void;
  username: string;
  score: number;
  bestScore: number;
  boardSize: number;
}

export const ShareCard = ({ open, onClose, username, score, bestScore, boardSize }: ShareCardProps) => {
  const [copied, setCopied] = useState(false);

  const getRank = (score: number) => {
    if (score >= 10000) return { title: "🏆 Legendary Master", color: "text-yellow-400" };
    if (score >= 5000) return { title: "💎 Diamond Player", color: "text-cyan-400" };
    if (score >= 2048) return { title: "👑 Champion", color: "text-purple-400" };
    if (score >= 1000) return { title: "⭐ Expert", color: "text-blue-400" };
    if (score >= 500) return { title: "🎯 Skilled", color: "text-green-400" };
    return { title: "🎮 Beginner", color: "text-gray-400" };
  };

  const rank = getRank(bestScore);

  const shareText = `🎮 2048 Game Stats 🎮
👤 Player: ${username}
${rank.title}
🎯 Current Score: ${score.toLocaleString()}
🏆 Best Score: ${bestScore.toLocaleString()}
📐 Board: ${boardSize}×${boardSize}

Can you beat my score? 🚀`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Gaming Stats
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-xl p-6 border-2 border-primary/20 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="text-yellow-400" size={24} />
              <h3 className="text-3xl font-bold text-center">{username}</h3>
              <Star className="text-yellow-400" size={24} />
            </div>
            
            <div className={`text-center text-xl font-semibold mb-6 ${rank.color}`}>
              {rank.title}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-md">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="text-primary" size={20} />
                  <div className="text-xs text-muted-foreground uppercase font-semibold">Score</div>
                </div>
                <div className="text-2xl font-bold text-primary text-center">{score.toLocaleString()}</div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-md">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="text-accent" size={20} />
                  <div className="text-xs text-muted-foreground uppercase font-semibold">Best</div>
                </div>
                <div className="text-2xl font-bold text-accent text-center">{bestScore.toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50 shadow-md">
              <div className="flex items-center justify-center gap-2">
                <Grid3x3 className="text-secondary" size={18} />
                <div className="text-sm text-muted-foreground">Board Size:</div>
                <div className="text-lg font-bold text-secondary">{boardSize}×{boardSize}</div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleCopy} 
            className="w-full font-bold text-lg shadow-lg"
            size="lg"
          >
            {copied ? (
              <>
                <Check className="mr-2" size={20} />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2" size={20} />
                Copy Stats
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
