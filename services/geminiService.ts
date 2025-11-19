import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { MealPlanResponse, UserProfile, BlogPost } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMealPlan = async (profile: UserProfile): Promise<MealPlanResponse> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    Generate a personalized 3-day meal plan for a user with the following profile:
    Age: ${profile.age}
    Gender: ${profile.gender}
    Weight: ${profile.weight}kg
    Height: ${profile.height}cm
    Goal: ${profile.goal}
    Dietary Restrictions: ${profile.dietaryRestrictions}
    Activity Level: ${profile.activityLevel}

    Provide a creative name for this plan, a brief summary, a daily breakdown (Breakfast, Lunch, Dinner, Snack) with approximate macros per meal, and a consolidated shopping list.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          planName: { type: Type.STRING },
          summary: { type: Type.STRING },
          shoppingList: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          dailyPlans: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING, description: "e.g., Day 1" },
                breakfast: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    macros: {
                      type: Type.OBJECT,
                      properties: {
                        protein: { type: Type.NUMBER },
                        carbs: { type: Type.NUMBER },
                        fats: { type: Type.NUMBER },
                        calories: { type: Type.NUMBER },
                      }
                    }
                  }
                },
                lunch: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    macros: {
                      type: Type.OBJECT,
                      properties: {
                        protein: { type: Type.NUMBER },
                        carbs: { type: Type.NUMBER },
                        fats: { type: Type.NUMBER },
                        calories: { type: Type.NUMBER },
                      }
                    }
                  }
                },
                dinner: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    macros: {
                      type: Type.OBJECT,
                      properties: {
                        protein: { type: Type.NUMBER },
                        carbs: { type: Type.NUMBER },
                        fats: { type: Type.NUMBER },
                        calories: { type: Type.NUMBER },
                      }
                    }
                  }
                },
                snack: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    macros: {
                      type: Type.OBJECT,
                      properties: {
                        protein: { type: Type.NUMBER },
                        carbs: { type: Type.NUMBER },
                        fats: { type: Type.NUMBER },
                        calories: { type: Type.NUMBER },
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as MealPlanResponse;
  }
  throw new Error("Failed to generate meal plan");
};

export const generateBlogContent = async (topic: string): Promise<string> => {
  const modelId = "gemini-2.5-flash";
  
  const response = await ai.models.generateContent({
    model: modelId,
    contents: `Write a helpful, engaging, and scientifically accurate nutrition blog post about: "${topic}". 
    Keep it under 400 words. Use plain text with double line breaks for paragraphs. Do not use markdown formatting like ** or #.`,
  });

  return response.text || "Content currently unavailable.";
};