import { GameCard } from "./GameCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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

interface GameSectionProps {
  title: string;
  games: Game[];
  onPlay: (game: Game) => void;
  showViewAll?: boolean;
}

export const GameSection = ({ title, games, onPlay, showViewAll = false }: GameSectionProps) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" className="gap-2">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.slice(0, 8).map((game) => (
          <GameCard key={game.id} game={game} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
};
