# Auralis Travel

![Auralis Travel desktop preview](./auralis-desktop.png)

Auralis Travel is a polished travel discovery and booking interface built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. It presents curated destinations, local guide profiles, signature tours, itinerary planning, smart destination search, cart creation, and a frontend-only checkout flow in a single responsive experience.

The project focuses on a premium travel-planning user journey: a visitor can search for a location such as Bali, Istanbul, Ankara, Antalya, Palawan, Algarve, or Sardinia; select dates and travelers through custom UI pickers; view matching destinations; add a trip to the cart; and continue to a simulated payment screen.

## Repository

GitHub: [mutlukurt/auralistravel](https://github.com/mutlukurt/auralistravel)

## Key Features

- Premium responsive landing page for a curated travel brand.
- Smart location picker with travel-specific suggestions.
- Custom calendar picker for travel date, check-in, and check-out selection.
- Traveler selector with stepper-based group-size control.
- Destination filtering based on selected location and travel context.
- Destination cards with professional travel details, pricing, ratings, seasons, inclusions, and audience fit.
- Frontend-only cart and checkout modal with trip summary, room count, nights, and estimated total.
- Login and sign-up modal flows with validation-ready frontend forms.
- Local guide section with guide expertise, languages, regions, and service value.
- Signature tours section with guide notes, highlights, durations, and pricing.
- Planning flow section showing how a trip becomes an itinerary.
- Journal, FAQ, testimonial, CTA, and footer sections.
- Smooth mobile hamburger navigation with programmatic section scrolling.
- Fully responsive layout for desktop and mobile.
- MIT license and developer attribution.

## User Value

Auralis Travel helps users move from inspiration to a structured trip decision without feeling overwhelmed. Instead of showing generic destination cards, the interface gives users:

- Clear destination summaries and practical travel context.
- Local guide information before booking.
- Matching destinations based on selected places.
- A visual booking path from search to cart to checkout.
- Date, traveler, and room context before payment.
- A calm, premium UI designed for comparison and decision-making.

For a real travel product, this frontend can serve as the foundation for a booking marketplace, destination discovery platform, curated travel agency website, or itinerary-planning SaaS.

## Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| Next.js | `^15.1.0` | App Router framework, routing, static generation, production build pipeline |
| React | `^19.0.0` | Component model, UI state, modal flows, interactive pickers |
| React DOM | `^19.0.0` | Browser rendering for React |
| TypeScript | `^5.7.2` | Static typing for components, data models, props, and UI state |
| Tailwind CSS | `^3.4.17` | Utility-first styling, responsive layout, theme tokens |
| Framer Motion | `^12.23.24` | Page entrance animations, hover effects, modal transitions, popovers |
| Lucide React | `^0.468.0` | Icon system for navigation, search, checkout, cards, and UI controls |
| Simple Icons | `^13.15.0` | Social media icons in the footer |
| ESLint | `^9.17.0` | Code quality and linting |
| eslint-config-next | `^15.1.0` | Next.js-specific linting rules |
| Playwright | `^1.60.0` | Browser verification and frontend interaction testing |
| PostCSS | `^8.4.49` | CSS processing pipeline |
| Autoprefixer | `^10.4.20` | CSS vendor prefix handling |

## Architecture

The application uses the Next.js App Router with a single composed home page. Each major section is isolated into a dedicated component under `components/`, while structured content lives in `lib/data.ts`.

```text
app/
  layout.tsx          Root metadata, fonts, global layout
  page.tsx            Home page composition
  globals.css         Tailwind layers and global theme utilities

components/
  Header.tsx          Desktop/mobile navigation, auth modal triggers
  HeroSection.tsx     First viewport and primary search entry
  SearchBar.tsx       Smart location/date/person picker logic
  AboutSection.tsx    Brand positioning and statistics
  FeaturesSection.tsx Service feature cards
  GuidesSection.tsx   Local guide profiles and guide metrics
  ExperienceSection.tsx Signature tour cards
  PlanningSection.tsx Itinerary planning preview
  DestinationsSection.tsx Destination filtering, cart, checkout
  DestinationCard.tsx Detailed destination card
  TestimonialSection.tsx Traveler testimonial
  JournalSection.tsx  Travel article cards
  FAQSection.tsx      Expandable FAQ
  CTASection.tsx      Final conversion section
  Footer.tsx          Footer navigation, newsletter, attribution

lib/
  data.ts             Typed content models and static product data
  motion.ts           Shared Framer Motion variants

public/images/
  Travel imagery used by hero, destinations, tours, journal, and testimonials
```

## Core Frontend Flows

### Smart Search

The search bar is implemented as a custom travel picker rather than native browser controls.

- Location opens a searchable suggestion panel.
- Date fields open a custom calendar.
- Person opens a traveler stepper.
- Clicking outside the picker closes it.
- Pressing Escape closes open picker panels.
- Submitting a valid search dispatches frontend search state to the destinations section.

### Destination Matching

Destination data includes searchable terms such as city, country, route type, and travel category. When the user selects a location, the destinations section filters matching cards and displays a contextual result summary.

Example matches:

- `Bali` -> Bali, Ubud, Seminyak, Nusa Dua, Indonesia-related routes.
- `Istanbul`, `Ankara`, `Antalya` -> Turkiye and Mediterranean culture routes.
- `Palawan` -> lagoon and island-hopping routes.
- `Algarve` -> Portugal coastal routes.

### Cart and Checkout

Each destination card can be added to the cart. The checkout modal calculates a frontend-only estimate using:

- base destination price,
- selected nights,
- traveler count,
- room count.

The payment form is intentionally frontend-only. It demonstrates checkout UI and confirmation behavior without processing payments or sending sensitive data anywhere.

## Design System

The visual design uses a warm travel-oriented palette with a clean premium editorial feel.

- Primary accent: orange (`#F97316`)
- Surface colors: white, soft off-white, peach
- Text: dark navy-neutral and muted gray
- Components: rounded cards, soft shadows, high contrast CTAs
- Mobile: bottom-sheet style picker behavior
- Desktop: compact dropdown picker behavior

Reusable Tailwind theme tokens are configured in `tailwind.config.ts`.

## Accessibility and UX Details

- Semantic buttons and labels are used for interactive controls.
- Modals use `role="dialog"` and `aria-modal`.
- Buttons include accessible labels where icon-only controls are used.
- Keyboard escape support is available for picker closing.
- Mobile navigation closes after selection and scrolls to the target section.
- Focus ring utility is defined globally for consistent keyboard navigation.

## Getting Started

### Prerequisites

- Node.js 20 or later recommended
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is busy, run:

```bash
npm run dev -- -p 3001
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Starts the production server after build |
| `npm run lint` | Runs ESLint over the project |

## Important Files

| File | Description |
| --- | --- |
| `app/page.tsx` | Composes the full homepage from section components |
| `components/SearchBar.tsx` | Custom picker system for location, date, and travelers |
| `components/DestinationsSection.tsx` | Search matching, cart state, and checkout modal |
| `components/Header.tsx` | Desktop/mobile navigation and auth modal triggers |
| `components/AuthModal.tsx` | Login and sign-up frontend modal |
| `components/DestinationCard.tsx` | Detailed destination card and add-to-cart action |
| `lib/data.ts` | Typed static content and travel data |
| `tailwind.config.ts` | Theme colors, fonts, radii, and shadows |

## Current Scope

This repository is a frontend implementation. The following features are currently simulated in the UI:

- Authentication
- Destination search state
- Cart
- Checkout
- Payment confirmation

No backend, database, authentication provider, payment processor, or external booking API is connected yet.

## Future Improvements

- Connect authentication with Clerk, Auth0, or NextAuth.
- Persist saved trips and cart state in a database.
- Add real payment processing with Stripe.
- Connect destination inventory to a CMS or travel API.
- Add admin tools for destinations, guides, pricing, and availability.
- Add automated Playwright tests to CI.
- Add internationalization for English and Turkish.
- Add real booking confirmation emails.

## License

This project is released under the MIT License.

## Author

Developed by [Mutlu Kurt](https://github.com/mutlukurt).
