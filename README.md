# ARM Capital Website

A premium, institutional-grade landing page for ARM Capital, built with Next.js, React, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth, professional animations
- **Responsive Design**: Fully responsive across all device sizes
- **SEO Optimized**: Semantic HTML and metadata configuration
- **Institutional Design**: Minimal, data-driven, high-tech aesthetic

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. (Optional) Set up Mapbox token for enhanced map visualization:
```bash
# Create a .env.local file
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Navigation.tsx      # Fixed navigation component
│   └── sections/
│       ├── Hero.tsx        # Hero section with animated background
│       ├── AboutUs.tsx     # About section
│       ├── OurEdge.tsx     # Our Edge section (People, Data, Insights)
│       ├── InvestmentStrategy.tsx  # Strategy section
│       ├── GlobalPresence.tsx      # Global presence with map
│       ├── Team.tsx        # Team section with flip cards
│       ├── PerformanceInsights.tsx # Performance and process section
│       └── ContactFooter.tsx       # Contact and footer
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Design System

### Colors
- **Primary**: Dark blue-gray palette (primary-50 to primary-950)
- **Accent**: Blue accent colors (accent-400 to accent-900)
- **Base**: Dark background (primary-950) with light text (primary-50)

### Typography
- **Serif**: Playfair Display (headings)
- **Sans-serif**: Inter (body text)

### Animations
- Scroll-triggered fade/slide animations
- Hover effects on interactive elements
- Smooth transitions throughout

## Build for Production

```bash
npm run build
npm start
```

## Key Sections

1. **Hero**: Institutional value proposition with animated grid background
2. **About Us**: Mission, philosophy, and values
3. **Our Edge**: Three pillars (People, Data, Insights)
4. **Investment Strategy**: Long/short framework and sector exposure
5. **Global Presence**: Interactive world map visualization
6. **Team**: Team member cards with flip animations
7. **Performance/Insights**: Animated counters and investment process
8. **Contact & Footer**: Contact CTA and comprehensive legal disclaimers

## Notes

- The website is designed for institutional investors and maintains a professional, minimal aesthetic
- All content is based on the ARM Capital investor presentation
- Mapbox integration is optional - the map will work without a token but with limited functionality
- All animations are subtle and professional, avoiding marketing-style effects

## License

Proprietary - ARM Capital. All rights reserved.
