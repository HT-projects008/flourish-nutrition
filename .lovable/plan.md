Remove the email waitlist form from the Hero section of the landing page.

What to remove from `src/routes/index.tsx`:
- The `<WaitlistForm id="hero-email" />` component inside the Hero section
- The accompanying `<p>` text below it: "Join 500+ people waiting for Flourish..."

The Hero section should keep:
- The badge / pill label
- The headline "Feel lighter. Every day."
- The subheadline paragraph
- The hero image

The waitlist section further down the page (#waitlist) and the nav "Get Early Access" button remain unchanged.