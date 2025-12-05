/**
 * Custom React hooks
 * Reusable logic for authentication, data fetching, form handling
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import type { BookingFormData, SearchFilters, Vehicle } from "@/types";

/**
 * Custom React hooks
 * Reusable logic for authentication, data fetching, form handling
 */

/**
 * Custom React hooks
 * Reusable logic for authentication, data fetching, form handling
 */

/**
 * Custom React hooks
 * Reusable logic for authentication, data fetching, form handling
 */

// ============================================================================
// AUTHENTICATION HOOKS
// ============================================================================

/**
 * Hook for managing authentication state and user session
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user session
    const fetchSession = async () => {
      try {
        // Implementation will use Better Auth
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch session",
        );
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const logout = useCallback(async () => {
    try {
      // Implementation will use Better Auth
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    }
  }, []);

  return { user, loading, error, logout };
};

// ============================================================================
// VEHICLE HOOKS
// ============================================================================

/**
 * Hook for fetching vehicles with search and filters
 */
export const useVehicles = (filters?: SearchFilters) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchVehicles = useCallback(
    async (pageNum = 1) => {
      try {
        setLoading(true);
        // API call implementation
        const response = await fetch("/api/vehicles", {
          method: "POST",
          body: JSON.stringify({ filters, page: pageNum }),
        });
        const data = await response.json();
        setVehicles(pageNum === 1 ? data.items : [...vehicles, ...data.items]);
        setHasMore(data.hasMore);
        setPage(pageNum);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch vehicles",
        );
      } finally {
        setLoading(false);
      }
    },
    [filters, vehicles],
  );

  useEffect(() => {
    void fetchVehicles();
  }, [filters, fetchVehicles]);

  const loadMore = useCallback(() => {
    if (hasMore) {
      void fetchVehicles(page + 1);
    }
  }, [hasMore, page, fetchVehicles]);

  return { vehicles, loading, error, hasMore, loadMore };
};

/**
 * Hook for fetching a single vehicle by ID
 */
export const useVehicle = (vehicleId?: string) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoading(false);
      return;
    }

    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/vehicles/${vehicleId}`);
        const data = await response.json();
        setVehicle(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch vehicle",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchVehicle();
  }, [vehicleId]);

  return { vehicle, loading, error };
};

// ============================================================================
// PAGINATION HOOKS
// ============================================================================

/**
 * Hook for managing pagination state
 */
export const usePagination = (initialPage = 1, pageSize = 12) => {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((p) => p + 1);
    }
  }, [hasNextPage]);

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setPage((p) => p - 1);
    }
  }, [hasPrevPage]);

  return {
    page,
    pageSize,
    total,
    setTotal,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
  };
};

// ============================================================================
// FORM HOOKS
// ============================================================================

/**
 * Hook for managing form state with validation
 */
export const useFormState = <T extends Record<string, unknown>>(
  initialValues: T,
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDirty, setIsDirty] = useState(false);

  const setFieldValue = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const setFieldTouched = useCallback((field: string, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [field]: isTouched }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  }, [initialValues]);

  const resetField = useCallback(
    (field: keyof T) => {
      setValues((prev) => ({ ...prev, [field]: initialValues[field] }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    },
    [initialValues],
  );

  return {
    values,
    errors,
    touched,
    isDirty,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    resetForm,
    resetField,
  };
};

// ============================================================================
// SEARCH & FILTER HOOKS
// ============================================================================

/**
 * Hook for managing search and filter state
 */
export const useSearch = (onSearch?: (query: string) => void) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      if (onSearch) {
        setIsSearching(true);
        onSearch(searchQuery);
        setIsSearching(false);
      }
    },
    [onSearch],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
  }, []);

  return {
    query,
    results,
    isSearching,
    handleSearch,
    clearSearch,
    setResults,
  };
};

/**
 * Hook for managing filter state
 */
export const useFilters = (initialFilters?: SearchFilters) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters ?? {});

  const updateFilter = useCallback(
    (key: keyof SearchFilters, value: unknown) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const removeFilter = useCallback((key: keyof SearchFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasFilters = Object.keys(filters).length > 0;

  return {
    filters,
    updateFilter,
    removeFilter,
    clearFilters,
    hasFilters,
  };
};

// ============================================================================
// LOCAL STORAGE HOOKS
// ============================================================================

/**
 * Hook for managing data in localStorage with SSR support
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") {
        return;
      }
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
    }
    setIsLoaded(true);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error writing to localStorage for key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue, isLoaded] as const;
};

// ============================================================================
// DEBOUNCE & THROTTLE HOOKS
// ============================================================================

/**
 * Hook for debouncing values
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// ============================================================================
// INTERSECTION OBSERVER HOOK
// ============================================================================

/**
 * Hook for detecting when element enters viewport
 */
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit,
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
};

// ============================================================================
// PREVIOUS VALUE HOOK
// ============================================================================

/**
 * Hook for storing previous value
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useState<T | undefined>(undefined)[0];

  useEffect(() => {
    (ref as unknown as { current: T | undefined }).current = value;
  }, [value, ref]);

  return (ref as unknown as { current: T | undefined }).current;
};
