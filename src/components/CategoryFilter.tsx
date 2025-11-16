import { Button } from "@/components/ui/button";
import { Gamepad2, Puzzle, Trophy, Zap, Bike, Brain, Heart } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "All Games", icon: Gamepad2 },
  { id: "action", name: "Action", icon: Zap },
  { id: "puzzle", name: "Puzzle", icon: Puzzle },
  { id: "sports", name: "Sports", icon: Trophy },
  { id: "racing", name: "Racing", icon: Bike },
  { id: "strategy", name: "Strategy", icon: Brain },
  { id: "casual", name: "Casual", icon: Heart },
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="bg-card border rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="lg"
              onClick={() => onCategoryChange(category.id)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
