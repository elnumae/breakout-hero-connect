import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroToggle } from "./HeroToggle";
import { RoleChip } from "./RoleChip";
import { LogoRow } from "./LogoRow";
import { Footer } from "./Footer";

const roles = [
  "Account Executive",
  "Founders Associate", 
  "GTM Manager",
  "Product Manager",
  "Engineer"
];

export const HeroSection = () => {
  const [userType, setUserType] = useState("For Talents");
  const [roleInput, setRoleInput] = useState("");

  const handleRoleChipClick = (role: string) => {
    setRoleInput(role);
  };

  return (
    <main className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Toggle */}
        <div className="flex justify-center mb-16">
          <HeroToggle
            options={["For Startups", "For Talents"]}
            defaultValue="For Talents"
            onChange={setUserType}
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          {userType === "For Talents" ? (
            <>
              <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
                Your AI-first headhunter for{" "}
                <span className="text-electric-green">breakout</span>{" "}
                <span className="text-electric-green">startup jobs</span> in Germany.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                We connect top operators with VC-backed startups in Berlin, Munich, and beyond.
              </p>

              {/* Role Input */}
              <div className="max-w-md mx-auto mb-6">
                <Input
                  type="text"
                  placeholder="Enter a role"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Role Chips */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {roles.map((role) => (
                  <RoleChip
                    key={role}
                    onClick={() => handleRoleChipClick(role)}
                  >
                    {role}
                  </RoleChip>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Find a Breakout Role
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold bg-secondary/80 backdrop-blur-sm hover:bg-secondary border border-border hover:border-primary/30 transition-all duration-200 hover:scale-105"
                >
                  Post Your Startup
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
                Hire your next <span className="text-electric-green">10x operator</span>{" "}
                with AI-first speed.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                We connect you with pre-vetted <span className="text-electric-green">breakout talent</span> across Engineering, Product, GTM, and Sales that want to join top German startups.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Hire Breakout Talents
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold bg-secondary/80 backdrop-blur-sm hover:bg-secondary border border-border hover:border-primary/30 transition-all duration-200 hover:scale-105"
                >
                  Book Intro Call
                </Button>
              </div>

              {/* How It Works Section */}
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
                
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Share your JD</h3>
                    <p className="text-muted-foreground">
                      Tell us what you need, we align on the Ideal Candidate Profile.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Get vetted profiles fast</h3>
                    <p className="text-muted-foreground">
                      Receive a curated shortlist in days, not months.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Hire smarter</h3>
                    <p className="text-muted-foreground">
                      We intro, you interview, and close your next breakout hire.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Logo Row */}
        <LogoRow />

        {/* Refer Link */}
        <div className="text-center mt-16">
          <Link 
            to="/refer"
            className="text-electric-green hover:text-electric-green/80 text-lg font-medium underline underline-offset-4 transition-colors"
          >
            💰 Refer talent and earn €500 →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
};