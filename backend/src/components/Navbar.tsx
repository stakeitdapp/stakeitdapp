import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoVariations from "@/assets/logo-variations.jpg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md" />
            <span className="font-heading font-bold text-xl text-foreground">StakeIt</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              How It Works
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Goal
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
