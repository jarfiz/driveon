# Coding Standards & Guidelines

## 📋 Code Quality & Best Practices

This document defines coding standards and conventions for the VehicleShare project.

---

## TypeScript Conventions

### Type Definitions

✅ **Do**:

```tsx
// Use type imports
import type { User, UserRole } from "@/types";

// Use explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

type UserRole = "admin" | "host" | "renter";

function createUser(user: User): void {
  // Implementation
}
```

❌ **Don't**:

```tsx
// Avoid any type
function createUser(user: any): void {}

// Avoid unnecessary types
const name: string = "John"; // Type is obvious

// Don't mix type and regular imports
import { User, Button } from "@/types";
import type { User } from "@/types";
```

### Generics

✅ **Do**:

```tsx
// Clear generic names
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

interface Response<T> {
  data: T;
  status: number;
}
```

❌ **Don't**:

```tsx
// Unclear generics
function getFirst<T>(items: T[]): T | null {}

// Unused generics
function process<T, U>(data: T): string {}
```

---

## React Component Patterns

### Functional Components

✅ **Do**:

```tsx
"use client";

import { FC, ReactNode } from "react";
import type { Vehicle } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (id: string) => void;
  children?: ReactNode;
}

export const VehicleCard: FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  children,
}) => {
  const handleClick = () => {
    onSelect?.(vehicle.id);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <h2>{vehicle.title}</h2>
      {children}
    </div>
  );
};

export default VehicleCard;
```

❌ **Don't**:

```tsx
// Missing types
export function VehicleCard({ vehicle, onSelect }) {
  // ...
}

// Arrow function without proper typing
export const VehicleCard = ({ vehicle }) => {
  // ...
};

// Default export without named export
export default function VehicleCard() {
  // ...
}
```

### Hooks Usage

✅ **Do**:

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";

export function VehicleSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch when query changes
    if (query.length > 0) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = useCallback(async (q: string) => {
    const data = await fetch(`/api/search?q=${q}`);
    setResults(await data.json());
  }, []);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

❌ **Don't**:

```tsx
// Missing dependency array
useEffect(() => {
  fetchData();
});

// Putting functions directly in dependency array
useEffect(() => {
  const callback = () => {};
}, [callback]); // callback changes every render!

// Updating state based on props without dependency
useEffect(() => {
  setData(props.data);
});
```

### Server vs Client Components

✅ **Do**:

```tsx
// Fetch on server
// app/vehicles/page.tsx (Server Component)
import { VehicleList } from "@/components/features/vehicles";

async function VehiclesPage() {
  const vehicles = await fetchVehicles();
  return <VehicleList vehicles={vehicles} />;
}

// Client-side interactivity
// components/features/vehicles/vehicle-list.tsx
"use client";

import { useState } from "react";
import type { Vehicle } from "@/types";

interface VehicleListProps {
  vehicles: Vehicle[];
}

export function VehicleList({ vehicles }: VehicleListProps) {
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);

  return (
    <div>
      {filteredVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
```

❌ **Don't**:

```tsx
// Don't fetch on client when server is available
"use client";

export function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("/api/vehicles")
      .then((r) => r.json())
      .then(setVehicles);
  }, []);

  return <div>{/* Render */}</div>;
}
```

---

## Naming Conventions

### Files & Directories

✅ **Do**:

```
src/
  components/
    features/
      vehicle-search/          # kebab-case for folders
        vehicle-search.tsx     # matching filename
        types.ts
        index.ts

  hooks/
    use-vehicles.ts            # use- prefix for hooks

  services/
    vehicle-service.ts         # -service suffix for services

  constants/
    index.ts
```

❌ **Don't**:

```
vehicleSearch/               # camelCase for folders
VehicleSearch.tsx           # PascalCase for folders
useVehiclesHook.ts          # redundant 'Hook' in name
VehicleService.ts           # PascalCase for services
```

### Variables & Constants

✅ **Do**:

```tsx
// Descriptive names
const MAX_BOOKING_DAYS = 365;
const isUserVerified = true;
const vehiclesByCity = new Map();
const handleBookingSubmit = () => {};

// Constants in UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
const DEFAULT_PAGE_SIZE = 12;

// Booleans with is/has prefix
const isLoading = true;
const hasError = false;
const canEdit = true;
```

❌ **Don't**:

```tsx
// Too short/vague
const md = 365;
const f = true;
const get = new Map();

// Inconsistent naming
const MAX_booking_days = 365;
const isLoading_state = true;

// Avoid 'data' as variable name
const data = user; // What data?
const vehicleData = vehicle; // Better
```

---

## Error Handling

✅ **Do**:

```tsx
// Create specific error types
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Handle errors explicitly
async function fetchVehicles() {
  try {
    const response = await fetch("/api/vehicles");
    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP ${response.status}: ${response.statusText}`,
      );
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    throw error;
  }
}

