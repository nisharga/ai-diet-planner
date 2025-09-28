// api.ts
import { OpenAI } from "openai";



const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_AI_API_KEY, // use your key from .env
});

// 1. calculateCaloriesAndProteins
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
 

// 2. Generate full recipe
export const generateRecipeVariants = async (recipeName: string ) => {
  try {
    const prompt = `You are a recipe generator AI.  
      Based on the given recipeName and description, generate a complete recipe in JSON format only.  

      Requirements:  
      - Provide a short description of the dish.  
      - Return the ${recipeName} exactly as provided.  
      - Add emoji icons for each ingredient in the icon field.  
      - List ingredients as objects containing icon, ingredient, and quantity.  
      - Calculate and return only the numeric value for calories (no units).  
      - Provide estimated cooking time in minutes as cookTime (numeric only).  
      - Suggest how many people it serves as serveTo (numeric only).  
      - Return a realistic image description as imagePrompt (string).  
      - Classify the recipe into one or more categories from:  
        ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Drink"].  
      - Provide a clear ordered list of steps to cook the dish.  
      - Output must be **valid JSON** and match the schema exactly.  
      - Do not include any extra text or explanations, only JSON.  

      Schema format:  
      {
        "description": "string",
        "recipeName": "string",
        "calories": "number",
        "category": ["string"],
        "cookTime": "number",
        "imagePrompt": "string",
        "ingredients": [
          {
            "icon": "string",
            "ingredient": "string",
            "quantity": "string"
          }
        ],
        "serveTo": "number",
        "steps": ["string"]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error generating full recipe:", error);
    throw error;
  }
}; 