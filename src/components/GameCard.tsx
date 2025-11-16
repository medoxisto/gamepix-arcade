import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
  width: number;
  height: number;
  tags: string[];
}

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export const GameCard = ({ game, onPlay }: GameCardProps) => {
  return (
    <Card 
      className="game-card cursor-pointer group"
      onClick={() => onPlay(game)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={game.thumbnailUrl} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-primary rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-primary-foreground fill-current" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-card-foreground line-clamp-1">
          {game.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {game.description}
        </p>
        {game.tags && game.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {game.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
