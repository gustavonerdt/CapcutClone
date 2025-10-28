# CapCut Quiz Landing Page

## Overview

This is a Brazilian Portuguese quiz funnel landing page designed to capture leads for a CapCut video editing course or product. The application presents users with a multi-step quiz about their video creation challenges and goals, collects their contact information, and stores responses for lead generation. It's optimized for mobile-first traffic from Instagram/TikTok with a conversion-focused design approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool and development server.

**Rationale:** Vite provides fast Hot Module Replacement (HMR) for development, while React offers component-based architecture ideal for the multi-step quiz flow.

**UI Component System:** Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling.

**Design System:**
- Custom Tailwind configuration with CSS variables for theming
- "New York" style variant from Shadcn
- Mobile-first responsive design with max-width constraints (max-w-2xl for funnel focus)
- Conversion-optimized spacing using Tailwind units (4, 6, 8, 12, 16)
- Typography hierarchy using Inter or Poppins fonts

**State Management:** 
- React hooks (useState) for local component state
- TanStack Query (React Query) for server state management and API calls
- React Hook Form with Zod for form validation

**Animation:** Framer Motion for smooth transitions between quiz steps and engagement animations.

**Routing:** Wouter for lightweight client-side routing.

### Backend Architecture

**Server Framework:** Express.js running on Node.js with TypeScript.

**API Design:** RESTful endpoints for quiz response submission and retrieval.

**Development Setup:** 
- Vite middleware integration in development mode for seamless full-stack development
- Hot reloading with tsx for server-side TypeScript execution
- Separate build process using esbuild for production server bundle

**Production Serving:** Express serves the built Vite frontend as static files in production.

### Data Storage

**Current Implementation:** In-memory storage using a Map-based storage adapter (`MemStorage`).

**Rationale:** Provides a working prototype without external dependencies, suitable for development and testing.

**Database Schema Preparation:** Drizzle ORM configured with PostgreSQL dialect ready for production database integration.

**Schema Structure:**
- `quiz_responses` table with fields: id, name, email, phone, answer1, answer2, answer3, createdAt
- UUID primary keys with server-generated defaults
- Timestamp tracking for lead capture timing

**Migration Strategy:** Drizzle Kit configured for schema migrations when database is provisioned.

### Form Validation

**Validation Layer:** Zod schemas for runtime type validation.

**Integration:** Drizzle-Zod creates Zod schemas from database table definitions, ensuring consistency between database schema and API validation.

**Client-Side:** React Hook Form with Zod resolver for immediate user feedback.

**Server-Side:** Zod schema validation on API endpoints before data persistence.

### Design Philosophy

**Conversion Optimization:**
- Single-column, distraction-free layout
- Full-viewport sections for quiz steps
- Progressive disclosure to minimize cognitive load
- High-contrast CTAs with shadow and hover effects

**Mobile-First Approach:**
- Primary breakpoint at 768px
- Touch-friendly button sizes (min-h-9 default, larger for primary actions)
- Responsive padding and spacing
- Optimized for Instagram/TikTok traffic sources

**Brazilian Marketing Influence:**
- Warm, conversational tone in Portuguese
- Urgency elements in copy
- Social proof ready (mentioned 10,000+ creators)

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled component primitives (accordion, dialog, dropdown, form controls, etc.)
- **Shadcn/ui**: Pre-built component library built on Radix UI with customizable styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Icon library for UI icons

### Data Fetching & State
- **TanStack Query (React Query)**: Server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Performant form handling with minimal re-renders
- **Zod**: Schema validation for TypeScript

### Database & ORM
- **Drizzle ORM**: Type-safe ORM for PostgreSQL
- **Drizzle Kit**: Schema migration tool
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver (configured but not actively used with MemStorage)

### Routing & Navigation
- **Wouter**: Minimalist client-side routing library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production server build
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Utility Libraries
- **clsx**: Conditional CSS class name utility
- **class-variance-authority**: Type-safe component variants
- **tailwind-merge**: Tailwind class merging utility
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation

### Fonts
- **Google Fonts**: Inter, Poppins, DM Sans, Architects Daughter, Fira Code, Geist Mono (loaded via CDN)

### Future Integration Points
- PostgreSQL database (Drizzle configured, awaiting provisioning)
- Email service integration for lead nurturing
- Analytics tracking for conversion optimization
- Payment gateway for course sales
- CRM integration for lead management