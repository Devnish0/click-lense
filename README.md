## clickLense : A Next.js + Better Auth + Prisma based URL Shortener & Analytics Platform

Welcome to **clickLense**, a modern, high-performance URL shortener and real-time click analytics platform built with Next.js, React 19, Prisma, PostgreSQL, and Better Auth. Designed for speed, security, and detailed analytics insights.

![HeroSectionImage](public/clicklense.png)

### Features :

- **Instant URL Shortening**: Create short, memorable links with custom aliases.
- **Real-Time Click Analytics**: Deep metrics including browser, OS, device, referrer, and geographic distributions powered by Recharts.
- **Dynamic QR Code Generation**: Instant downloadable QR code generation for every short link.
- **Password Protection**: Secure sensitive short links with custom passwords.
- **Link Expiration & Limits**: Set expiration dates or maximum click limits for temporary links.
- **Better Auth Integration**: Fast & secure authentication supporting Email/Password and Google OAuth.
- **Guest & User Workspaces**: Manage, search, filter, and track short URLs in an intuitive dashboard workspace.
- **Privacy-Friendly Tracking**: Hashed IP tracking and user-agent analytics without collecting sensitive PII.
- **Dark/Light Mode**: Full theme customization with smooth mode toggling.

### Contributors

<a href="https://github.com/Devnish0/urlshortner/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Devnish0/urlshortner" />
</a>

### Tech Stack

**Frontend:**

- **Next.js 16** - React framework with App Router
- **React 19** - UI library with modern features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts** - Interactive data visualization & analytics charts
- **shadcn/ui** - Accessible & pre-built components
- **Lucide React & HugeIcons** - Modern SVG iconography
- **Sonner** - Modern toast notifications
- **react-qr-code** - Dynamic QR code generator
- **next-themes** - Light/Dark theme switching

**Backend & Database:**

- **Prisma ORM** - Type-safe database ORM with PostgreSQL (Neon DB)
- **Better Auth** - Modern, secure authentication system
- **Next.js API Routes** - Server-side API endpoints & middleware
- **ua-parser-js** - User-Agent detection for detailed device & browser analytics

**Development Tools:**

- **Bun** - Package manager and fast runtime
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Contributing & Installation

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Devnish0/urlshortner.git
   cd urlshortner
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env` or `.env.local` file in the root directory:

   ```env
   # Database (PostgreSQL / Neon DB)
   DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"

   # JWT & Authentication Secrets
   JWT_SECRET="your_jwt_secret_key"
   BETTER_AUTH_SECRET="your_better_auth_secret"
   BETTER_AUTH_URL="http://localhost:3000"

   # Google OAuth Credentials
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```

4. **Database Setup**

   ```bash
   bun prisma migrate dev
   bun prisma generate
   ```

5. **Start development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

6. **Access App**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Folder Structure

```
urlshortner/
├── app/                          # Next.js App Router
│   ├── [shortcode]/              # Redirection & click tracking route
│   ├── api/                      # Server-side API endpoints
│   │   ├── auth/                 # Better Auth handler endpoints
│   │   ├── dashboard/            # Workspace dashboard statistics API
│   │   ├── url/                  # URL creation, deletion & verification API
│   │   └── user/                 # User profile & session API
│   ├── components/               # Page-specific components
│   ├── login/                    # Auth login & signup pages
│   ├── unlock/                   # Password-protected URL verification
│   ├── workspace/                # Dashboard workspace pages
│   ├── globals.css               # Global CSS & Tailwind CSS setup
│   ├── layout.tsx                # Root layout & providers
│   └── page.tsx                  # Landing page
├── components/                   # Core React UI components
│   ├── dashboard/                # Analytics & workspace dashboard cards
│   ├── form/                     # Short URL creation & password forms
│   ├── ui/                       # shadcn/ui primitives (dialog, button, dropdown, etc.)
│   ├── analyticscomponent.tsx    # Recharts analytics visualizations
│   ├── linkcomponent.tsx         # URL list & management components
│   ├── search.tsx                # Search & filtering bar
│   └── chooseus.tsx              # Landing page features showcase
├── lib/                          # Application-wide utility functions
│   ├── app/lib/                  # Server & client app utilities
│   │   ├── analytics.ts          # Device, browser & click event parsers
│   │   ├── auth.ts               # Better Auth server configuration
│   │   ├── auth-client.ts        # Better Auth client instance
│   │   ├── dateFormatter.ts      # Relative date & timestamp formatting
│   │   ├── hash.ts               # Privacy IP hashing utility
│   │   ├── prisma.ts             # Prisma Client singleton
│   │   └── qrgenerator.ts        # Dynamic QR code export utilities
│   └── utils.ts                  # ClassName merging utilities (clsx & twMerge)
├── hooks/                        # Custom React hooks
├── middleware.ts                 # Route middleware & session protection
├── prisma/                       # Prisma database ORM configuration
│   └── schema.prisma             # Data models (User, Url, Click, Session, Account)
└── public/                       # Static public assets (icons, images, logos)
```

### Naming Conventions

**Files & Folders:**

- Use `kebab-case` for folder names and non-component files
- Component files use `kebab-case` or `PascalCase` (e.g., `linkcomponent.tsx`, `AnalyticsComponent.tsx`)
- API routes use `kebab-case` folders with `route.ts` or helper files
- Utility files use `camelCase` or `kebab-case` (e.g., `dateFormatter.ts`, `analytics.ts`)

**Components:**

- React components use `PascalCase`
- Component props interfaces end with `Props`
- Custom hooks start with `use` prefix (e.g., `useMobile`)

**Database & API:**

- Database models use `PascalCase` (e.g., `User`, `Url`, `Click`, `Session`)
- API endpoints use `camelCase` functions and RESTful endpoint design
- Database fields use `camelCase` (e.g., `originalUrl`, `shortCode`, `expiresAt`)

**Variables & Functions:**

- Use `camelCase` for variables and functions
- Constants use `UPPER_SNAKE_CASE`
- Boolean variables start with `is`, `has`, `can`, `should`

### Contribution

1. **Fork the repository** and clone your fork
2. **Make your contribution** and create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow the coding standards**:
   - Use TypeScript for all new code
   - Follow the established folder structure
   - Add proper error handling
   - Include loading and error states for UI components
4. **Database Changes**:
   - Create migrations for schema changes: `bun prisma migrate dev --name your_migration_name`
5. **Testing**:
   - Test your changes locally
   - Ensure all existing short code redirections & analytics function correctly
6. **Commit Guidelines**:
   - Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
   - Write clear, descriptive commit messages
7. **Submit a Pull Request**:
   - Provide a clear description of changes
   - Link any related issues
   - Include screenshots for UI changes

**Development Guidelines:**

- Use Server Actions and API routes for data mutations
- Implement proper caching & revalidation strategies
- Follow Zod schema validation for all user input forms
- Ensure responsive design and light/dark theme accessibility
- Optimize for performance and SEO
