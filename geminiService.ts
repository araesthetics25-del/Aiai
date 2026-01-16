
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  public initChat(systemInstruction: string) {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
  }

  public async *sendMessageStream(message: string) {
    if (!this.chat) {
      throw new Error("Chat not initialized");
    }

    try {
      const result = await this.chat.sendMessageStream({ message });
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        yield c.text;
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  public resetChat(systemInstruction: string) {
    this.initChat(systemInstruction);
  }
}

export const geminiService = new GeminiService();
