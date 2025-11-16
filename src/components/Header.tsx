import { Gamepad2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-primary rounded-lg p-2">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            GameHub
          </h1>
        </div>
      </div>
    </header>
  );
};
