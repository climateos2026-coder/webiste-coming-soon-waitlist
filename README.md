# ClimateOS 2026 — Global Climate Tech Hackathon

**48 hours. 500 builders. One planet.**

climateoshack.dev — Building deployable open-source tools for climate challenges.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in values

3. Run development server:
```bash
npm run dev
```

## Testing

```bash
npm run lint
npm run type-check
npm run test
```

## Build for Production

```bash
npm run build
npm run start
```

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Supabase (database, auth, realtime)
- Brevo (email)
- Devfolio (registrations)

## Project Structure

```
app/              # Next.js App Router pages
components/       # Reusable UI components
lib/              # Utilities and API clients
content/          # MDX content files
types.d.ts        # Ambient TypeScript declarations
```