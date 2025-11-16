import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Game {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
}

interface GameModalProps {
  game: Game | null;
  open: boolean;
  onClose: () => void;
}

export const GameModal = ({ game, open, onClose }: GameModalProps) => {
  if (!game) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black">
        <DialogTitle className="sr-only">{game.title}</DialogTitle>
        <div className="relative w-full h-full">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
          <iframe
            src={game.url}
            title={game.title}
            className="w-full h-[90vh] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
