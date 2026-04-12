# Asaase Labs Website

A world-class, highly interactive website for Asaase Labs - an African-based technology innovation lab. Built with industry-leading design standards comparable to Apple, Google, and Amazon.

## Design Philosophy

- **Minimalist & Clean**: Strong visual hierarchy with generous whitespace
- **Performance-First**: Optimized for speed and responsiveness
- **Accessibility**: Built-in keyboard navigation and screen reader support
- **Responsive**: Mobile-first approach with fluid layouts
- **Purposeful Interactions**: Subtle micro-interactions that enhance UX

## Features

- ✨ Clean, minimalistic design with refined UI components
- 🎨 Light mode with neutral tones and purposeful accent colors
- 📱 Fully responsive across all devices
- ⚡ Built with Next.js 14 for optimal performance
- 🎭 Smooth animations with Framer Motion
- 🎯 SEO optimized with semantic HTML
- ♿ WCAG accessibility standards
- 🚀 Fast loading with optimized assets

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Font:** System fonts (-apple-system, Inter)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles & design system
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Services.tsx     # Services section
│   ├── Products.tsx     # Products showcase
│   ├── WhyChooseUs.tsx  # Why choose us section
│   ├── Process.tsx      # Process workflow
│   ├── Testimonials.tsx # Client testimonials
│   ├── CTA.tsx          # Call-to-action section
│   └── Footer.tsx       # Footer
└── public/              # Static assets
```

## Design System

### Colors
- **Primary**: Blue (#0EA5E9) - Actions and links
- **Accent**: Purple (#A855F7) - Highlights
- **Neutral**: Gray scale - Base colors
- **Background**: White with subtle patterns

### Typography
- **System Fonts**: -apple-system, BlinkMacSystemFont, Inter
- **Hierarchy**: Clear distinction between headings, subheadings, and body text
- **Legibility**: Optimized line heights and letter spacing

### Components
- **Buttons**: Primary and secondary variants with hover states
- **Cards**: Elevated with subtle shadows and hover effects
- **Spacing**: Consistent 8px grid system
- **Borders**: Rounded corners (8px, 12px, 16px)

### Interactions
- **Hover States**: Subtle scale and shadow changes
- **Transitions**: 200-300ms with cubic-bezier easing
- **Animations**: Purposeful fade-ins and slide-ups
- **Focus States**: Clear keyboard navigation indicators

## Performance Optimizations

- Lazy loading for images and components
- Optimized font loading
- Minimal JavaScript bundle
- CSS optimization with Tailwind
- Fast page transitions

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast ratios
- Screen reader compatible
- Focus management

## Build for Production

```bash
npm run build
npm start
```

## License

© 2026 Asaase Labs. All rights reserved.
