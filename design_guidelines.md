# Design Guidelines: CapCut Quiz Landing Page

## Design Approach

**Selected Approach:** Reference-Based (Quiz Funnel + Social Media Marketing)

Drawing inspiration from:
- **Typeform:** Clean, focused quiz interfaces with smooth transitions
- **Instagram/TikTok Landing Pages:** Mobile-first, high-conversion design patterns
- **Brazilian Marketing Funnels:** Warm, conversational tone with urgency elements

**Key Principles:**
- Single-column, distraction-free quiz flow
- Mobile-first design (primary traffic source: Instagram)
- High contrast, conversion-optimized CTAs
- Minimal cognitive load per step
- Trust-building through progressive disclosure

## Typography

**Font Selection:** Google Fonts
- **Primary:** Inter or Poppins (clean, modern, highly legible)
- **Headings:** Bold weight (700) for impact
- **Body:** Regular (400) and Medium (500)

**Hierarchy:**
- Quiz Questions: text-3xl to text-4xl, font-bold
- Supporting Text: text-lg to text-xl, font-normal
- Button Text: text-base to text-lg, font-semibold
- Progress Indicators: text-sm, font-medium

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16
- Consistent vertical rhythm: py-8, py-12, py-16
- Button padding: px-8 py-4
- Card spacing: p-6 to p-8
- Section gaps: space-y-8 to space-y-12

**Container Structure:**
- Max-width: max-w-2xl (narrow, focused funnel)
- Centered layout: mx-auto
- Mobile padding: px-4 to px-6
- Full-height sections for quiz steps: min-h-screen with flex centering

## Component Library

### Hero Section
**Layout:** Full-viewport introduction (min-h-screen)
- Large hero image at top (CapCut/video editing theme)
- Overlay with centered content
- Headline with emotional hook
- Subheadline with qualifying question
- Single prominent CTA button (blurred background overlay on image)

### Quiz Steps (Interactive Funnel)
**Each Step Contains:**
- Progress bar (sticky top position, showing completion percentage)
- Question number indicator (e.g., "Pergunta 1 de 5")
- Large, bold question text
- Answer options as full-width cards with hover states
- Optional: Small supporting imagery per question
- Smooth slide/fade transitions between steps

**Answer Card Design:**
- Generous padding (p-6)
- Rounded corners (rounded-xl)
- Border with hover effect
- Icon or emoji prefix for visual interest
- Clear typography hierarchy
- Active/selected state with distinct styling

### Progress Indicator
**Position:** Fixed top of viewport
**Style:** 
- Thin bar (h-2)
- Smooth width transition animation
- Percentage text or step counter (optional)

### Lead Capture Form (Final Step)
**Layout:**
- Centered card design
- Compelling headline ("Receba seu resultado!")
- Form fields: Name, Email, Phone (optional WhatsApp)
- Large submit button
- Trust badges/social proof elements
- Privacy assurance text

### Call-to-Action Buttons
**Primary CTA (Quiz Start & Submit):**
- Large size (px-8 py-4 to px-12 py-5)
- Rounded design (rounded-full or rounded-lg)
- High contrast
- Subtle shadow or glow effect
- Scale transform on hover
- Blurred background when on images

**Secondary Actions:**
- Text links with arrow icons
- Smaller buttons with outline style

### Supporting Elements
**Trust Indicators:**
- User count badges ("Mais de 10.000 usuários")
- Star ratings or testimonial snippets
- Brand logos (CapCut official branding)
- Time-sensitive messaging ("Oferta limitada")

## Images

### Hero Image
**Description:** High-quality, engaging image showing:
- Person using phone/tablet for video editing, OR
- Montage of successful video content/social media posts, OR
- Before/after video transformation visual

**Placement:** Full-width background image in hero section with dark overlay (opacity-50 to opacity-70) for text readability

**Additional Images:**
- Quiz step backgrounds: Subtle patterns or gradient overlays (not full images)
- Result page: Celebration or success imagery
- Trust section: Small thumbnail images of video examples or user avatars

## Quiz Flow Structure

**Step Progression:**
1. **Hero/Introduction** - Single question teaser with large CTA
2. **Quiz Steps (3-5 questions)** - One question per full-screen view
3. **Email Capture** - "Unlock your results" conversion point
4. **Results/CTA Page** - Personalized result with product pitch

**Transition Animations:** 
- Slide transitions (slide-in from right, slide-out to left)
- Fade effects between major sections
- Progress bar smooth width animation
- Button pulse/scale on interaction

## Mobile Optimization

**Critical Considerations:**
- Touch-friendly targets (min 44px height)
- Thumb-zone optimization for CTAs
- Reduced text sizes on mobile (scale down by 1-2 steps)
- Stack all elements vertically
- Larger tap areas for quiz answers
- Fixed progress bar doesn't obscure content

## Accessibility

**Form Inputs:**
- Clear labels above inputs
- Placeholder text as examples
- Error states with descriptive messages
- Required field indicators

**General:**
- Sufficient contrast ratios (WCAG AA minimum)
- Focus states on all interactive elements
- Semantic HTML structure
- Keyboard navigation support

## Conversion Optimization Elements

**Psychological Triggers:**
- Scarcity messaging ("Vagas limitadas")
- Social proof throughout
- Progress commitment (sunk cost as users advance)
- Personalization in results
- Urgency indicators (countdown timers if appropriate)

**Brazilian Market Specifics:**
- Warm, conversational Portuguese copy
- WhatsApp integration for lead capture
- Mobile payment options awareness
- Local social proof (Brazilian testimonials)

This design creates a high-converting quiz funnel optimized for Instagram traffic, combining modern UI patterns with proven conversion principles while maintaining brand consistency with CapCut's video editing focus.