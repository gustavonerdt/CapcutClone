import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  answer1: text("answer1").notNull(),
  answer2: text("answer2").notNull(),
  answer3: text("answer3").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trackingEvents = pgTable("tracking_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  eventType: text("event_type").notNull(), // page_view, answer_click, exit, buy_click, form_submit
  stepNumber: integer("step_number"), // quiz step number (0=hero, 1-5=questions, 6=form, 7=success)
  answerId: text("answer_id"), // which answer was clicked
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  lastActivityAt: timestamp("last_activity_at").defaultNow().notNull(),
  completedQuiz: integer("completed_quiz").default(0).notNull(), // 0 or 1
  clickedBuy: integer("clicked_buy").default(0).notNull(), // 0 or 1
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
});

export const insertTrackingEventSchema = createInsertSchema(trackingEvents).omit({
  id: true,
  createdAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  startedAt: true,
  lastActivityAt: true,
});

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertTrackingEvent = z.infer<typeof insertTrackingEventSchema>;
export type TrackingEvent = typeof trackingEvents.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Quiz data structure
export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
  type?: "standard" | "benefits" | "testimonials" | "progress" | "final";
}

export interface QuizAnswer {
  id: string;
  text: string;
  icon?: string;
}
