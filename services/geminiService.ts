import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// FIX: Initialize GoogleGenAI directly with process.env.API_KEY per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
You are a friendly and knowledgeable college study buddy. Your goal is to help students understand complex topics in simple terms. 
You can explain concepts, help with homework problems, and provide study tips. 
Be encouraging, supportive, and break down information into easy-to-digest parts. 
Format your responses using markdown for better readability (e.g., use lists, bold text, etc.).
`;

export const askStudyBuddy = async (prompt: string, history: ChatMessage[]): Promise<string> => {
  // FIX: Removed explicit API_KEY check, assuming it's always provided in the environment.
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      // Convert our app's message format to the one expected by the Gemini API
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessage({ message: prompt });
    
    return result.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while contacting the AI service: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI service.";
  }
};
