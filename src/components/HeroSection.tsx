import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroToggle } from "./HeroToggle";
import { RoleChip } from "./RoleChip";
import { LogoRow } from "./LogoRow";
import { Footer } from "./Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const roles = [
  "Founding Engineer",
  "Founders Associate",
  "Product Manager",
  "Go-To-Market",
];

const TalentSchema = z.object({
  role: z.string().min(1, "Please enter or select a role"),
});

const StartupSchema = z.object({
  jdLink: z.string().url("Enter a valid URL for your job description"),
  email: z.string().email("Enter a valid email address"),
});

const ReferralSchema = z.object({
  email: z.string().email("Enter a valid email"),
  linkedinUrl: z.string()
    .url("Enter a valid URL")
    .refine(v => v.includes("linkedin.com/in/"), "Must be a LinkedIn URL"),
  talentContact: z.string().optional(),
  breakoutReason: z.string().min(1, "Please tell us why your friend is breakout talent")
});

type TalentForm = z.infer<typeof TalentSchema>;
type StartupForm = z.infer<typeof StartupSchema>;
type ReferralForm = z.infer<typeof ReferralSchema>;


export const HeroSection = () => {
  const [userType, setUserType] = useState("For Talents");
  const { toast } = useToast();
  const navigate = useNavigate();
  const jdInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TalentForm>({
    resolver: zodResolver(TalentSchema),
    defaultValues: {
      role: "",
    },
  });

  const startupForm = useForm<StartupForm>({
    resolver: zodResolver(StartupSchema),
    defaultValues: {
      jdLink: "",
      email: "",
    },
  });

  const referralForm = useForm<ReferralForm>({
    resolver: zodResolver(ReferralSchema),
    defaultValues: {
      email: "",
      linkedinUrl: "",
      talentContact: "",
      breakoutReason: ""
    }
  });

  const handleRoleChipClick = (role: string) => {
    form.setValue("role", role);
  };

  const handleHireBreakoutTalents = () => {
    setUserType("For Startups");
    setTimeout(() => {
      jdInputRef.current?.focus();
    }, 100);
  };

  const onSubmit = (values: TalentForm) => {
    const role = values.role.trim();
    navigate("/apply", { state: { role } });
  };

  const onStartupSubmit = async (values: StartupForm) => {
    const payload = {
      jd_link: values.jdLink.trim(),
      email: values.email.trim(),
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase
      .from("startup_submissions")
      .insert(payload);

    if (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request submitted!",
      description: "We'll review your JD and send you top talents soon.",
    });
    startupForm.reset();
  };

  const onReferralSubmit = async (values: ReferralForm) => {
    const payload = {
      referrer_email: values.email.trim().toLowerCase(),
      talent_linkedin_url: values.linkedinUrl.trim(),
      talent_contact: values.talentContact?.trim() || null,
      talent_reason: values.breakoutReason.trim(),
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
    referralForm.reset();
  };

  return (
    <main className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div id="role-input" className="relative z-10 container mx-auto px-6 py-8 sm:px-8 sm:py-20 md:px-12 md:pt-20 lg:px-16 lg:pt-36">
        {/* Header Toggle */}
        <div className="flex justify-center mb-8 md:mb-12">
          <HeroToggle
            options={["For Startups", "For Talents"]}
            defaultValue="For Talents"
            onChange={setUserType}
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {userType === "For Talents" ? (
          
          
          <>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                  Your AI-first headhunter for{" "}
                  <span className="text-electric-green">breakout</span>{" "}
                  <span className="text-electric-green">startup jobs</span> in
                  Europe.
                </h1>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10 px-4 md:px-0"
                >
                  {/* Role Input */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="max-w-lg mx-auto relative">
                            <Textarea
                              placeholder="Enter desired role ..."
                              className="h-24 pt-6 pl-6 text-sm bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 resize-none rounded-xl"
                              {...field}
                            />
                            <Button
                              type="submit"
                              size="icon"
                              className="absolute top-5 right-6 w-8 h-8 rounded-full bg-electric-green hover:bg-electric-green/90 text-background transition-all duration-200"
                            >
                              <ArrowRight className="w-5 h-5" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />

                  {/* Role Chips */}
                  <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
                    {roles.map((role) => (
                      <RoleChip
                        key={role}
                        onClick={() => handleRoleChipClick(role)}
                      >
                        {role}
                      </RoleChip>
                    ))}
                  </div>
                </form>
              </Form>

              <div className="flex justify-center pt-8">
          <button
            onClick={() => {
              const referralForm = document.getElementById('referral-form');
              if (referralForm) {
                referralForm.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 bg-electric-green hover:bg-electric-green/90 text-background rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm font-medium"
            aria-label="Scroll to referral form"
          >
            <span>Refer a friend for €500!</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

              {/* Logo Row */}
              <div className="py-24">
                <LogoRow />
              </div>
            
            {/* Referral Section - Permanently Visible */}
            <div id="referral-form" className="max-w-2xl mx-auto mt-12 pt-8 pb-16 border-t border-border/20">
            <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
            Who are the three{" "}
            <span className="text-electric-green">most talented people</span>{" "}
            you know?
          </h1>
          
          <p className="text-l md:text-l text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Refer in{" "}
            <span className="inline-block bg-electric-green/20 text-electric-green px-3 py-1 rounded-full text-sm font-semibold mx-1">
              2 minutes
            </span>
            . Earn{" "}
            <span className="inline-block bg-electric-green/20 text-electric-green px-3 py-1 rounded-full text-sm font-semibold mx-1">
              €500 per referral
            </span>
            {" "}when they're hired at top VC-backed startups in Europe.
          </p>
        </div>
            
            <Form {...referralForm}>
              <form onSubmit={referralForm.handleSubmit(onReferralSubmit)} className="space-y-4">
                <FormField
                  control={referralForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email (required → for payout)"
                          className="px-4 py-3 text-sm bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={referralForm.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Talent's LinkedIn URL (required)"
                          className="px-4 py-3 text-sm bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={referralForm.control}
                  name="talentContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Optional: Talent email or phone"
                          className="px-4 py-3 text-sm bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={referralForm.control}
                  name="breakoutReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          placeholder="Tell us in 1 sentence why your friend is the 1% breakout talent in your network (e.g., top achievements)."
                          className="w-full rounded-md bg-card/50 backdrop-blur-sm border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={referralForm.formState.isSubmitting}
                    className="px-8 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {referralForm.formState.isSubmitting ? "Submitting..." : "Submit Referral"}
                  </Button>
                </div>
              </form>
            </Form>
            <p className="text-sm text-muted-foreground text-center mt-6">
            Start with up to 3 referrals. Depending on talent fit and performance, you'll unlock more referrals.
          </p>
          </div>

        {/* How it works header */}
        <div className="max-w-4xl mx-auto text-center mb-12 pt-16">
          <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        </div>

        {/* Referral Flow Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Talent</h3>
              <p className="text-muted-foreground">
                Share their LinkedIn + 1 sentence why
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">We Do the Work</h3>
              <p className="text-muted-foreground">
                BreakoutTalents connects them with startups
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">You Get Paid</h3>
              <p className="text-muted-foreground">
                €500 once they're hired and pass probation
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Button
            size="lg"
            onClick={() => {
              const referralForm = document.getElementById('referral-form');
              if (referralForm) {
                referralForm.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            👉 Start Referring with BreakoutTalents
          </Button>
        </div>
        <div className="flex justify-center pb-2 pt-32">
          <button
            onClick={() => {
              const roleInput = document.getElementById('role-input');
              if (roleInput) {
                roleInput.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 bg-electric-green hover:bg-electric-green/90 text-background rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm font-medium"
            aria-label="Scroll to role input"
          >
            <span>Back to top opportunities</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
          </>

          ) : (
            <>
            <div className="mb-64">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Hire your next{" "}
                <span className="text-electric-green">10x operator</span> with
                AI-first speed.
              </h1>

              <p className="text-l md:text-l text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                We connect you with pre-vetted{" "}
                <span className="text-electric-green">breakout talent</span>{" "}
                across Engineering, Product, GTM, and Sales that want to join
                top German startups.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  onClick={handleHireBreakoutTalents}
                  className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Hire Breakout Talents
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold bg-secondary/80 backdrop-blur-sm hover:bg-secondary border border-border hover:border-primary/30 transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <a
                    href="https://cal.com/emanuel-morhard/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Intro Call
                  </a>
                </Button>
              </div>
              </div>

              {/* Logo Row - After startup CTA buttons */}
              <div className="pb-44">
              <LogoRow />
              </div>

              {/* How It Works Section */}
              <div className="max-w-5xl mx-auto pb-14 mb-10 mt-18">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Share your JD
                    </h3>
                    <p className="text-muted-foreground">
                      Tell us what you need, we align on the Ideal Candidate
                      Profile.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-electric-green text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Get vetted profiles fast
                    </h3>
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
                      We intro, you interview, and close your next breakout
                      hire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Startup Form */}
              <Form {...startupForm}>
                <form
                  onSubmit={startupForm.handleSubmit(onStartupSubmit)}
                  className="space-y-8 max-w-md mx-auto"
                >
                  {/* JD Link Input */}
                  <FormField
                    control={startupForm.control}
                    name="jdLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            ref={jdInputRef}
                            type="url"
                            placeholder="Share link to JD"
                            className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />

                  {/* Email Input */}
                  <FormField
                    control={startupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your email"
                            className="h-14 text-lg bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />

                  {/* CTA Button */}
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      variant="secondary"
                      disabled={startupForm.formState.isSubmitting}
                      className="h-14 px-8 text-lg font-semibold bg-secondary/80 backdrop-blur-sm hover:bg-secondary border border-border hover:border-accent hover:text-accent transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    >
                      {startupForm.formState.isSubmitting
                        ? "Submitting..."
                        : "Send me top talents"}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
};
