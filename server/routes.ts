import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResponseSchema, insertTrackingEventSchema, insertSessionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit quiz response
  app.post("/api/quiz-responses", async (req, res) => {
    try {
      const validatedData = insertQuizResponseSchema.parse(req.body);
      const response = await storage.createQuizResponse(validatedData);
      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all quiz responses (for admin)
  app.get("/api/quiz-responses", async (req, res) => {
    try {
      const responses = await storage.getAllQuizResponses();
      res.json(responses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create session
  app.post("/api/sessions", async (req, res) => {
    try {
      const session = await storage.createSession({});
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update session
  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const session = await storage.updateSession(id, req.body);
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Track event
  app.post("/api/tracking", async (req, res) => {
    try {
      const validatedData = insertTrackingEventSchema.parse(req.body);
      const event = await storage.createTrackingEvent(validatedData);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get analytics (for admin dashboard)
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all tracking events (for admin)
  app.get("/api/tracking", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
