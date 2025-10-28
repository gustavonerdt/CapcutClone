import { type QuizResponse, type InsertQuizResponse } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getAllQuizResponses(): Promise<QuizResponse[]>;
  getQuizResponse(id: string): Promise<QuizResponse | undefined>;
}

export class MemStorage implements IStorage {
  private quizResponses: Map<string, QuizResponse>;

  constructor() {
    this.quizResponses = new Map();
  }

  async createQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = randomUUID();
    const response: QuizResponse = {
      ...insertResponse,
      id,
      createdAt: new Date(),
    };
    this.quizResponses.set(id, response);
    return response;
  }

  async getAllQuizResponses(): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values());
  }

  async getQuizResponse(id: string): Promise<QuizResponse | undefined> {
    return this.quizResponses.get(id);
  }
}

export const storage = new MemStorage();
