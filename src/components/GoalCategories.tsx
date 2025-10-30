import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import fitnessIcon from "@/assets/icon-fitness.jpg";
import educationIcon from "@/assets/icon-education.jpg";
import learningIcon from "@/assets/icon-learning.jpg";

const categories = [
  {
    title: "Fitness",
    description: "Daily workouts, running, strength training, yoga, and more",
    icon: fitnessIcon,
    examples: ["50 push-ups daily", "5km morning run", "30min yoga session"],
  },
  {
    title: "Education",
    description: "Reading, courses, tutorials, and structured learning paths",
    icon: educationIcon,
    examples: ["Read 30 pages daily", "Complete 1 course module", "Study for 2 hours"],
  },
  {
    title: "Learning",
    description: "Skill development, practice, projects, and creative pursuits",
    icon: learningIcon,
    examples: ["Code for 1 hour", "Practice instrument", "Write 500 words"],
  },
];

const GoalCategories = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Choose Your <span className="text-accent">Goal Category</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set goals in three powerful areas. Upload daily video proof and let the community verify your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card 
              key={category.title}
              className="group hover:shadow-2xl hover:border-accent/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 ring-2 ring-accent/20 group-hover:ring-accent transition-all">
                  <img 
                    src={category.icon} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="font-heading text-2xl">{category.title}</CardTitle>
                <CardDescription className="text-base">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {category.examples.map((example) => (
                    <div key={example} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {example}
                    </div>
                  ))}
                </div>
                <Button className="w-full gap-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  Start {category.title} Goal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalCategories;
