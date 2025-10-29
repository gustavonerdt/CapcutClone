import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResponseSchema, insertTrackingEventSchema, insertSessionSchema } from "@shared/schema";
import { z } from "zod";

// Admin username (simples, sem senha)
const ADMIN_USERNAME = "Bruno";

// Middleware to check admin authentication
function requireAdmin(req: any, res: any, next: any) {
  if (req.session?.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login (apenas username, sem senha)
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username } = req.body;
      
      if (username === ADMIN_USERNAME) {
        req.session.isAdmin = true;
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid username" });
      }
    } catch (error) {
      console.error('[LOGIN ERROR]', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  // Check auth status
  app.get("/api/auth/status", (req, res) => {
    res.json({ isAuthenticated: !!req.session?.isAdmin });
  });
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

  // Get all quiz responses (for admin) - PROTECTED
  app.get("/api/quiz-responses", requireAdmin, async (req, res) => {
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

  // Update session (validate allowed fields)
  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { completedQuiz, clickedBuy } = req.body;
      
      // Only allow updating specific fields
      const allowedUpdates: any = {};
      if (typeof completedQuiz === 'number') allowedUpdates.completedQuiz = completedQuiz;
      if (typeof clickedBuy === 'number') allowedUpdates.clickedBuy = clickedBuy;
      
      const session = await storage.updateSession(id, allowedUpdates);
      res.json(session);
    } catch (error) {
      console.error("Session update error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Track event
  app.post("/api/tracking", async (req, res) => {
    try {
      const validatedData = insertTrackingEventSchema.parse(req.body);
      const event = await storage.createTrackingEvent(validatedData);
      
      // Log for monitoring (can be sent to analytics service in production)
      console.log(`[TRACKING] ${validatedData.eventType} - Session: ${validatedData.sessionId}, Step: ${validatedData.stepNumber || 'N/A'}`);
      
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Tracking validation error:", error.errors);
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Tracking error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get analytics (for admin dashboard) - PROTECTED
  app.get("/api/analytics", requireAdmin, async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all tracking events (for admin) - PROTECTED
  app.get("/api/tracking", requireAdmin, async (req, res) => {
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
