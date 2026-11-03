require("dotenv").config();

async function testAI() {
  const { GoogleGenAI } = await import("@google/genai");

  const ai = new GoogleGenAI({
    apiKey: process.env.AI_API_KEY
  });

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: "Say hello to an astronaut in one sentence."
  });

  console.log(response.text);
}

testAI().catch(console.error);