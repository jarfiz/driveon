# Architecture & Best Practices Guide

## 📐 Project Architecture Overview

This document outlines the architecture and best practices for the VehicleShare P2P Vehicle Rental & Leasing Platform frontend. Supports cars, motorcycles, boats, RVs, and all types of vehicles.

### Technology Stack

- **Framework**: Next.js 15.5.4 with Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Handling**: React Hook Form 7.63.0
- **Validation**: Zod 4.1.11
- **State Management**: React hooks + server components
- **Authentication**: Better Auth 1.3.23
- **Icons**: Lucide React 0.544.0
- **Notifications**: Sonner 2.0.7
- **Database ORM**: Prisma 6.16.2
- **Linting**: ESLint 9 with Next.js config
- **Formatting**: Prettier 3.6.2 with Tailwind plugin

---

## 📁 Folder Structure (Best Practices)

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── layout.tsx            # Auth layout wrapper
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   │
│   ├── (main)/                   # Main app routes group
│   │   ├── layout.tsx            # Main layout with navbar, footer
│   │   ├── page.tsx              # Home/landing page
│   │   ├── dashboard/            # Renter dashboard
│   │   ├── browse/               # Vehicle browsing
│   │   ├── vehicles/
│   │   │   ├── page.tsx          # All vehicles
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx      # Vehicle details
│   │   │   │   └── bookings/
│   │   ├── bookings/             # Renter bookings
│   │   ├── favorites/            # Saved vehicles
│   │   ├── messages/             # Messaging system
│   │   ├── profile/              # User profile
│   │   ├── reviews/              # My reviews
│   │   │
│   │   ├── host/                 # Host dashboard area
│   │   │   ├── dashboard/        # Host overview
│   │   │   ├── vehicles/
│   │   │   │   ├── page.tsx      # My vehicles
│   │   │   │   ├── new/          # Add vehicle
│   │   │   │   └── [id]/         # Edit vehicle
│   │   │   ├── bookings/         # Incoming bookings
│   │   │   ├── earnings/         # Revenue dashboard
│   │   │   └── reviews/          # Host reviews
│   │   │
│   │   └── admin/                # Admin panel (if applicable)
│   │       ├── dashboard/
│   │       ├── users/
│   │       ├── disputes/
│   │       └── analytics/
│   │
│   ├── api/                      # API routes (server actions)
│   │   ├── auth/
│   │   ├── vehicles/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── messages/
│   │   └── reviews/
│   │
│   ├── globals.css               # Global styles, animations
│   ├── layout.tsx                # Root layout
│   └── error.tsx                 # Error boundary
│
├── components/                   # React components
│   ├── ui/                       # Base UI components (from shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── avatar.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── modal.tsx
│   │   └── ...
│   │
│   ├── shared/                   # Shared components across features
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── pagination.tsx
│   │   ├── loading-spinner.tsx
│   │   ├── empty-state.tsx
│   │   ├── error-fallback.tsx
│   │   └── not-found.tsx
│   │
│   ├── layouts/                  # Layout components
│   │   ├── authenticated-layout.tsx
│   │   ├── host-layout.tsx
│   │   ├── renter-layout.tsx
│   │   └── admin-layout.tsx
│   │
│   └── features/                 # Feature-specific components
│       ├── vehicles/
│       │   ├── vehicle-card.tsx
│       │   ├── vehicle-grid.tsx
│       │   ├── vehicle-filters.tsx
│       │   ├── vehicle-search.tsx
│       │   ├── vehicle-gallery.tsx
│       │   └── vehicle-form.tsx
│       │
│       ├── bookings/
│       │   ├── booking-card.tsx
│       │   ├── booking-list.tsx
│       │   ├── booking-form.tsx
│       │   ├── booking-summary.tsx
│       │   ├── booking-calculator.tsx
│       │   └── booking-timeline.tsx
│       │
│       ├── reviews/
│       │   ├── review-card.tsx
│       │   ├── review-form.tsx
│       │   ├── rating-display.tsx
│       │   └── reviews-list.tsx
│       │
│       ├── messaging/
│       │   ├── conversation-list.tsx
│       │   ├── conversation-view.tsx
│       │   ├── message-input.tsx
│       │   └── message-bubble.tsx
│       │
│       ├── payments/
│       │   ├── payment-form.tsx
│       │   ├── payment-methods.tsx
│       │   ├── transaction-history.tsx
│       │   └── invoice.tsx
│       │
│       ├── auth/
│       │   ├── login-form.tsx
│       │   ├── signup-form.tsx
│       │   ├── password-recovery.tsx
│       │   └── verification-form.tsx
│       │
│       └── dashboard/
│           ├── stats-card.tsx
│           ├── stats-grid.tsx
│           ├── chart-widget.tsx
│           └── activity-feed.tsx
│
├── hooks/                        # Custom React hooks
│   ├── index.ts                  # Exports all hooks
│   ├── use-auth.ts               # Authentication
│   ├── use-vehicles.ts           # Vehicle data
│   ├── use-bookings.ts           # Booking data
│   ├── use-search.ts             # Search functionality
│   ├── use-filters.ts            # Filter state
│   ├── use-pagination.ts         # Pagination
│   ├── use-form-state.ts         # Form handling
│   ├── use-local-storage.ts      # Local storage
│   └── use-intersection.ts       # Intersection observer
│
├── services/                     # API & business logic
│   ├── api-client.ts             # Axios/fetch wrapper
│   ├── vehicle-service.ts        # Vehicle API calls
│   ├── booking-service.ts        # Booking API calls
│   ├── payment-service.ts        # Payment API calls
│   ├── auth-service.ts           # Authentication
│   ├── messaging-service.ts      # Messages API
│   ├── review-service.ts         # Reviews API
│   └── analytics-service.ts      # Analytics tracking
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # All domain types
│
├── constants/                    # Application constants
│   └── index.ts                  # Feature flags, enums, defaults
│
├── lib/                          # Utility functions
│   ├── utils.ts                  # Formatting, validation, calculations
│   ├── auth.ts                   # Auth helpers
│   └── cn.ts                     # Class name utility (from shadcn)
│
├── contexts/                     # React context (if needed)
│   ├── auth-context.tsx          # Auth context
│   └── app-provider.tsx          # App providers wrapper
│
├── config/                       # Configuration files
│   ├── env.ts                    # Environment validation
│   ├── site.config.ts            # Site metadata
│   └── feature-flags.ts          # Feature flags
│
└── middleware.ts                 # Next.js middleware
```

---

## 🎯 Design Patterns & Best Practices

### 1. Component Architecture

#### Folder Organization

```
components/features/vehicles/
├── vehicle-card.tsx          # Presentational component
├── vehicle-filters.tsx       # Container with logic
├── vehicle-search.tsx        # Search functionality
├── vehicle-gallery.tsx       # Image gallery
├── index.ts                  # Barrel export
└── types.ts                  # Component-specific types (if needed)
```

#### Component Template

```tsx
"use client";

