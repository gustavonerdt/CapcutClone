import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  answer1: text("answer1").notNull(),
  answer2: text("answer2").notNull(),
  answer3: text("answer3").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
});

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;

// Quiz data structure
export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  id: string;
  text: string;
  icon?: string;
}