// Use error boundaries
export function VehiclesList() {
  try {
    return <VehicleListContent />;
  } catch (error) {
    return <ErrorFallback error={error} />;
  }
}
```

❌ **Don't**:

```tsx
// Silent failures
async function fetchVehicles() {
  return fetch("/api/vehicles").then((r) => r.json());
}

// Generic error handling
try {
  // code
} catch (error) {
  console.log("error"); // Too vague
}

// Ignoring errors
const data = (await fetchVehicles()) || [];
```

---

## Formatting & Style

### Code Formatting (Prettier)

✅ **Do**:

```tsx
// Proper formatting
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

const user: User = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date(),
};
```

❌ **Don't**:

```tsx
// Inconsistent formatting
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date(),
};
```

### Tailwind CSS

✅ **Do**:

```tsx
// Utility-first, readable order
<div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
  <span className="text-sm font-medium text-slate-900">Title</span>
  <button className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-white">
    Click me
  </button>
</div>;

// Use semantic naming
const cardClasses = "rounded-lg border border-slate-200 bg-white shadow-sm";

// Extract complex styles
const buttonClasses =
  "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors";
```

❌ **Don't**:

```tsx
// Inconsistent class order
<div className="p-4 bg-slate-50 flex rounded-lg items-center justify-between border gap-4 border-slate-200">

// Long unbreakable class strings
<div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100 transition-colors duration-200 shadow-md shadow-slate-300/30">

// Mixing with CSS
<style>{`.custom { color: red; }`}</style>
<div className={`${customClasses} text-red-500`}>
```

---

## Comments & Documentation

✅ **Do**:

```tsx
/**
 * Calculate the total booking price including all fees and taxes
 * @param booking - The booking object with pricing details
 * @returns Calculated total price
 */
export function calculateTotalPrice(booking: Booking): number {
  const subtotal = booking.basePrice + booking.insurancePrice;
  const fee = subtotal * PLATFORM_FEE_PERCENTAGE;
  const tax = (subtotal + fee) * TAX_PERCENTAGE;
  return subtotal + fee + tax;
}

// Single-line comment for implementation details
if (bookingDate.getTime() < Date.now()) {
  // Validate that booking date is in the future
  throw new Error("Booking date must be in the future");
}
```

❌ **Don't**:

```tsx
// Obvious comments
const name = "John"; // Set name to John

// Commented-out code
// const data = await fetch('/api/data');
// console.log(data);

// Unclear comments
function process(x) {
  // Do the thing
  return x * 2;
}
```

---

## Testing Guidelines

### Unit Tests

✅ **Do**:

```tsx
describe("calculateTotalPrice", () => {
  it("should calculate total price with all fees", () => {
    const booking = {
      basePrice: 100,
      insurancePrice: 20,
      // ... other fields
    };

    const total = calculateTotalPrice(booking);

    expect(total).toBe(143); // 100 + 20 + fee + tax
  });

  it("should handle edge case with zero price", () => {
    const booking = { basePrice: 0, insurancePrice: 0 };
    const total = calculateTotalPrice(booking);
    expect(total).toBe(0);
  });
});
```

❌ **Don't**:

```tsx
// Vague test names
test("test", () => {
  const result = calculate(100);
  expect(result).toBe(true);
});

// Multiple assertions per test
test("everything", () => {
  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toBe(3);
});
```

---

## Performance Optimization

✅ **Do**:

```tsx
// Memoize expensive components
const VehicleCard = memo(function VehicleCard({ vehicle }: Props) {
  return <div>{vehicle.title}</div>;
});

// Use useCallback for stable function references
const handleSort = useCallback((sortBy: string) => {
  setSortOrder(sortBy);
}, []);

// Lazy load heavy components
const VehicleChart = dynamic(() => import("./vehicle-chart"), {
  loading: () => <Skeleton />,
});

// Optimize re-renders with proper dependency arrays
useEffect(() => {
  search(query);
}, [query]); // Only when query changes
```

❌ **Don't**:

```tsx
// Inline functions in render (creates new function every render)
<button onClick={() => handleClick(item.id)}>

// Missing dependencies
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId dependency

// Importing heavy libraries for single function
import lodash from "lodash"; // 70KB!
const result = lodash.sortBy(items, "name");
```

---

## Checklist for Code Reviews

- [ ] TypeScript types are explicit
- [ ] No use of `any` type
- [ ] Components are properly named and exported
- [ ] Props are fully typed
- [ ] Error handling is present
- [ ] No console.log statements left
- [ ] Component is responsive
- [ ] No accessibility violations
- [ ] Performance optimized
- [ ] Comments are meaningful
- [ ] Tests cover main functionality
- [ ] No dead code

---

## Resources

- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
- [Next.js Best Practices](https://nextjs.org/docs/pages/building-your-application/optimizing/performance-bundle-analysis)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/utility-first)
- [Clean Code in JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

---

**Version**: 1.0
**Last Updated**: December 5, 2025
