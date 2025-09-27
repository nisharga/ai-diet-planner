// api.ts
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_AI_API_KEY, // use your key from .env
});


export const calculateCaloriesAndProteins = async (data: {
  weight: number;
  height: number;
  gender: string;
  goal: string;
}) => {
  try {
    const prompt = `
      A ${data.gender}, weight ${data.weight} kg, height ${data.height} ft, goal: ${data.goal}.
      Calculate:
      1. Daily calories needed.
      2. Daily protein needed (in grams).
      Return JSON format:
      { "calories": number, "proteins": number }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // lightweight, fast
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      response_format: { type: "json_object" }, // ensures valid JSON
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error calculating calories:", error);
    throw error;
  }
};
