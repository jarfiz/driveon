# Project Structure Guide

## Overview

This document describes the folder structure and organization of the VehicleShare project, following best practices for a P2P vehicle rental and leasing platform built with Next.js 15.

---

## 📁 Complete Directory Structure

```
driveon/
│
├── .github/                          # GitHub configuration
│   └── workflows/                    # CI/CD workflows
│       ├── lint.yml
│       ├── test.yml
│       └── deploy.yml
│
├── public/                           # Static assets (images, favicons, etc.)
│   ├── images/
│   │   ├── heroes/
│   │   ├── vehicles/
│   │   └── icons/
│   ├── fonts/
│   └── favicon.ico
│
├── prisma/                           # Database configuration
│   ├── schema.prisma                 # Database schema
│   ├── seed.ts                       # Database seeding
│   └── migrations/                   # Migration history
│       └── [timestamp]_init/
│
├── src/
│   │
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (auth)/                   # Authentication routes group
│   │   │   ├── layout.tsx            # Auth layout with header/footer
│   │   │   ├── sign-in/
│   │   │   │   ├── page.tsx          # Sign-in page
│   │   │   │   └── sign-in-form.tsx  # Sign-in form component
│   │   │   ├── sign-up/
│   │   │   │   ├── page.tsx          # Sign-up page
│   │   │   │   └── sign-up-form.tsx  # Sign-up form component
│   │   │   ├── forgot-password/
│   │   │   │   ├── page.tsx
│   │   │   │   └── forgot-password-form.tsx
│   │   │   └── reset-password/
│   │   │       ├── [token]/
│   │   │       │   ├── page.tsx
│   │   │       │   └── reset-password-form.tsx
│   │   │
│   │   ├── (main)/                   # Main application routes group
│   │   │   ├── layout.tsx            # Main layout (navbar + footer)
│   │   │   ├── page.tsx              # Home/landing page
│   │   │   ├── error.tsx             # Error boundary
│   │   │   ├── not-found.tsx         # 404 page
│   │   │   │
│   │   │   ├── browse/               # Vehicle browsing
│   │   │   │   └── page.tsx          # Browse vehicles page
│   │   │   │
│   │   │   ├── vehicles/             # Vehicle pages
│   │   │   │   ├── page.tsx          # All vehicles (alternative to browse)
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx      # Vehicle detail page
│   │   │   │       ├── layout.tsx    # Vehicle detail layout
│   │   │   │       └── bookings/
│   │   │   │           └── page.tsx  # Vehicle booking history
│   │   │   │
│   │   │   ├── dashboard/            # Renter dashboard
│   │   │   │   ├── page.tsx          # Dashboard overview
│   │   │   │   ├── layout.tsx        # Dashboard layout
│   │   │   │   ├── bookings/
│   │   │   │   │   └── page.tsx      # My bookings
│   │   │   │   ├── favorites/
│   │   │   │   │   └── page.tsx      # Saved vehicles
│   │   │   │   └── statistics/
│   │   │   │       └── page.tsx      # Booking statistics
│   │   │   │
│   │   │   ├── bookings/             # Renter bookings management
│   │   │   │   ├── page.tsx          # All bookings
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx      # Booking details
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx  # Edit booking (if cancellation allowed)
│   │   │   │
│   │   │   ├── messages/             # Messaging system
│   │   │   │   ├── page.tsx          # Conversations list
│   │   │   │   └── [conversationId]/
│   │   │   │       ├── page.tsx      # Conversation view
│   │   │   │       └── layout.tsx
│   │   │   │
│   │   │   ├── profile/              # User profile
│   │   │   │   ├── page.tsx          # Profile view
│   │   │   │   ├── edit/
│   │   │   │   │   └── page.tsx      # Edit profile
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx      # Account settings
│   │   │   │   ├── verification/
│   │   │   │   │   └── page.tsx      # Identity verification
│   │   │   │   └── preferences/
│   │   │   │       └── page.tsx      # Notification preferences
│   │   │   │
│   │   │   ├── reviews/              # User reviews
│   │   │   │   ├── page.tsx          # My reviews
│   │   │   │   ├── [id]/
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx  # Edit review
│   │   │   │   └── write/
│   │   │   │       ├── page.tsx      # Write review form
│   │   │   │       └── [bookingId]/
│   │   │   │
│   │   │   ├── help/                 # Help/support
│   │   │   │   ├── page.tsx          # Help center
│   │   │   │   ├── faq/
│   │   │   │   │   └── page.tsx      # FAQ
│   │   │   │   └── contact/
│   │   │   │       └── page.tsx      # Contact form
│   │   │   │
│   │   │   ├── host/                 # Host/seller dashboard
│   │   │   │   ├── layout.tsx        # Host layout (host navbar)
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx      # Host overview
│   │   │   │   │
│   │   │   │   ├── vehicles/         # Host vehicle management
│   │   │   │   │   ├── page.tsx      # My vehicles list
│   │   │   │   │   ├── new/
│   │   │   │   │   │   ├── page.tsx  # Add new vehicle
│   │   │   │   │   │   └── layout.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx  # Vehicle overview
│   │   │   │   │       ├── edit/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── pricing/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── availability/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── documents/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       └── stats/
│   │   │   │   │           └── page.tsx
│   │   │   │   │
│   │   │   │   ├── bookings/         # Host bookings
│   │   │   │   │   ├── page.tsx      # Bookings list
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx  # Booking details
│   │   │   │   │       ├── accept/
│   │   │   │   │       ├── decline/
│   │   │   │   │       ├── checkin/
│   │   │   │   │       └── checkout/
│   │   │   │   │
│   │   │   │   ├── earnings/         # Financial dashboard
│   │   │   │   │   ├── page.tsx      # Overview
│   │   │   │   │   ├── transactions/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── payouts/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── invoices/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── reviews/          # Host reviews
│   │   │   │   │   ├── page.tsx      # Reviews list
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── respond/
│   │   │   │   │
│   │   │   │   ├── calendar/         # Availability calendar
│   │   │   │   │   └── page.tsx
│   │   │   │   │
│   │   │   │   ├── documents/        # Vehicle documents
│   │   │   │   │   └── page.tsx
│   │   │   │   │
│   │   │   │   ├── messages/         # Host messages
│   │   │   │   │   └── page.tsx
│   │   │   │   │
│   │   │   │   ├── settings/         # Host settings
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── profile/
│   │   │   │   │   ├── payout/
│   │   │   │   │   ├── insurance/
│   │   │   │   │   └── rules/
│   │   │   │   │
│   │   │   │   └── disputes/         # Dispute management
│   │   │   │       ├── page.tsx
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   └── admin/                # Admin panel (future)
│   │   │       ├── layout.tsx        # Admin layout
│   │   │       ├── dashboard/
│   │   │       ├── users/
│   │   │       ├── vehicles/
│   │   │       ├── disputes/
│   │   │       ├── analytics/
│   │   │       ├── reports/
│   │   │       └── settings/
│   │   │
│   │   ├── api/                      # Next.js API routes
│   │   │   ├── auth/
│   │   │   │   ├── [...all]/
│   │   │   │   │   └── route.ts      # Better Auth routes
│   │   │   │   ├── session/
│   │   │   │   │   └── route.ts
│   │   │   │   └── profile/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── vehicles/
│   │   │   │   ├── route.ts          # List/create vehicles
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts      # Get/update/delete vehicle
│   │   │   │   ├── search/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── upload/
│   │   │   │   │   └── route.ts
│   │   │   │   └── availability/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── bookings/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── [id]/accept/
│   │   │   │   ├── [id]/decline/
│   │   │   │   ├── [id]/cancel/
│   │   │   │   ├── [id]/checkin/
│   │   │   │   └── [id]/checkout/
│   │   │   │
│   │   │   ├── payments/
│   │   │   │   ├── route.ts          # Create payment
│   │   │   │   ├── verify/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── messages/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [conversationId]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── send/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── reviews/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── [id]/respond/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── profile/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── verify/
│   │   │   │   │   └── route.ts
│   │   │   │   └── preferences/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   └── health/
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css               # Global styles & animations
│   │   ├── layout.tsx                # Root layout
│   │   └── middleware.ts             # Next.js middleware
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # Base UI components (shadcn/ui)
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── index.ts               # Barrel export
│   │   │
│   │   ├── shared/                   # Shared components
│   │   │   ├── navbar.tsx            # Navigation bar
│   │   │   ├── footer.tsx            # Footer
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-fallback.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── back-button.tsx
│   │   │   ├── hero.tsx              # Hero section
│   │   │   └── index.ts
│   │   │
│   │   ├── layouts/                  # Layout wrappers
│   │   │   ├── authenticated-layout.tsx
│   │   │   ├── host-layout.tsx
│   │   │   ├── renter-layout.tsx
│   │   │   ├── admin-layout.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── features/                 # Feature-specific components
│   │       ├── vehicles/
│   │       │   ├── vehicle-card.tsx
│   │       │   ├── vehicle-grid.tsx
│   │       │   ├── vehicle-filters.tsx
│   │       │   ├── vehicle-search.tsx
│   │       │   ├── vehicle-gallery.tsx
│   │       │   ├── vehicle-form.tsx
│   │       │   ├── vehicle-specs.tsx
│   │       │   ├── vehicle-reviews.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── bookings/
│   │       │   ├── booking-card.tsx
│   │       │   ├── booking-list.tsx
│   │       │   ├── booking-form.tsx
│   │       │   ├── booking-summary.tsx
│   │       │   ├── booking-calculator.tsx
│   │       │   ├── booking-timeline.tsx
│   │       │   ├── booking-status-badge.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── reviews/
│   │       │   ├── review-card.tsx
│   │       │   ├── review-form.tsx
│   │       │   ├── review-list.tsx
│   │       │   ├── rating-display.tsx
│   │       │   ├── rating-input.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── messaging/
│   │       │   ├── conversation-list.tsx
│   │       │   ├── conversation-view.tsx
│   │       │   ├── message-input.tsx
│   │       │   ├── message-bubble.tsx
│   │       │   ├── conversation-header.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── payments/
│   │       │   ├── payment-form.tsx
│   │       │   ├── payment-methods.tsx
│   │       │   ├── transaction-history.tsx
│   │       │   ├── invoice-view.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── dashboard/
│   │       │   ├── stats-card.tsx
│   │       │   ├── stats-grid.tsx
│   │       │   ├── chart-widget.tsx
│   │       │   ├── activity-feed.tsx
│   │       │   ├── quick-actions.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── auth/
│   │       │   ├── login-form.tsx
│   │       │   ├── signup-form.tsx
│   │       │   ├── password-recovery.tsx
│   │       │   ├── otp-input.tsx
│   │       │   └── index.ts
│   │       │
│   │       └── common/
│   │           ├── image-upload.tsx
│   │           ├── file-upload.tsx
│   │           ├── date-range-picker.tsx
│   │           ├── location-picker.tsx
│   │           └── index.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── index.ts
│   │   ├── use-auth.ts
│   │   ├── use-vehicles.ts
│   │   ├── use-bookings.ts
│   │   ├── use-reviews.ts
│   │   ├── use-messages.ts
│   │   ├── use-payments.ts
│   │   ├── use-search.ts
│   │   ├── use-filters.ts
│   │   ├── use-pagination.ts
│   │   ├── use-form-state.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-intersection.ts
│   │   ├── use-debounce.ts
│   │   ├── use-throttle.ts
│   │   └── use-previous.ts
│   │
│   ├── services/                     # API & business logic
│   │   ├── api-client.ts             # Axios/fetch wrapper
│   │   ├── auth-service.ts           # Authentication
│   │   ├── vehicle-service.ts        # Vehicles
│   │   ├── booking-service.ts        # Bookings
│   │   ├── payment-service.ts        # Payments
│   │   ├── messaging-service.ts      # Messages
│   │   ├── review-service.ts         # Reviews
│   │   ├── user-service.ts           # User management
│   │   ├── analytics-service.ts      # Analytics
│   │   └── notification-service.ts   # Notifications
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── index.ts                  # All domain types
│   │
│   ├── constants/                    # Application constants
│   │   └── index.ts                  # Enums, feature flags, defaults
│   │
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts                  # Formatting, validation, etc.
│   │   ├── auth.ts                   # Auth helpers
│   │   ├── cn.ts                     # Class name utility
│   │   └── env.ts                    # Environment validation
│   │
│   ├── contexts/                     # React Context
│   │   ├── auth-context.tsx
│   │   ├── app-provider.tsx          # Providers wrapper
│   │   └── index.ts
│   │
│   ├── config/                       # Configuration
│   │   ├── site.config.ts            # Site metadata
│   │   ├── feature-flags.ts          # Feature flags
│   │   └── theme.config.ts           # Theme configuration
│   │
│   └── middleware.ts                 # Next.js middleware
│
├── docs/                             # Documentation
│   ├── README.md                     # Getting started
│   ├── API.md                        # API documentation
│   ├── DATABASE.md                   # Database schema docs
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── CONTRIBUTING.md               # Contributing guide
│
├── .github/
│   └── workflows/
│       ├── lint.yml
│       ├── test.yml
│       └── deploy.yml
│
├── .husky/                           # Git hooks
│   ├── pre-commit
│   └── pre-push
│
├── .env.example                      # Environment variables template
├── .eslintignore
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs                 # ESLint configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies
├── pnpm-lock.yaml                    # Lock file
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── ARCHITECTURE.md                   # Architecture guide
├── CODING_STANDARDS.md               # Coding standards
├── DESIGN_SYSTEM.md                  # Design system
├── README.md                         # Project README
└── LICENSE                           # License file
```