// Client-side component marker
import { type FC } from "react";
import { type ComponentProps } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export const VehicleCard: FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  isSelected = false,
}) => {
  return <div>{/* Component JSX */}</div>;
};

export default VehicleCard;
```

### 2. Server vs Client Components

**Server Components (Default)**:

- Page layouts
- Data fetching
- Sensitive operations
- List components (async)

**Client Components** (`"use client"`):

- Interactive UI
- Hooks (useState, useEffect, etc.)
- Event handlers
- Real-time features

```tsx
// app/(main)/vehicles/page.tsx - Server Component
import { VehicleList } from "@/components/features/vehicles";

export default async function VehiclesPage() {
  const vehicles = await fetchVehicles();
  return <VehicleList vehicles={vehicles} />;
}
```

### 3. Form Handling

Use React Hook Form + Zod for validation:

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleFormSchema } from "@/lib/schemas";

export function VehicleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: zodResolver(vehicleFormSchema),
  });

  const onSubmit = async (data) => {
    // Handle submission
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* Form fields */}</form>;
}
```

### 4. Data Fetching Patterns

**Server-side (Recommended)**:

```tsx
// app/(main)/vehicles/page.tsx
async function VehiclesPage() {
  const vehicles = await fetch("/api/vehicles").then((r) => r.json());
  return <VehicleList vehicles={vehicles} />;
}
```

**Client-side (When needed)**:

```tsx
"use client";

import { useVehicles } from "@/hooks";

export function VehicleList() {
  const { vehicles, loading } = useVehicles();
  return <div>{/* Render vehicles */}</div>;
}
```

### 5. Error Handling

**Global Error Boundary**:

```tsx
// app/error.tsx
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

**Component Error Handling**:

```tsx
try {
  const response = await fetch('/api/vehicles');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
} catch (error) {
  throw new Error(`Failed to fetch vehicles: ${error.message}`);
}
```

### 6. Styling Conventions

**Use Tailwind CSS**:

```tsx
// ✅ Good: Utility-first approach
<div className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
  <span className="text-sm font-medium text-slate-900">Title</span>
</div>

// ❌ Avoid: Custom CSS unless necessary
<div className="custom-div">
  <span>Title</span>
