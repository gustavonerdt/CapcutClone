import { useEffect, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";

let sessionId: string | null = null;

export function useTracking() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      initSession();
    }
  }, []);

  const initSession = async () => {
    try {
      const existingSession = localStorage.getItem("quiz_session_id");
      if (existingSession) {
        sessionId = existingSession;
      } else {
        const session = await apiRequest("POST", "/api/sessions", {}) as any;
        sessionId = session.id;
        localStorage.setItem("quiz_session_id", session.id);
      }
    } catch (error) {
      console.error("Failed to initialize session:", error);
    }
  };

  const trackEvent = async (
    eventType: string,
    stepNumber?: number,
    answerId?: string,
    metadata?: any
  ) => {
    if (!sessionId) {
      await initSession();
    }

    try {
      await apiRequest("POST", "/api/tracking", {
        sessionId: sessionId!,
        eventType,
        stepNumber,
        answerId,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      });
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  };

  const updateSession = async (data: any) => {
    if (!sessionId) return;

    try {
      await apiRequest("PATCH", `/api/sessions/${sessionId}`, data);
    } catch (error) {
      console.error("Failed to update session:", error);
    }
  };

  return { trackEvent, updateSession, sessionId: sessionId || "" };
}
