# 🚀 VehicleShare - Peer-to-Peer Vehicle Rental & Leasing Platform

A modern, production-ready peer-to-peer vehicle rental and leasing platform where users can rent vehicles from local owners and lease their own vehicles for extra income. Supports all types of vehicles (cars, motorcycles, boats, RVs, and more) built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. Following industry best practices for scalable, maintainable frontend architecture.

## ✨ Key Features

### For Renters

- 🔍 Advanced vehicle search and filtering
- 📅 Easy booking and cancellation
- 💬 Direct messaging with hosts
- ⭐ Reviews and ratings system
- 💳 Secure payment processing
- 📱 Fully responsive mobile experience

### For Hosts

- 📊 Complete vehicle management
- 📈 Revenue analytics and insights
- 📅 Availability management
- 💰 Flexible pricing options
- 📋 Booking request management

### Platform

- 🔐 Secure authentication with Better Auth
- ♿ Full accessibility compliance
- 🚀 Optimized performance with Turbopack
- 🎨 Beautiful UI with shadcn/ui
- 📦 Type-safe with TypeScript

---

## 🛠️ Technology Stack

### Core

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library

### Forms & Validation

- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Authentication

- **Better Auth** - Modern authentication
- **OAuth 2.0** - Social login

### Development

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript Strict Mode**

---

## 📖 Documentation

### Getting Started

- **[Quick Start](#quick-start)** - Installation and setup
- **[Configuration](#configuration)** - Environment and settings

### Architecture & Standards

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, patterns, best practices
- **[CODING_STANDARDS.md](./CODING_STANDARDS.md)** - Code conventions, naming, examples
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Complete folder structure
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design, colors, typography

### Feature Documentation

- **[FRONTEND_IMPROVEMENTS.md](./FRONTEND_IMPROVEMENTS.md)** - UI enhancements
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Change log

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ (20 recommended)
- pnpm 8+

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/vehicleshare.git
cd vehicleshare

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# Start development server
pnpm dev
```

Visit http://localhost:3000

### Build for Production

```bash
pnpm build      # Build optimized bundle
pnpm start      # Start production server
```

---

## 📁 Project Structure

```
src/
├── app/              # Next.js routes & pages
├── components/       # React components
├── hooks/           # Custom hooks
├── services/        # API integration
├── types/           # TypeScript types
├── constants/       # App constants
└── lib/             # Utilities
```

👉 See **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** for complete details.

---

## 🎯 Architecture Highlights

### Type-Safe Development

- Full TypeScript with strict mode
- Domain-driven types in `src/types/`
- Type imports for better tree-shaking

### Component Organization

- Base UI components (`ui/`)
- Shared components (`shared/`)
- Feature-specific components (`features/`)
- Layout components (`layouts/`)

### Server & Client Optimization

- Server components for data fetching
- Client components for interactivity
- Optimized bundle splitting

### State Management

- React hooks for local state
- React Context for global state
- React Hook Form for forms
- Server-side caching

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` based on `.env.example`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
```

See [.env.example](./.env.example) for complete list.

### TypeScript

Configured in `tsconfig.json`:

- Strict type checking
- Path aliases (`@/*`)
- React JSX support

### ESLint & Prettier

- Automatic code formatting
- Strict linting rules
- Git hooks for pre-commit checks

---

## 📊 Commands

### Development

```bash
pnpm dev              # Start dev server (Turbopack)
pnpm lint             # Run linting
pnpm format           # Format code
pnpm type-check       # TypeScript check
```

### Production

```bash
pnpm build            # Build for production
pnpm start            # Start prod server
```

### Database

```bash
pnpm db:push          # Sync schema
pnpm db:studio        # Prisma Studio
pnpm db:seed          # Seed data
```

---

## 📝 Coding Standards

Follow guidelines in **[CODING_STANDARDS.md](./CODING_STANDARDS.md)**:

### TypeScript

- ✅ Explicit types on functions and components
- ✅ Type imports for external types
- ❌ Avoid `any` type

### React Components

- ✅ Functional components
- ✅ Proper prop typing
- ✅ Use hooks correctly
- ❌ No inline event handlers

### Naming

- 🅿️ PascalCase for components
- 🔤 camelCase for functions/variables
- 🔠 UPPER_SNAKE_CASE for constants

### Styling

- ✅ Tailwind CSS utilities
- ✅ Mobile-first responsive
- ❌ Custom CSS unless necessary

---

## 🧪 Testing

```bash
pnpm test             # Run tests
pnpm test:watch      # Watch mode
pnpm test:coverage   # Coverage report
pnpm test:e2e        # E2E tests
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel              # Deploy preview
vercel --prod       # Production deployment
```

### Other Platforms

```bash
pnpm build
pnpm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Follow coding standards
4. Commit changes
5. Push and create Pull Request

### Checklist for PRs

- [ ] Follow CODING_STANDARDS.md
- [ ] Pass linting checks
- [ ] Update documentation
- [ ] Tests pass
- [ ] Responsive design verified

---

## 📋 Quick Reference

| Document             | Purpose                  |
| -------------------- | ------------------------ |
| ARCHITECTURE.md      | System design & patterns |
| CODING_STANDARDS.md  | Code conventions         |
| PROJECT_STRUCTURE.md | Folder organization      |
| DESIGN_SYSTEM.md     | UI specifications        |

---

## 🐛 Bug Reports

Report issues on [GitHub Issues](https://github.com/yourusername/vehicleshare/issues) with:

- Reproduction steps
- Error messages
- Environment details

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 📞 Support

- 📧 Email: support@vehicleshare.com
- 💬 Discord: [Community]
- 🐦 Twitter: [@VehicleShareApp]

---

**Version**: 1.0.0
**Status**: Production Ready ✅
**Last Updated**: December 5, 2025

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
