# Naiper's Club - Perfume Quiz Funnel

## Overview
A high-converting quiz landing page for Naiper's Club perfumes with comprehensive analytics tracking and admin dashboard. Portuguese-language funnel optimized for Instagram traffic with PostgreSQL database and real-time metrics.

## Purpose
Create a conversion-optimized perfume sales funnel that tracks every user interaction and provides detailed analytics for marketing optimization.

## Recent Changes (October 29, 2025)
- ✅ Transformed quiz into Naiper's Club perfume sales funnel (6 pages total)
- ✅ Migrated from MemStorage to PostgreSQL database with Drizzle ORM
- ✅ Implemented comprehensive tracking system (page views, clicks, exits, conversions)
- ✅ Built admin dashboard with real-time analytics and conversion funnel
- ✅ Added server-side authentication with express-session for admin security
- ✅ Created protected API endpoints with requireAdmin middleware
- ✅ Full end-to-end testing with quiz flow and admin authentication
- ✅ **LATEST**: Typography adjusted to match client reference (italic heading, compact text sizes for mobile-first)

## Project Architecture

### Frontend (React + TypeScript)
- **Hero Section**: Naiper's Club branded landing with background image and CTA
- **Quiz Flow**: Interactive perfume preference quiz with smooth transitions
- **Tracking Hook**: useTracking hook automatically tracks all user interactions
- **Lead Capture Form**: React-hook-form with Zod validation for name, email, phone
- **Success Page**: Personalized confirmation with "Comprar Agora" button
- **Admin Dashboard**: Protected analytics dashboard with real-time metrics

### Backend (Express + PostgreSQL)
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Authentication**: Express-session with secure cookies for admin access
- **API Endpoints**:
  - `POST /api/quiz-responses`: Submit quiz response (public)
  - `POST /api/tracking`: Track user events (public)
  - `POST /api/sessions`: Create tracking session (public)
  - `POST /api/auth/login`: Admin authentication (public)
  - `GET /api/analytics`: Get metrics (protected)
  - `GET /api/quiz-responses`: Get all leads (protected)
  - `GET /api/tracking`: Get all events (protected)
- **Security**: requireAdmin middleware protects sensitive endpoints
- **Validation**: Zod schema validation on all inputs
- **Monitoring**: Console logging for tracking events

### Design System
- **Branding**: Naiper's Club logo and colors
- **Colors**: Vibrant purple/pink gradients (primary: 280 85% 60%)
- **Typography**: Inter/Poppins fonts with clear hierarchy
- **Animations**: Smooth framer-motion transitions
- **Mobile-First**: Optimized for Instagram traffic

## Data Model

### Quiz Response
```typescript
{
  id: string (UUID)
  sessionId: string (tracking session)
  name: string
  email: string
  phone: string | null
  answer1: string
  answer2: string
  answer3: string
  createdAt: Date
}
```

### Tracking Event
```typescript
{
  id: string (UUID)
  sessionId: string
  eventType: 'page_view' | 'answer_click' | 'form_submit' | 'buy_click' | 'exit'
  stepNumber: number | null (0=hero, 1-5=questions, 6=form, 7=success)
  answerId: string | null
  metadata: string | null (JSON)
  createdAt: Date
}
```

### Session
```typescript
{
  id: string (UUID)
  startedAt: Date
  lastActivityAt: Date
  completedQuiz: 0 | 1
  clickedBuy: 0 | 1
}
```

## Key Features
1. ✅ Naiper's Club branded perfume quiz funnel
2. ✅ Comprehensive tracking (all interactions saved to PostgreSQL)
3. ✅ Server-side admin authentication with sessions
4. ✅ Real-time analytics dashboard with conversion funnel
5. ✅ Protected API endpoints (401 for unauthorized access)
6. ✅ Form validation with Portuguese error messages
7. ✅ Mobile-responsive design for Instagram traffic
8. ✅ Secure checkout integration (Ticto payment link)
9. ✅ All data-testid attributes for testing

## Admin Dashboard
- **URL**: `/admin`
- **Credentials**: 
  - Username: `admin` (or set `ADMIN_USERNAME` env var)
  - Password: `naipersadmin2024` (or set `ADMIN_PASSWORD` env var)
- **Metrics Displayed**:
  - Total Sessions/Visitors
  - Total Page Views
  - Form Submissions (leads captured)
  - Buy Button Clicks
  - Conversion Funnel (visual)
  - Answer Distribution per Question
  - Recent Leads Table (name, email, phone, date)
  - Exit Points Analysis

## Running the Application
The workflow "Start application" runs `npm run dev` which starts:
- Express server on port 5000 (backend API + PostgreSQL)
- Vite dev server (frontend with HMR)

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection (auto-configured by Replit)
- `SESSION_SECRET`: Session encryption key (auto-configured)
- `ADMIN_USERNAME`: Admin login username (default: "admin")
- `ADMIN_PASSWORD`: Admin login password (default: "naipersadmin2024")
- `NODE_ENV`: Environment (development/production)

## Testing
Complete end-to-end test coverage for:
- Hero section and quiz flow (5 questions)
- Form validation and lead submission
- Success page and buy button
- Admin authentication (login/logout)
- Protected endpoints (401 unauthorized)
- Analytics dashboard display
- Recent leads table

## Production Deployment Notes
Before deploying to production:
1. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables
2. Set secure `SESSION_SECRET` environment variable
3. Consider implementing password hashing (bcrypt)
4. Enable HTTPS (cookie secure flag)
5. Set up proper database backups
6. Configure monitoring for tracking events
7. Review rate limiting for public endpoints
