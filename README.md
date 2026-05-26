# WhatsApp Order Storefront

A mobile-first storefront for Nigerian vendors. Customers browse, add to cart, and send structured orders straight to WhatsApp.

## Stack
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL (Supabase)
- Server Actions

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Your `.env` needs:
```
DATABASE_URL="postgresql://postgres.xxxx:PASSWORD@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:PASSWORD@db.xxxx.supabase.co:5432/postgres"
ADMIN_PASSWORD="your-strong-password"
APP_URL="http://localhost:3000"
```

### 3. Run database migration
```bash
npx prisma migrate dev --name init
```

### 4. Seed demo data
```bash
npx prisma db seed
```

### 5. Start development server
```bash
npm run dev
```

Open http://localhost:3000

---

## Folder Structure
```
app/
  page.tsx              # Landing page (server component)
  store/page.tsx        # Customer storefront (server component)
  admin/page.tsx        # Admin dashboard (protected)
  admin/login/page.tsx  # Admin login
  api/admin/auth/       # Auth cookie API route
  globals.css
  layout.tsx

components/
  layout/
    Navbar.tsx          # Sticky nav with active route highlighting
  ui/
    Button.tsx          # Reusable button with variants + loading state
    Input.tsx           # Reusable input with label + error
    Badge.tsx           # Status badges
    EmptyState.tsx      # Empty list states
  store/
    ProductCard.tsx     # Product grid card
    CartDrawer.tsx      # Slide-in cart + checkout form
    StorefrontClient.tsx # Client wrapper for cart state
  admin/
    AdminClient.tsx     # Full admin dashboard UI
    ProductForm.tsx     # Add/edit product form
    SettingsForm.tsx    # Shop settings form

actions/
  product.ts            # Product CRUD server actions
  settings.ts           # Shop settings server actions

lib/
  db.ts                 # Prisma singleton
  utils.ts              # formatNaira, generateWhatsAppURL, cn

types/
  index.ts              # Shared TypeScript types

prisma/
  schema.prisma
  seed.ts
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo on vercel.com
3. Add environment variables in Vercel dashboard (same as .env)
4. Deploy

After first deploy, run migration against production DB:
```bash
npx prisma migrate deploy
```

---

## Admin Access
Go to `/admin` → enter your `ADMIN_PASSWORD` → you're in.
Password is stored as an httpOnly cookie for 7 days.
