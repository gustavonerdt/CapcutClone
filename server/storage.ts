import { 
  quizResponses, 
  trackingEvents, 
  sessions,
  type QuizResponse, 
  type InsertQuizResponse,
  type TrackingEvent,
  type InsertTrackingEvent,
  type Session,
  type InsertSession,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getAllQuizResponses(): Promise<QuizResponse[]>;
  getQuizResponse(id: string): Promise<QuizResponse | undefined>;
  
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: string, data: Partial<Session>): Promise<Session | undefined>;
  getSession(id: string): Promise<Session | undefined>;
  
  createTrackingEvent(event: InsertTrackingEvent): Promise<TrackingEvent>;
  getEventsBySession(sessionId: string): Promise<TrackingEvent[]>;
  getAllEvents(): Promise<TrackingEvent[]>;
  
  getAnalytics(): Promise<{
    totalSessions: number;
    totalPageViews: number;
    totalFormSubmissions: number;
    totalBuyClicks: number;
    answerClicksByQuestion: { [key: string]: { [answerId: string]: number } };
    exitsByStep: { [step: string]: number };
    conversionFunnel: { step: string; count: number; }[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async createQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const [response] = await db
      .insert(quizResponses)
      .values({
        ...insertResponse,
        phone: insertResponse.phone ?? null,
      })
      .returning();
    return response;
  }

  async getAllQuizResponses(): Promise<QuizResponse[]> {
    return await db.select().from(quizResponses).orderBy(desc(quizResponses.createdAt));
  }

  async getQuizResponse(id: string): Promise<QuizResponse | undefined> {
    const [response] = await db.select().from(quizResponses).where(eq(quizResponses.id, id));
    return response || undefined;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db
      .insert(sessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async updateSession(id: string, data: Partial<Session>): Promise<Session | undefined> {
    const [session] = await db
      .update(sessions)
      .set({ ...data, lastActivityAt: new Date() })
      .where(eq(sessions.id, id))
      .returning();
    return session || undefined;
  }

  async getSession(id: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session || undefined;
  }

  async createTrackingEvent(event: InsertTrackingEvent): Promise<TrackingEvent> {
    const [trackingEvent] = await db
      .insert(trackingEvents)
      .values(event)
      .returning();
    return trackingEvent;
  }

  async getEventsBySession(sessionId: string): Promise<TrackingEvent[]> {
    return await db
      .select()
      .from(trackingEvents)
      .where(eq(trackingEvents.sessionId, sessionId))
      .orderBy(trackingEvents.createdAt);
  }

  async getAllEvents(): Promise<TrackingEvent[]> {
    return await db.select().from(trackingEvents).orderBy(desc(trackingEvents.createdAt));
  }

  async getAnalytics() {
    // Total sessions
    const totalSessionsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(sessions);
    const totalSessions = totalSessionsResult[0]?.count || 0;

    // Total page views
    const totalPageViewsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(trackingEvents)
      .where(eq(trackingEvents.eventType, 'page_view'));
    const totalPageViews = totalPageViewsResult[0]?.count || 0;

    // Total form submissions
    const totalFormSubmissionsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(trackingEvents)
      .where(eq(trackingEvents.eventType, 'form_submit'));
    const totalFormSubmissions = totalFormSubmissionsResult[0]?.count || 0;

    // Total buy clicks
    const totalBuyClicksResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(trackingEvents)
      .where(eq(trackingEvents.eventType, 'buy_click'));
    const totalBuyClicks = totalBuyClicksResult[0]?.count || 0;

    // Answer clicks by question
    const answerClicksRaw = await db
      .select({
        stepNumber: trackingEvents.stepNumber,
        answerId: trackingEvents.answerId,
        count: sql<number>`count(*)::int`,
      })
      .from(trackingEvents)
      .where(eq(trackingEvents.eventType, 'answer_click'))
      .groupBy(trackingEvents.stepNumber, trackingEvents.answerId);

    const answerClicksByQuestion: { [key: string]: { [answerId: string]: number } } = {};
    for (const row of answerClicksRaw) {
      const step = `step_${row.stepNumber || 0}`;
      if (!answerClicksByQuestion[step]) {
        answerClicksByQuestion[step] = {};
      }
      if (row.answerId) {
        answerClicksByQuestion[step][row.answerId] = row.count;
      }
    }

    // Exits by step
    const exitsRaw = await db
      .select({
        stepNumber: trackingEvents.stepNumber,
        count: sql<number>`count(*)::int`,
      })
      .from(trackingEvents)
      .where(eq(trackingEvents.eventType, 'exit'))
      .groupBy(trackingEvents.stepNumber);

    const exitsByStep: { [step: string]: number } = {};
    for (const row of exitsRaw) {
      exitsByStep[`step_${row.stepNumber || 0}`] = row.count;
    }

    // Conversion funnel
    const funnelSteps = [
      { step: 'Hero Page', event: 'page_view', stepNum: 0 },
      { step: 'Question 1', event: 'answer_click', stepNum: 1 },
      { step: 'Question 2', event: 'answer_click', stepNum: 2 },
      { step: 'Question 3', event: 'answer_click', stepNum: 3 },
      { step: 'Question 4', event: 'answer_click', stepNum: 4 },
      { step: 'Question 5', event: 'answer_click', stepNum: 5 },
      { step: 'Final Page', event: 'page_view', stepNum: 6 },
      { step: 'Buy Click', event: 'buy_click', stepNum: null },
    ];

    const conversionFunnel = [];
    for (const funnelStep of funnelSteps) {
      let count = 0;
      if (funnelStep.stepNum !== null) {
        const result = await db
          .select({ count: sql<number>`count(DISTINCT ${trackingEvents.sessionId})::int` })
          .from(trackingEvents)
          .where(
            sql`${trackingEvents.eventType} = ${funnelStep.event} AND ${trackingEvents.stepNumber} = ${funnelStep.stepNum}`
          );
        count = result[0]?.count || 0;
      } else {
        const result = await db
          .select({ count: sql<number>`count(DISTINCT ${trackingEvents.sessionId})::int` })
          .from(trackingEvents)
          .where(eq(trackingEvents.eventType, funnelStep.event));
        count = result[0]?.count || 0;
      }
      conversionFunnel.push({ step: funnelStep.step, count });
    }

    return {
      totalSessions,
      totalPageViews,
      totalFormSubmissions,
      totalBuyClicks,
      answerClicksByQuestion,
      exitsByStep,
      conversionFunnel,
    };
  }
}

export const storage = new DatabaseStorage();