---

## 📊 Folder Purposes

### `src/app/`

- **Purpose**: Next.js 15 App Router - contains all pages and routes
- **Structure**: Route groups `(auth)` and `(main)` separate authentication and main app
- **Pattern**: File-based routing with dynamic segments `[id]`

### `src/components/`

- **Purpose**: Reusable React components organized by type and feature
- **ui/**: Unstyled base components from shadcn/ui
- **shared/**: Components used across multiple features
- **features/**: Feature-specific components (vehicles, bookings, etc.)
- **layouts/**: Layout wrapper components

### `src/hooks/`

- **Purpose**: Custom React hooks for reusable logic
- **Pattern**: `use-` prefix for all hooks
- **Examples**: useAuth, useVehicles, useBookings, useFilters

### `src/services/`

- **Purpose**: API integration and business logic
- **Pattern**: Service classes with methods for API calls
- **Examples**: VehicleService.search(), BookingService.create()

### `src/types/`

- **Purpose**: Centralized TypeScript type definitions
- **Pattern**: Single `index.ts` with all domain types
- **Benefits**: Single source of truth, easy maintenance

### `src/constants/`

- **Purpose**: Application constants, enums, feature flags
- **Pattern**: Organized by feature/module
- **Examples**: VEHICLE_TYPES, BOOKING_STATUS, ERROR_CODES

### `src/lib/`

- **Purpose**: Utility functions and helpers
- **Pattern**: Organized by functionality
- **Examples**: formatCurrency(), validateEmail(), calculateDistance()

### `prisma/`

- **Purpose**: Database configuration and migrations
- **Files**:
  - `schema.prisma`: Database schema definition
  - `migrations/`: Migration history
  - `seed.ts`: Seed data for development

### `public/`

- **Purpose**: Static files served as-is
- **Structure**: Organized by asset type
- **Examples**: Images, fonts, manifests

---

## 🔗 File Naming Conventions

| Type       | Pattern               | Example                     |
| ---------- | --------------------- | --------------------------- |
| Components | PascalCase            | `VehicleCard.tsx`           |
| Hooks      | use- + camelCase      | `use-vehicles.ts`           |
| Services   | -service suffix       | `vehicle-service.ts`        |
| Utilities  | descriptive camelCase | `format-currency.ts`        |
| Types      | index.ts              | `types/index.ts`            |
| Pages      | index pattern         | `app/vehicles/page.tsx`     |
| Layouts    | layout.tsx            | `app/(main)/layout.tsx`     |
| API Routes | route.ts              | `app/api/vehicles/route.ts` |

---

## 🔄 Import Paths

Use path aliases for cleaner imports:

```tsx
// ✅ Good
import { VehicleCard } from "@/components/features/vehicles";
import { useVehicles } from "@/hooks";
import { formatCurrency } from "@/lib/utils";
import type { Vehicle } from "@/types";

// ❌ Avoid
import VehicleCard from "../../../components/features/vehicles/vehicle-card";
import useVehicles from "../../hooks/use-vehicles";
```

Path alias configuration in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 📋 New Feature Checklist

When adding a new feature:

1. **Create folder** under `src/components/features/your-feature/`
2. **Define types** in `src/types/index.ts`
3. **Create service** in `src/services/your-service.ts`
4. **Create hook** in `src/hooks/use-your-feature.ts`
5. **Add constants** to `src/constants/index.ts`
6. **Create pages** in `src/app/(main)/your-feature/`
7. **Create API routes** in `src/app/api/your-feature/`
8. **Update routing** in navigation/menus
9. **Add tests** in `__tests__/` folder
10. **Document** in relevant markdown files

---

## 🎯 Best Practices

### Organization

- Keep files in logical groups
- One main component per file
- Related files close together
- Use index.ts for barrel exports

### Naming

- Descriptive, not abbreviated
- Consistent patterns across codebase
- Match file name to component/function name
- Use prefixes for clarity (use-, -service, etc.)

### Imports

- Use path aliases (@/)
- Group imports: React → External → Internal
- Type imports use 'type' keyword
- Barrel exports for clean imports

### Files

- Small, focused components
- Single responsibility principle
- Reusable over one-off code
- Maximum 300 lines per file

---

## 📚 Related Documentation

- **ARCHITECTURE.md** - Design patterns and architecture
- **CODING_STANDARDS.md** - Code conventions and best practices
- **DESIGN_SYSTEM.md** - UI/design specifications

---

**Version**: 1.0
**Last Updated**: December 5, 2025
