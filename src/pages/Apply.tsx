import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useConversation } from "@elevenlabs/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Footer } from "@/components/Footer";

const ApplySchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  linkedinUrl: z
    .string()
    .url("Enter a valid LinkedIn URL")
    .refine((v) => v.includes("linkedin.com/in/"), "Must be a LinkedIn URL"),
  role: z.string().min(1, "Role is required"),
});

type ApplyForm = z.infer<typeof ApplySchema>;

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [formData, setFormData] = useState<ApplyForm | null>(null);

  const role = location.state?.role || "";

  const form = useForm<ApplyForm>({
    resolver: zodResolver(ApplySchema),
    defaultValues: {
      firstName: "",
      linkedinUrl: "",
      role: role,
    },
  });

  // ElevenLabs conversation hook
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      setIsConnecting(false);
    },
    onDisconnect: () => {
      console.log("Disconnected");
      setIsConnecting(false);
    },
    onMessage: (message) => {
      console.log("Message:", message);
    },
    onError: (error) => {
      console.error("Error:", error);
      setIsConnecting(false);
      toast({
        title: "Voice chat error",
        description: "Failed to connect to voice chat. Please try again.",
        variant: "destructive",
      });
    },
    onStatusChange: (status) => {
      console.log("Status changed:", status);
    },
  });

  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "Apply - BreakoutTalents";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Complete your application to connect with top VC-backed startups in Germany."
      );
    }

    // Set canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", window.location.origin + "/apply");
    }
  }, []);

  const onSubmit = async (values: ApplyForm) => {
    const payload = {
      role: values.role.trim(),
      linkedin_url: values.linkedinUrl.trim(),
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase.from("talent_submissions").insert(payload);

    if (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Store form data for voice chat
    setFormData(values);
    setIsSubmitted(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  const startConversation = useCallback(async () => {
    if (conversation.status === "connected" || isConnecting) {
      return;
    }

    try {
      setIsConnecting(true);

      // Check if agent ID is available
      const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
      if (!agentId) {
        throw new Error(
          "ElevenLabs Agent ID not configured. Please set VITE_ELEVENLABS_AGENT_ID in your .env.local file"
        );
      }

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone permission granted");

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: agentId,
        connectionType: "websocket",
        dynamicVariables: {
          firstName: formData?.firstName || "User",
          role: formData?.role || role,
        },
      });

      console.log("Conversation session started");
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsConnecting(false);
      toast({
        title: "Voice chat failed",
        description:
          "Failed to start voice chat. Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  }, [conversation, isConnecting, formData, role]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      console.log("Conversation session ended");
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  }, [conversation]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-500";
      case "connecting":
        return "text-yellow-500";
      case "disconnected":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
      default:
        return "Ready";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12">
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

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                  Share Your Details
                </h1>

                <p className="text-xl text-muted-foreground mb-8">
                  You're applying for:{" "}
                  <span className="text-electric-green font-medium">
                    {role}
                  </span>
                </p>
              </div>

              {/* Application Form */}
              <div className="max-w-md mx-auto">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* First Name */}
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            First Name
                          </FormLabel>
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
                          <FormLabel className="text-foreground">
                            LinkedIn Profile URL
                          </FormLabel>
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
                      render={({ field }) => <input type="hidden" {...field} />}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                      className="w-full h-12 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    >
                      {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            /* Success State with Voice Chat */
            <div className="max-w-md mx-auto text-center">
              <div className="mb-8">
                <div className="w-16 h-16 bg-electric-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-electric-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-semibold text-foreground mb-4">
                  Thanks for providing your personal details!
                </h1>
                <p className="text-muted-foreground mb-8">
                Let's jump on a quick call so you can tell us more what you are looking for
                </p>
              </div>

              <div className="p-6 bg-card/30 backdrop-blur-sm border border-border rounded-lg space-y-6">
                <div>

                  {/* Voice Chat Controls */}
                  <div className="flex gap-3 mb-4">
                    <Button
                      onClick={startConversation}
                      disabled={
                        conversation.status === "connected" || isConnecting
                      }
                      size="lg"
                      className="flex-1 h-12 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    >
                      {isConnecting ? "Connecting..." : "Talk to our agent"}
                    </Button>

                    <Button
                      onClick={stopConversation}
                      disabled={conversation.status !== "connected"}
                      variant="destructive"
                      size="lg"
                      className="h-12 font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    >
                      End Call
                    </Button>
                  </div>

                  {/* Voice Chat Status */}
                  <div className="p-4 bg-muted/20 rounded-lg border border-muted-foreground/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          conversation.status === "connected"
                            ? "bg-green-500"
                            : conversation.status === "connecting"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          conversation.status
                        )}`}
                      >
                        Status: {getStatusText(conversation.status)}
                      </span>
                    </div>

                    {conversation.status === "connected" && (
                      <p className="text-sm text-muted-foreground">
                        Agent is{" "}
                        {conversation.isSpeaking ? "speaking" : "listening"}
                      </p>
                    )}

                    {isConnecting && (
                      <p className="text-sm text-yellow-600">
                        Connecting to voice agent...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
