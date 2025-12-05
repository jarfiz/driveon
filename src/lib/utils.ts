import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Booking, BookingPricing, SearchFilters, Vehicle } from "@/types";

/**
 * Merge Tailwind CSS classes with conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format currency with proper localization
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (
  date: Date | string,
  locale: string = "en-US",
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (
  date: Date | string,
  locale: string = "en-US",
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format time in relative format (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) {
    return "just now";
  }
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ago`;
  }
  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h ago`;
  }
  if (seconds < 604800) {
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return formatDate(d);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number, locale: string = "en-US"): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Truncate string with ellipsis
 */
export const truncate = (str: string, length: number): string => {
  if (str.length > length) {
    return `${str.substring(0, length)}...`;
  }
  return str;
};

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const regex = /^\+?[\d\s\-()]{10,}$/;
  return regex.test(phone);
};

/**
 * Validate date range
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate < endDate;
};

/**
 * Check if date is in past
 */
export const isDateInPast = (date: Date): boolean => {
  return new Date(date) < new Date();
};

// ============================================================================
// CALCULATION UTILITIES
// ============================================================================

/**
 * Calculate number of days between two dates
 */
export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((end.getTime() - start.getTime()) / msPerDay);
};

/**
 * Calculate booking pricing
 */
export const calculateBookingPrice = (
  booking: Partial<Booking>,
): BookingPricing => {
  const days =
    booking.startDate && booking.endDate
      ? getDaysBetween(booking.startDate, booking.endDate)
      : 1;

  const vehicle = booking as Partial<Vehicle>;
  const basePrice = (vehicle.pricePerDay ?? 0) * days;
  const insurancePrice = (booking.insurance?.pricePerDay ?? 0) * days;
  const addOnsPrice =
    booking.addOns?.reduce(
      (sum, addon) => sum + addon.price * addon.quantity,
      0,
    ) ?? 0;

  const subtotal = basePrice + insurancePrice + addOnsPrice;
  const platformFee = Math.round(subtotal * 0.1);
  const tax = Math.round((subtotal + platformFee) * 0.1);
  const total = subtotal + platformFee + tax;

  return {
    basePrice,
    insurancePrice,
    addOnsPrice,
    discounts: 0,
    platformFee,
    tax,
    total,
    currency: "USD",
  };
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) {
    return 0;
  }
  const sum = ratings.reduce((a, b) => a + b, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

// ============================================================================
// ARRAY & OBJECT UTILITIES
// ============================================================================

/**
 * Remove duplicates from array
 */
export const removeDuplicates = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Group array items by property
 */
export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K,
): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!groupKey) {
        return result;
      }
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
};

/**
 * Sort objects by property
 */
export const sortBy = <T, K extends keyof T>(
  array: T[],
  key: K,
  order: "asc" | "desc" = "asc",
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) {
      return order === "asc" ? -1 : 1;
    }
    if (aVal > bVal) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

// ============================================================================
// SEARCH & FILTER UTILITIES
// ============================================================================

/**
 * Search vehicles by query
 */
export const searchVehicles = (
  vehicles: Vehicle[],
  query: string,
): Vehicle[] => {
  const lowerQuery = query.toLowerCase();
  return vehicles.filter(
    (vehicle) =>
      vehicle.title.toLowerCase().includes(lowerQuery) ||
      vehicle.make?.toLowerCase().includes(lowerQuery) ||
      vehicle.model?.toLowerCase().includes(lowerQuery) ||
      vehicle.description.toLowerCase().includes(lowerQuery),
  );
};

/**
 * Filter vehicles by criteria
 */
export const filterVehicles = (
  vehicles: Vehicle[],
  filters: SearchFilters,
): Vehicle[] => {
  return vehicles.filter((vehicle) => {
    // Filter by vehicle categories (car, motorcycle, boat, rv, other)
    if (
      filters.categories?.length &&
      !filters.categories.includes(vehicle.category)
    ) {
      return false;
    }

    // Filter by specific vehicle types
    if (
      filters.vehicleType?.length &&
      !filters.vehicleType.includes(vehicle.type)
    ) {
      return false;
    }

    // Filter by price range
    if (filters.priceRange) {
      if (
        vehicle.pricePerDay < filters.priceRange.min ||
        vehicle.pricePerDay > filters.priceRange.max
      ) {
        return false;
      }
    }

    // Filter by transmission (when available)
    if (filters.transmission && vehicle.transmission !== filters.transmission) {
      return false;
    }

    // Filter by fuel type (when available)
    if (filters.fuelType && vehicle.fuelType !== filters.fuelType) {
      return false;
    }

    // Filter by minimum seats (when available)
    if (filters.seats && vehicle.seats && vehicle.seats < filters.seats) {
      return false;
    }

    // Filter by minimum rating
    if (filters.rating && vehicle.rating.average < filters.rating) {
      return false;
    }

    return true;
  });
};

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

/**
 * Get error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
};

// ============================================================================
// URL & QUERY UTILITIES
// ============================================================================

/**
 * Build query string from object
 */
export const buildQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

/**
 * Generate slug from string
 */
export const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "")
    .replace(/\-+/g, "-")
    .trim()
    .replace(/^\-+|\-+$/g, "");
};