</div>
```

**Responsive Design**:

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

### 7. TypeScript Conventions

**Always use types**:

```tsx
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

function UserCard({ user }: { user: UserProfile }) {
  return <div>{user.name}</div>;
}

// ❌ Avoid
function UserCard({ user }) {
  return <div>{user.name}</div>;
}
```

---

## 🔄 Data Flow Architecture

### Request Flow

```
Client → React Component
   ↓
   React Hook (useEffect/handler)
   ↓
   API Service (fetch/axios)
   ↓
   Next.js API Route
   ↓
   Database (Prisma)
   ↓
   Response ← Error handling
```

### State Management Strategy

1. **Local State**: Component-level (useState)
2. **Form State**: React Hook Form
3. **Global State**: React Context (if needed)
4. **Server State**: Next.js caching + revalidation

---

## 📦 Component Reusability

### Base Components (UI Layer)

- Located in `components/ui/`
- Unstyled/minimally styled
- Fully accessible
- Accept all HTML props

### Feature Components

- Located in `components/features/`
- Business logic included
- Styled with Tailwind
- Composition-based

### Shared Components

- Located in `components/shared/`
- Used across multiple features
- Navbar, footer, breadcrumbs, etc.

---

## 🧪 Testing Strategy

### Unit Tests

```tsx
// components/features/vehicles/__tests__/vehicle-card.test.tsx
import { render, screen } from "@testing-library/react";
import { VehicleCard } from "../vehicle-card";

describe("VehicleCard", () => {
  it("renders vehicle information", () => {
    // Test implementation
  });
});
```

### Integration Tests

- Test full booking flow
- Test search and filter
- Test user interactions

### E2E Tests

- Cypress/Playwright for critical paths
- User journey testing

---

## 🚀 Performance Best Practices

### Code Splitting

```tsx
// Use dynamic imports for heavy components
import dynamic from "next/dynamic";

const ComplexChart = dynamic(() => import("./complex-chart"), {
  loading: () => <div>Loading...</div>,
});
```

### Image Optimization

```tsx
import Image from "next/image";

<Image
  src="/vehicle.jpg"
  alt="Vehicle"
  width={400}
  height={300}
  priority={false}
/>;
```

### Memoization

```tsx
import { memo } from "react";

const VehicleCard = memo(function VehicleCard({ vehicle }) {
  return <div>{vehicle.title}</div>;
});
```

---

## 📝 Naming Conventions

### Files & Folders

```
components/
  features/
    vehicle-details/        # kebab-case
      vehicle-details.tsx   # matching file name
      index.ts
      types.ts
```

### React Components

```tsx
// ✅ Good: PascalCase for components
export function VehicleCard() {}
export const VehicleCard = () => {};

// ❌ Avoid: camelCase for components
export const vehicleCard = () => {};
```

### Variables & Functions

```tsx
// ✅ Good: camelCase for functions/variables
const calculateBookingPrice = () => {};
const isValidEmail = true;

// Descriptive names
const vehicleAvailabilityMap = new Map();
```

---

## 🔐 Security Best Practices

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SOCKET_URL=wss://socket.example.com
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
```

### Input Validation

```tsx
import { z } from "zod";

const emailSchema = z.string().email();
const validated = emailSchema.parse(userInput);
```

### XSS Prevention

- Always use built-in escaping in React/Next.js
- Sanitize user inputs server-side
- Use Content Security Policy headers

---

## 📊 Monitoring & Analytics

### Error Tracking

- Use Sentry or similar for error reporting
- Log errors with context

### Performance Monitoring

- Web Vitals
- User interactions
- API performance

### Usage Analytics

- Track user flows
- Monitor feature adoption
- Conversion funnel tracking

---

## 🔄 CI/CD & Deployment

### Pre-commit Hooks (Husky)

```bash
npm run prepare  # Install husky
```

### Lint-staged

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.css": ["prettier --write"]
}
```

### Build Optimization

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Analyze bundle size
ANALYZE=true npm run build
```

---

## 🎓 Resources & References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Best Practices](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

## 📋 Checklist for New Features

- [ ] Create folder under `components/features/`
- [ ] Define types in `src/types/`
- [ ] Create API service in `src/services/`
- [ ] Create custom hook if needed in `src/hooks/`
- [ ] Add constants to `src/constants/`
- [ ] Write component with proper TypeScript typing
- [ ] Add error boundaries
- [ ] Test responsiveness
- [ ] Add loading states
- [ ] Document component props
- [ ] Update navigation/routes
- [ ] Add tests

---

**Version**: 1.0
**Last Updated**: December 5, 2025
