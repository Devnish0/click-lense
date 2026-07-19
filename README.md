# 🔗 URL Shortener

A modern, full-featured **URL Shortener & Analytics Platform** built with **Next.js 16**, **React 19**, **Prisma ORM**, **Neon PostgreSQL**, and **Better Auth**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Key Features

- ⚡ **Instant URL Shortening**: Create clean, memorable short links with custom aliases or auto-generated codes.
- 🔒 **Password Protection**: Secure sensitive short links with password unlock challenges.
- ⏳ **Link Expiration & Limits**: Set link expiration dates and cap the maximum allowable clicks.
- 📊 **Rich Analytics Dashboard**: Track total clicks, device types, browser distribution, operating systems, referrers, and daily click trends visualized with **Recharts**.
- 📱 **QR Code Generation**: Automatically generate downloadable QR codes for any short link.
- 🔑 **Flexible Authentication**: Full authentication support powered by **Better Auth** (Google OAuth, Email/Password, and Guest mode).
- 🌙 **Dark & Light Mode**: Built-in theme switching with seamless system preferences detection.
- 🎨 **Modern UI/UX**: Premium aesthetic featuring glassmorphism, responsive layouts, smooth transitions, and toast notifications.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://neon.tech/) (Serverless with Neon)
- **ORM**: [Prisma ORM 7](https://www.prisma.io/) (`@prisma/adapter-pg`)
- **Authentication**: [Better Auth](https://www.better-auth.com/) (Google OAuth + Email/Password)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), Lucide & Hugeicons
- **Analytics & Charts**: [Recharts](https://recharts.org/), `ua-parser-js`
- **Notifications**: [Sonner](https://sonner.emilkowal.si/)
- **QR Codes**: `react-qr-code`

---

## 📁 Project Structure

```text
.
├── app/
│   ├── [shortcode]/        # Dynamic route for short URL redirection & tracking
│   ├── api/                # API routes (Auth, URL management, Analytics)
│   ├── components/         # Workspace and dashboard component views
│   ├── unlock/             # Password unlock page for protected links
│   ├── workspace/          # Main dashboard & analytics workspace
│   ├── globals.css         # Tailwind v4 styles & custom CSS properties
│   ├── layout.tsx          # Root layout with theme & auth providers
│   └── page.tsx            # Landing & main URL generator page
├── components/             # Reusable UI components (Shadcn/Radix primitives)
├── lib/                    # Core utilities, Prisma client instance, & auth setup
├── prisma/
│   ├── schema.prisma       # Database schema definition
│   └── migrations/         # Database migration history
├── public/                 # Static assets (favicons, icons)
├── package.json            # Project dependencies and npm scripts
└── tsconfig.json           # TypeScript configuration
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"

# Secrets
JWT_SECRET="your-jwt-secret-key"
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Bun](https://bun.sh/) or `npm` / `pnpm` / `yarn`
- A PostgreSQL Database (e.g., [Neon Serverless Postgres](https://neon.tech/))

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Devnish0/click-lense.git
   cd click-lense
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up Environment Variables**
   Copy `.env` and fill in your database credentials and secret keys.

4. **Generate Prisma Client & Push Database Schema**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script    | Command              | Description                      |
| :-------- | :------------------- | :------------------------------- |
| `dev`     | `next dev`           | Start development server         |
| `devlite` | `next dev --webpack` | Start dev server using Webpack   |
| `build`   | `next build`         | Build application for production |
| `start`   | `next start`         | Run production build server      |
| `lint`    | `eslint`             | Run ESLint checks                |

---

## 🔒 Database Schema Overview

- **`User`**: User accounts (supporting OAuth, password auth, & guest sessions).
- **`Url`**: Shortened links, storing original URLs, short codes, click counts, expiration dates, max clicks, and optional password hash.
- **`Click`**: Analytics tracking table recording browser, OS, device, country, referrer, IP hash, and timestamp for every redirect.
- **`Session` / `Account` / `Verification`**: Auth management models for Better Auth.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve features, fix bugs, or enhance UI/UX.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
