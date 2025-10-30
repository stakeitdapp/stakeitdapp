import { Wallet, Target, Video, Vote, Award, Heart } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your Web3 wallet in seconds. No passwords, no hassle.",
  },
  {
    icon: Target,
    title: "Stake & Commit",
    description: "Choose your goal category and stake 1-100 HBAR for 7-30 days.",
  },
  {
    icon: Video,
    title: "Submit Daily Proof",
    description: "Upload video evidence of your progress every day (up to 2 minutes).",
  },
  {
    icon: Vote,
    title: "Community Votes",
    description: "The community verifies your proof via Hedera Consensus Service.",
  },
  {
    icon: Award,
    title: "Complete & Earn",
    description: "Get your stake back + 50 points. Voters earn 10 points per vote.",
  },
  {
    icon: Heart,
    title: "Impact Charity",
    description: "If you miss a day, 70% of the 25% penalty goes to charity.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            How <span className="text-accent">StakeIt</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six simple steps to accountability. Real stakes, real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                <div className="relative bg-card rounded-2xl p-8 border border-border h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-bold text-3xl text-accent/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-card rounded-2xl p-8 border-2 border-accent/30">
          <h3 className="font-heading font-bold text-2xl mb-4 text-center">
            Penalty Structure: <span className="text-accent">Real Consequences</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-heading font-bold text-destructive mb-2">25%</div>
              <div className="text-sm text-muted-foreground">Total Penalty</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-accent mb-2">70%</div>
              <div className="text-sm text-muted-foreground">To Charity</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-secondary mb-2">20%</div>
              <div className="text-sm text-muted-foreground">To Platform</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">10%</div>
              <div className="text-sm text-muted-foreground">To Liquidity</div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            You get 75% of your stake back even if you fail. Your penalties make a real difference.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
