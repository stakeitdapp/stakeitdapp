import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Blockchain-Powered Accountability</span>
          </div>

          <h1 className="font-heading font-bold text-5xl md:text-7xl text-primary-foreground mb-6 animate-fade-in">
            Turn Goals Into
            <span className="block text-accent mt-2">Unstoppable Habits</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto animate-fade-in">
            Stake cryptocurrency on your personal goals. Submit daily video proof. Face real financial consequences. 
            <strong className="text-accent"> 70% of penalties go to charity.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
            <Link to="/create-goal">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2">
                Create Your First Goal
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">
                How It Works
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
            <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
              <Target className="w-8 h-8 text-accent mb-3 mx-auto" />
              <div className="text-3xl font-heading font-bold text-primary-foreground mb-2">70%</div>
              <div className="text-sm text-primary-foreground/80">Penalties to Charity</div>
            </div>
            <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
              <TrendingUp className="w-8 h-8 text-accent mb-3 mx-auto" />
              <div className="text-3xl font-heading font-bold text-primary-foreground mb-2">7-30</div>
              <div className="text-sm text-primary-foreground/80">Days Per Goal</div>
            </div>
            <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
              <Shield className="w-8 h-8 text-accent mb-3 mx-auto" />
              <div className="text-3xl font-heading font-bold text-primary-foreground mb-2">Web3</div>
              <div className="text-sm text-primary-foreground/80">Blockchain Security</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
