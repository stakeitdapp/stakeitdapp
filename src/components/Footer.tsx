import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-border">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-md" />
              <span className="font-heading font-bold text-xl">StakeIt</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Web3-powered accountability platform for achieving your goals through financial commitment.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/how-it-works" className="text-primary-foreground/80 hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link to="/create-goal" className="text-primary-foreground/80 hover:text-accent transition-colors">Create Goal</Link></li>
              <li><Link to="/dashboard" className="text-primary-foreground/80 hover:text-accent transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Smart Contract</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2025 StakeIt. Built on Hedera.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>for accountability</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
