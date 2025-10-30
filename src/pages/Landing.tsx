import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoalCategories from "@/components/GoalCategories";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <GoalCategories />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Landing;
