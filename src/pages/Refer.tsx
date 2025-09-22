import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const ReferralSchema = z.object({
  email: z.string().email("Enter a valid email"),
  linkedinUrl: z.string()
    .url("Enter a valid URL")
    .refine(v => v.includes("linkedin.com/in/"), "Must be a LinkedIn URL"),
  talentContact: z.string().optional(),
  whyExceptional: z.string().min(1, "Please tell us why this person is exceptional")
});

type ReferralForm = z.infer<typeof ReferralSchema>;

const Refer = () => {
  const { toast } = useToast();
  
  const form = useForm<ReferralForm>({
    resolver: zodResolver(ReferralSchema),
    defaultValues: {
      email: "",
      linkedinUrl: "",
      talentContact: "",
      whyExceptional: ""
    }
  });

  // Update page title and meta description for this page
  useEffect(() => {
    document.title = "Refer Talent – Earn €500 | BreakoutTalents (AI Headhunter)";
    const ensureTag = (selector: string, create: () => Element) => {
      return document.querySelector(selector) || create();
    };
    const metaDescription = ensureTag('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    metaDescription.setAttribute('content', 'Refer top talent to an AI headhunter and earn €500 per successful hire. BreakoutTalents connects operators with VC-backed startups in Germany.');

    const canonical = ensureTag('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      document.head.appendChild(l);
      return l;
    }) as HTMLLinkElement;
    canonical.setAttribute("href", `${window.location.origin}/refer`);

    const ogTitle = ensureTag('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    ogTitle.setAttribute("content", "Refer Talent – Earn €500 | BreakoutTalents");

    const ogDesc = ensureTag('meta[property="og:description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    ogDesc.setAttribute("content", "Refer top talent to an AI headhunter and earn €500 when hired.");

    const ogUrl = ensureTag('meta[property="og:url"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    ogUrl.setAttribute("content", `${window.location.origin}/refer`);
  }, []);

  const onSubmit = async (values: ReferralForm) => {
    const payload = {
      referrer_email: values.email.trim().toLowerCase(),
      talent_linkedin_url: values.linkedinUrl.trim(),
      talent_contact: values.talentContact?.trim() || null,
      why_exceptional: values.whyExceptional.trim(),
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase
      .from("referrals")
      .insert(payload);

    if (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Referral submitted",
      description: "Thanks! We'll review ASAP."
    });
    form.reset(); // allow multiple submissions
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
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
            Who are the three most talented people you know?
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            Refer them in 2 minutes and earn rewards when they're hired at top VC-backed startups in Germany.
          </p>
        </div>

        {/* Referral Form */}
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Referral Form — Simple & Short</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email (required → for payout)"
                        className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="Talent's LinkedIn URL (required)"
                        className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="talentContact"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Optional: Talent email or phone"
                        className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whyExceptional"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tell us in 1 sentence why your friend is the 1% breakout talent in your network (e.g., top achievements)."
                        className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "👉 Submit Referral"}
                </Button>
              </div>
            </form>
          </Form>
          
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Start with up to 3 referrals. Depending on talent fit and performance, you'll unlock more referrals.
          </p>
        </div>

        {/* Key Benefits Block */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">💶</div>
              <div className="text-3xl font-black text-electric-green mb-2">€500</div>
              <p className="text-sm text-muted-foreground">per successful hire</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">⏱️</div>
              <div className="text-3xl font-black text-electric-green mb-2">2 minutes</div>
              <p className="text-sm text-muted-foreground">to refer</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">♾️</div>
              <div className="text-3xl font-black text-electric-green mb-2">Unlimited referrals</div>
              <p className="text-sm text-muted-foreground">earn your right to refer more</p>
            </div>
          </div>
        </div>

        {/* Referral Flow Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Talent</h3>
              <p className="text-muted-foreground">
                Drop their LinkedIn profile + your email via BreakoutTalents.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">We Do the Work</h3>
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
        </div>

        {/* Bottom Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/20 to-electric-green/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm border border-primary/20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Who's the most talented person you know?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Refer top talent. Earn €500 with BreakoutTalents. Know a smart friend looking for a new opportunity? Refer them to BreakoutTalents. If they get hired at one of our VC-backed startup partners in Germany, you'll earn a €500 referral bonus.
            </p>

            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              👉 Refer them to BreakoutTalents in 2 minutes and get rewarded when they're hired.
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Refer;