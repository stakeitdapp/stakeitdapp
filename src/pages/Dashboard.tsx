import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - will be replaced with real blockchain data
  const userStats = {
    totalGoals: 3,
    activeGoals: 1,
    completedGoals: 2,
    currentStreak: 5,
    totalPoints: 120,
  };

  const activeGoal = {
    id: 1,
    category: "Fitness",
    title: "50 Push-ups Daily",
    daysCompleted: 5,
    totalDays: 7,
    stake: 10,
    nextDeadline: "Today, 11:59 PM",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main id="dashboard" className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-4xl mb-2">
              Your Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your progress and stay accountable
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Current Streak</CardDescription>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <Flame className="w-6 h-6 text-accent" />
                  {userStats.currentStreak} days
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Points</CardDescription>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <Trophy className="w-6 h-6 text-accent" />
                  {userStats.totalPoints}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Goals</CardDescription>
                <CardTitle className="text-3xl">
                  {userStats.activeGoals}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Completed Goals</CardDescription>
                <CardTitle className="text-3xl">
                  {userStats.completedGoals}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Goals */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-2xl">
                  Active Goals
                </h2>
                <Link to="/create-goal">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Goal
                  </Button>
                </Link>
              </div>

              <Card className="border-2 border-accent/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">{activeGoal.category}</Badge>
                      <CardTitle className="font-heading text-2xl">
                        {activeGoal.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {activeGoal.stake} HBAR staked • Next submission:{" "}
                        {activeGoal.nextDeadline}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-heading font-bold text-accent">
                        {activeGoal.daysCompleted}/{activeGoal.totalDays}
                      </div>
                      <div className="text-sm text-muted-foreground">days</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">
                          {Math.round(
                            (activeGoal.daysCompleted / activeGoal.totalDays) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (activeGoal.daysCompleted / activeGoal.totalDays) *
                          100
                        }
                        className="h-3"
                      />
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: activeGoal.totalDays }).map(
                        (_, i) => (
                          <div
                            key={i}
                            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold ${
                              i < activeGoal.daysCompleted
                                ? "bg-success text-success-foreground"
                                : i === activeGoal.daysCompleted
                                ? "bg-accent text-accent-foreground animate-pulse"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {i + 1}
                          </div>
                        )
                      )}
                    </div>

                    <Button className="w-full" size="lg">
                      Submit Today's Proof
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">
                          Push-ups Goal
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Day 6 of 7
                        </div>
                      </div>
                      <Badge variant="destructive">Today</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Charity Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-accent mb-2">
                      $0.00
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total donated to charity from your penalties
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
