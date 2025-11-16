import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { GameCard } from "@/components/GameCard";
import { GameModal } from "@/components/GameModal";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight, TrendingUp, Star, Clock } from "lucide-react";
import { toast } from "sonner";

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

interface GameApiResponse {
  items: Array<{
    id: string;
    title: string;
    description: string;
    banner_image: string;
    image: string;
    url: string;
    width: number;
    height: number;
    category: string;
  }>;
  next_url?: string;
  last_page_url?: string;
}

const fetchGames = async (page: number): Promise<GameApiResponse> => {
  const response = await fetch(
    `https://feeds.gamepix.com/v2/json?sid=TU070&pagination=12&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["games", currentPage],
    queryFn: () => fetchGames(currentPage),
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load games. Please try again later.");
    }
  }, [error]);

  const games: Game[] =
    data?.items?.map((game) => ({
      id: game.id,
      title: game.title,
      description: game.description,
      thumbnailUrl: game.banner_image,
      url: game.url,
      width: game.width,
      height: game.height,
      tags: [game.category],
    })) || [];

  const totalPages = data?.last_page_url 
    ? parseInt(new URL(data.last_page_url).searchParams.get('page') || '1')
    : 1;

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory =
      selectedCategory === "all" ||
      game.tags.some((tag) => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  // Separate games into sections
  const trendingGames = filteredGames.slice(0, 8);
  const newGames = filteredGames.slice(8, 16);
  const popularGames = filteredGames.slice(16, 24);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Play Unlimited Free Games
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover thousands of fun games across all genres. No downloads, no
              installations - just instant play!
            </p>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Game Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : filteredGames.length > 0 ? (
            <>
              {/* Trending Games */}
              {trendingGames.length > 0 && (
                <div id="trending" className="mb-16">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold">Trending Games</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingGames.map((game) => (
                      <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                    ))}
                  </div>
                </div>
              )}

              {/* New Games */}
              {newGames.length > 0 && (
                <div id="new" className="mb-16">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold">New Games</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {newGames.map((game) => (
                      <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Games */}
              {popularGames.length > 0 && (
                <div id="popular" className="mb-16">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold">Popular Games</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {popularGames.map((game) => (
                      <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Games Grid */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">All Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 mt-12">
                <Button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="lg"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Previous
                </Button>
                <span className="text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="lg"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No games found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Game Modal */}
      <GameModal
        game={selectedGame}
        open={!!selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
};

export default Index;
