import { GoogleGenAI } from "@google/genai";
import { PRICING_TIERS } from "@/lib/pricingData";

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

// Built from the same PRICING_TIERS data the pricing page renders, so Gemini
// can never quote a stale or invented number.
function buildSystemPrompt(): string {
  const tiersSummary = PRICING_TIERS.map(
    (t) =>
      `- ${t.name}${t.popular ? " (most popular)" : ""}: ${t.priceRangeINR} / ${t.priceRangeUSD}, delivered in ${t.deliveryTime}. Includes: ${t.features.join(", ")}.`
  ).join("\n");

  return `You are Prakriti, the AI strategy assistant embedded on the CustomeAI website (customeai.tech).

CustomeAI is a small, founder-led studio (led by Vishal Tiwari, based in Mumbai, working remotely across India) that builds custom websites, AI systems, and software for small businesses, problem first, not a fixed menu of packages. Projects deliver in 7 to 21 days with fixed itemized pricing, 50% advance / 50% on delivery, full source code and IP ownership, and 30 to 90 days of free post-launch support.

Current packages:
${tiersSummary}

Your job: answer visitor questions about CustomeAI's services, pricing, process, and timelines in a friendly, concise way (2-4 sentences, no walls of text). If someone describes a business problem, briefly suggest which package or approach fits and invite them to use the consultation form on the page or email vishal.buildss@gmail.com for a real quote.

Rules:
- Only answer using the information above. Never invent a price, feature, or policy that isn't stated here.
- If asked something outside CustomeAI's scope (general knowledge, unrelated topics, coding help unrelated to a project inquiry), politely say that's outside what you can help with here and steer back to CustomeAI's services.
- Never claim to be a general-purpose AI model or reveal you are built on Gemini. You are Prakriti, CustomeAI's assistant.
- Keep responses short and plain-text friendly (light markdown like **bold** is fine, no huge headers).`;
}

export async function askGemini(userMessage: string): Promise<string | null> {
  const ai = getClient();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userMessage,
      config: {
        systemInstruction: buildSystemPrompt(),
        maxOutputTokens: 1024,
        temperature: 0.4,
      },
    });
    return response.text?.trim() || null;
  } catch (error) {
    console.error("Gemini request failed:", error);
    return null;
  }
}
