import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateGoal = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [stake, setStake] = useState([10]);
  const [duration, setDuration] = useState([7]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Goal created successfully!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const fee = stake[0] * 0.01;
  const netStake = stake[0] - fee;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-4xl mb-2">Create New Goal</h1>
            <p className="text-muted-foreground">Set your commitment and start your accountability journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Details</CardTitle>
                    <CardDescription>Tell us what you want to achieve</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="learning">Learning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="title">Goal Title</Label>
                      <Input 
                        id="title" 
                        placeholder="e.g., 50 Push-ups Daily"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        placeholder="Describe your daily commitment and what success looks like..."
                        rows={4}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Commitment</CardTitle>
                    <CardDescription>Set your stake and duration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-3">
                        <Label>Stake Amount</Label>
                        <span className="text-sm font-semibold">{stake[0]} HBAR</span>
                      </div>
                      <Slider
                        value={stake}
                        onValueChange={setStake}
                        min={1}
                        max={100}
                        step={1}
                        className="mb-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        1% creation fee = {fee.toFixed(2)} HBAR • Net stake = {netStake.toFixed(2)} HBAR
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <Label>Duration</Label>
                        <span className="text-sm font-semibold">{duration[0]} days</span>
                      </div>
                      <Slider
                        value={duration}
                        onValueChange={setDuration}
                        min={7}
                        max={30}
                        step={1}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        You'll need to submit daily proof for {duration[0]} consecutive days
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Sidebar */}
              <div>
                <Card className="sticky top-24 border-2 border-accent/30">
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stake Amount</span>
                        <span className="font-semibold">{stake[0]} HBAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform Fee (1%)</span>
                        <span className="font-semibold">-{fee.toFixed(2)} HBAR</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="font-semibold">Net Stake</span>
                        <span className="font-bold text-accent">{netStake.toFixed(2)} HBAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-semibold">{duration[0]} days</span>
                      </div>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <div className="text-xs">
                          <p className="font-semibold mb-1">Success = Full Return + 50 Points</p>
                          <p className="text-muted-foreground">
                            If you miss a day, 25% penalty applies: 70% to charity, 20% to platform, 10% to liquidity. You still get 75% back.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full gap-2" size="lg">
                      Create Goal & Stake
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      You'll need to connect your wallet to proceed
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateGoal;
