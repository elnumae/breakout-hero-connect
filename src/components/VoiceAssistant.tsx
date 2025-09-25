import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

export function Conversation() {
  const [isConnecting, setIsConnecting] = useState(false);

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
    },
    onStatusChange: (status) => {
      console.log("Status changed:", status);
    },
  });

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
          firstName: "John",
          role: "Product Manager",
        },
      });

      console.log("Conversation session started");
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsConnecting(false);
    }
  }, [conversation, isConnecting]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      console.log("Conversation session ended");
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button
          onClick={startConversation}
          disabled={conversation.status === "connected" || isConnecting}
          className="px-4 py-2"
        >
          {isConnecting ? "Connecting..." : "Start Conversation"}
        </Button>
        <Button
          onClick={stopConversation}
          disabled={conversation.status !== "connected"}
          variant="destructive"
          className="px-4 py-2"
        >
          Stop Conversation
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? "speaking" : "listening"}</p>
        {isConnecting && <p className="text-yellow-600">Connecting...</p>}
      </div>
    </div>
  );
}
