import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Footer } from "@/components/Footer";

const ApplySchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  linkedinUrl: z.string()
    .url("Enter a valid LinkedIn URL")
    .refine(v => v.includes("linkedin.com/in/"), "Must be a LinkedIn URL"),
  role: z.string().min(1, "Role is required")
});

type ApplyForm = z.infer<typeof ApplySchema>;

const Apply = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [voiceChatEnabled, setVoiceChatEnabled] = useState(false);
  
  const role = searchParams.get('role') || '';
  
  const form = useForm<ApplyForm>({
    resolver: zodResolver(ApplySchema),
    defaultValues: {
      firstName: "",
      linkedinUrl: "",
      role: role
    }
  });

  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "Apply - BreakoutTalents";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete your application to connect with top VC-backed startups in Germany.');
    }

    // Set canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.origin + '/apply');
    }
  }, []);

  const onSubmit = async (values: ApplyForm) => {
    const payload = {
      role: values.role.trim(),
      linkedin_url: values.linkedinUrl.trim(),
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase
      .from("talent_submissions")
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
      title: "Application submitted!",
      description: "We'll review your profile and get back to you soon."
    });
    
    // Navigate back to home page after successful submission
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Button>
        </div>

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Complete Your Application
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            You're applying for: <span className="text-electric-green font-medium">{role}</span>
          </p>
        </div>

        {/* Application Form */}
        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        className="h-12 bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LinkedIn URL */}
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/your-profile"
                        className="h-12 bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hidden Role Field */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <input type="hidden" {...field} />
                )}
              />

              {/* Voice Chat Toggle - Placeholder for future implementation */}
              <div className="p-4 bg-card/30 backdrop-blur-sm border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">Enable Voice Chat</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setVoiceChatEnabled(!voiceChatEnabled)}
                    className={voiceChatEnabled ? "bg-primary/10 border-primary/30" : ""}
                  >
                    {voiceChatEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Optional: Have a voice conversation to tell us more about your experience and goals.
                </p>
                {voiceChatEnabled && (
                  <div className="mt-3 p-3 bg-muted/20 rounded border border-dashed border-muted-foreground/30">
                    <p className="text-sm text-muted-foreground">
                      🎤 Voice chat will be available after form submission
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="w-full h-12 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Apply;