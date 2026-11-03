import { useState } from "react";
import BOT from "./BOT";

export default function BotPage(props) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome aboard. How can I help?",
    },
  ]);

  const [status, setStatus] = useState("idle");

async function handleSendMessage(text) {
  setMessages((previous) => [
    ...previous,
    {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    },
  ]);

  setStatus("processing");

  try {
    const response = await fetch("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
  message: text,
  readings: {
    heartRate: props.bPm ?? null,
    spo2: props.spo2 ?? null,
    temperature: props.tempe ?? null,
  },
}),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    if (typeof data.reply !== "string" || !data.reply.trim()) {
      throw new Error("The server returned an empty reply");
    }

    setMessages((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      },
    ]);
  } catch (error) {
    console.error("AI chat error:", error);
    throw error;
  } finally {
    setStatus("idle");
  }
}

  return (
    <BOT
      {...props}
      messages={messages}
      status={status}
      onSendMessage={handleSendMessage}
    />
  );
}