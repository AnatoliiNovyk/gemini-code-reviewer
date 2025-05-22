
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME, CODE_REVIEW_SYSTEM_INSTRUCTION } from '../constants';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable is not set. Please set it to use the Gemini API.");
  // In a real app, you might throw an error or display this to the user in the UI.
  // For this exercise, we assume it's set, but a console warning is good for developers.
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! }); // Assert API_KEY is present as per requirements

export async function reviewCodeWithGemini(code: string): Promise<string> {
  if (!process.env.API_KEY) {
    return Promise.reject("API_KEY is not configured. Please set the API_KEY environment variable.");
  }

  try {
    const prompt = `
Review the following code:
\`\`\`
${code}
\`\`\`
`;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: CODE_REVIEW_SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lower temperature for more factual/deterministic review
        topP: 0.9,
        topK: 40,
      }
    });
    
    const reviewText = response.text;
    if (!reviewText) {
      throw new Error("Received an empty response from Gemini API.");
    }
    return reviewText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      // More specific error messages can be helpful
      if (error.message.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
      }
      throw new Error(`Failed to get review from Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching the code review.");
  }
}
