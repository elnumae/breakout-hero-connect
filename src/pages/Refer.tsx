import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Refer = () => {
  const [formData, setFormData] = useState({
    email: "",
    linkedinUrl: "",
    talentContact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Referral submitted:", formData);
  };

  return (
    <main className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Refer top talent. Earn{" "}
            <span className="text-electric-green">€500</span>{" "}
            with BreakoutTalents.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Know a smart friend looking for a new opportunity? Refer them to BreakoutTalents. If they get hired at one of our VC-backed startup partners in Germany, you'll earn a €500 referral bonus.
          </p>

          <Button
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105 mb-16"
          >
            👉 Refer a Friend Now
          </Button>
        </div>

        {/* Stats Row */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-black text-electric-green mb-2">€500</div>
              <p className="text-sm text-muted-foreground">per successful hire</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-electric-green mb-2">30</div>
              <p className="text-sm text-muted-foreground">days typical payout time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-electric-green mb-2">2</div>
              <p className="text-sm text-muted-foreground">minutes to refer</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-electric-green mb-2">∞</div>
              <p className="text-sm text-muted-foreground">unlimited referrals allowed</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit a Talent</h3>
              <p className="text-muted-foreground">
                Drop their LinkedIn profile + your email via BreakoutTalents.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">BreakoutTalents Does the Work</h3>
              <p className="text-muted-foreground">
                We connect them with Germany's fastest-growing VC-backed startups.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">You Get Paid</h3>
              <p className="text-muted-foreground">
                If they're hired and pass probation, BreakoutTalents pays you €500 referral bonus.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              👉 Start Referring with BreakoutTalents
            </Button>
          </div>
        </div>

        {/* Referral Form */}
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Referral Form</h2>
          <p className="text-center text-muted-foreground mb-8">Simple & Short</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Your email (required → for payout)"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            
            <div>
              <Input
                type="url"
                placeholder="Talent's LinkedIn URL (required)"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            
            <div>
              <Input
                type="text"
                placeholder="Optional: Talent Email or Phone"
                value={formData.talentContact}
                onChange={(e) => setFormData({...formData, talentContact: e.target.value})}
                className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                👉 Submit Referral
              </Button>
            </div>
          </form>
        </div>

        {/* Why Refer */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Refer with BreakoutTalents?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">💰</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Earn €500 per successful hire</h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🚀</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Help friends grow into breakout roles at VC-backed startups</h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🔑</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">No extra work required — BreakoutTalents handles sourcing, intros, and hiring</h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🌍</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Be part of Germany's startup ecosystem by connecting talent with top founders</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/20 to-electric-green/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm border border-primary/20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Who's the most talented person you know?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Refer them to BreakoutTalents in 2 minutes and get rewarded when they're hired.
            </p>

            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              👉 Refer a Talent Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Refer;