import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroToggle } from "./HeroToggle";
import { RoleChip } from "./RoleChip";
import { LogoRow } from "./LogoRow";

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
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
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
              {userType === "For Startups" ? "Hire Breakout Talents" : "Find a Breakout Role"}
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-secondary/80 backdrop-blur-sm hover:bg-secondary border border-border hover:border-primary/30 transition-all duration-200 hover:scale-105"
            >
              {userType === "For Startups" ? "Learn More" : "Post Your Startup"}
            </Button>
          </div>
        </div>

        {/* Logo Row */}
        <LogoRow />
      </div>
    </main>
  );
};