import { Gamepad2, Mail, Twitter, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                GameHub
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Play thousands of free online games instantly. No downloads, no installations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#trending" className="hover:text-primary transition-colors">Trending Games</a></li>
              <li><a href="#new" className="hover:text-primary transition-colors">New Games</a></li>
              <li><a href="#popular" className="hover:text-primary transition-colors">Popular Games</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Action</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Puzzle</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sports</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Adventure</a></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GameHub. All rights reserved. Powered by GamePix</p>
        </div>
      </div>
    </footer>
  );
};
