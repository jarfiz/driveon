# Quick Reference Guide

## Development Commands

### Starting Development Server

```bash
pnpm dev
# Starts on http://localhost:3000 (or next available port)
# Hot module replacement enabled
```

### Building for Production

```bash
pnpm build
# Creates optimized production build
# Runs linting and type checking
# Generates static pages
```

### Linting

```bash
# ESLint is configured with strict rules
# Errors must be fixed before build succeeds
# Check ESLint rules: CODING_STANDARDS.md
```

---

## Project Structure Quick Links

### Types & Interfaces

📁 **Location**: `src/types/index.ts`

- All domain types for P2P rental platform
- User, Vehicle, Booking, Review, Payment types
- API response and form data types

### Custom Hooks

📁 **Location**: `src/hooks/index.ts`

- 15+ reusable React hooks
- Vehicle data, bookings, pagination, forms
- Search, filters, local storage, debounce

### Utilities

📁 **Location**: `src/lib/utils.ts`

- 50+ utility functions
- Formatting, validation, calculations
- Search, filters, error handling

### Constants

📁 **Location**: `src/constants/index.ts`

- 100+ constants and enums
- Vehicle types, booking status, insurance options
- Validation rules, routes, feature flags

### Components

📁 **Locations**:

- `src/components/ui/` - Shadcn UI components
- `src/components/shared/` - Reusable components
- `src/components/features/` - Feature-specific (create as needed)
- `src/components/layouts/` - Layout wrappers

### Services (Ready for Implementation)

📁 **Location**: `src/services/`

- API integration layer (create service files here)
- Example: `vehicle-service.ts`, `booking-service.ts`

---

## Documentation Files

| File                    | Purpose                                 |
| ----------------------- | --------------------------------------- |
| `ARCHITECTURE.md`       | System design, patterns, best practices |
| `CODING_STANDARDS.md`   | Development guidelines with examples    |
| `PROJECT_STRUCTURE.md`  | Complete folder structure reference     |
| `README.md`             | Project overview and setup              |
| `.env.example`          | Environment variables template          |
| `COMPLETION_SUMMARY.md` | Restructuring completion details        |

---

## Using Hooks

### Example: Fetch Vehicles with Search

```typescript
"use client";
import { useVehicles } from "@/hooks";
import { useSearch } from "@/hooks";

export function VehicleList() {
  const { query, handleSearch } = useSearch();
  const { vehicles, loading, error } = useVehicles({
    search: query
  });

  return (
    <div>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search vehicles..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {vehicles.map(v => (
        <div key={v.id}>{v.title}</div>
      ))}
    </div>
  );
}
```

### Example: Form Handling

```typescript
"use client";
import { useFormState } from "@/hooks";

export function BookingForm() {
  const { values, errors, setFieldValue } = useFormState({
    startDate: "",
    endDate: "",
    insurance: "basic"
  });

  return (
    <form>
      <input
        value={values.startDate}
        onChange={(e) => setFieldValue("startDate", e.target.value)}
      />
      {errors.startDate && <span>{errors.startDate}</span>}
    </form>
  );
}
```

---

## Using Utilities

### Example: Calculate Booking Price

```typescript
import { calculateBookingPrice } from "@/lib/utils";

const pricing = calculateBookingPrice({
  startDate: new Date("2024-01-15"),
  endDate: new Date("2024-01-20"),
  pricePerDay: 50,
  insurance: { pricePerDay: 10 },
  addOns: [{ price: 25, quantity: 1 }],
});

console.log(pricing.total); // Total with fees and taxes
```

### Example: Format Helpers

```typescript
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils";

formatCurrency(99.99, "USD"); // "$99.99"
formatDate(new Date()); // "Jan 15, 2024"
formatRelativeTime(new Date(Date.now() - 3600000)); // "1h ago"
```

### Example: Validation

```typescript
import { isValidDateRange, isValidEmail } from "@/lib/utils";

isValidEmail("user@example.com"); // true
isValidDateRange(startDate, endDate); // true/false
```

---

## Adding New Features

### Folder Structure for New Feature

```
src/components/features/[feature-name]/
├── page.tsx (or component.tsx)
├── [feature-name].tsx
├── [feature-name]-form.tsx
└── types.ts (if feature-specific types)
```

### Using Types in Components

```typescript
import type { Booking, Vehicle } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  // Component implementation
}
```

### Using Constants

```typescript
import { BOOKING_STATUS, INSURANCE_OPTIONS, VEHICLE_TYPES } from "@/constants";

VEHICLE_TYPES.forEach((type) => {
  console.log(type.value, type.label);
});
```

---

## Import Paths

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of:
import { useVehicles } from "../../../hooks";

// Use:
import { useVehicles } from "@/hooks";
```

**Alias Mapping** (in `tsconfig.json`):

```
@/* → src/*
```

---

## Build Output

### Production Build Directory

```
.next/
├── static/
├── server/
└── standalone/ (if using standalone build)
```

### Key Files

- `.next/build-manifest.json` - Build metadata
- `.next/server/pages-manifest.json` - Route information

---

## Performance Tips

1. **Use `useDebounce` for search input**

   ```typescript
   const debouncedQuery = useDebounce(query, 300);
   ```

2. **Use `useIntersectionObserver` for lazy loading**

   ```typescript
   const isVisible = useIntersectionObserver(elementRef);
   ```

3. **Optimize images with Next.js Image component**

   ```typescript
   import Image from "next/image";
   ```

4. **Server Components by default** (React 19)
   - Use "use client" only when needed
   - Hooks require "use client"

---

## Troubleshooting

### Build Fails with ESLint Errors

1. Check the specific error file
2. Review `CODING_STANDARDS.md` for patterns
3. Check `.eslintrc` rules

### Dev Server Won't Start

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

### TypeScript Errors

1. Check if types are properly imported
2. Verify `src/types/index.ts` has the type
3. Run `pnpm build` to get full type checking

### Hot Reload Not Working

- Check if file is a "use client" component
- Restart dev server
- Clear browser cache

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables for development:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=VehicleShare
```

See `.env.example` for all available options.

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/vehicle-search

# Make changes
git add .
git commit -m "feat: add vehicle search"

# Push
git push origin feature/vehicle-search
```

**Commit types** (from CODING_STANDARDS.md):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring
- `test:` - Tests

---

## Testing

(To be implemented)

```typescript
// Example test structure
import { render, screen } from "@testing-library/react";
import { VehicleCard } from "@/components/features/vehicles/vehicle-card";

describe("VehicleCard", () => {
  it("renders vehicle title", () => {
    render(<VehicleCard vehicle={mockVehicle} />);
    expect(screen.getByText(mockVehicle.title)).toBeInTheDocument();
  });
});
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [ESLint Configuration](https://nextjs.org/docs/app/api-reference/config/eslint)

---

**Quick Links**:

- 📁 [ARCHITECTURE.md](./ARCHITECTURE.md)
- 📋 [CODING_STANDARDS.md](./CODING_STANDARDS.md)
- 🗂️ [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- ✅ [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)
