/**
 * Application constants
 * Centralized configuration values, enums, and feature flags
 */

// ============================================================================
// VEHICLE TYPES & OPTIONS
// ============================================================================

export const VEHICLE_TYPES = {
  // Cars
  compact: {
    label: "Compact Car",
    icon: "Zap",
    description: "Small & efficient",
    category: "car",
  },
  sedan: {
    label: "Sedan",
    icon: "Car",
    description: "Comfortable & smooth",
    category: "car",
  },
  suv: {
    label: "SUV",
    icon: "Mountain",
    description: "Spacious & powerful",
    category: "car",
  },
  truck: {
    label: "Truck",
    icon: "Truck",
    description: "Heavy duty",
    category: "car",
  },
  van: {
    label: "Van",
    icon: "Users",
    description: "Group travel",
    category: "car",
  },
  luxury: {
    label: "Luxury Car",
    icon: "Crown",
    description: "Premium experience",
    category: "car",
  },
  electric: {
    label: "Electric Car",
    icon: "Zap",
    description: "Eco-friendly",
    category: "car",
  },
  hatchback: {
    label: "Hatchback",
    icon: "Car",
    description: "Compact & versatile",
    category: "car",
  },
  coupe: {
    label: "Coupe",
    icon: "Zap",
    description: "Sporty & stylish",
    category: "car",
  },
  // Motorcycles & Scooters
  motorcycle: {
    label: "Motorcycle",
    icon: "Bike",
    description: "Two-wheeler adventure",
    category: "motorcycle",
  },
  scooter: {
    label: "Scooter",
    icon: "Wind",
    description: "Easy city riding",
    category: "motorcycle",
  },
  cruiser: {
    label: "Cruiser",
    icon: "Bike",
    description: "Classic motorcycle",
    category: "motorcycle",
  },
  sportbike: {
    label: "Sport Bike",
    icon: "Zap",
    description: "High performance",
    category: "motorcycle",
  },
  // Boats & Water Vehicles
  yacht: {
    label: "Yacht",
    icon: "Waves",
    description: "Luxury boat experience",
    category: "boat",
  },
  speedboat: {
    label: "Speed Boat",
    icon: "Wind",
    description: "Fast water adventure",
    category: "boat",
  },
  sailboat: {
    label: "Sailboat",
    icon: "Wind",
    description: "Classic sailing",
    category: "boat",
  },
  jetski: {
    label: "Jet Ski",
    icon: "Zap",
    description: "Water sports fun",
    category: "boat",
  },
  fishing_boat: {
    label: "Fishing Boat",
    icon: "Waves",
    description: "Fishing adventure",
    category: "boat",
  },
  houseboat: {
    label: "Houseboat",
    icon: "Home",
    description: "Floating accommodation",
    category: "boat",
  },
  // RVs & Recreational
  rv: {
    label: "RV",
    icon: "Home",
    description: "Mobile home adventure",
    category: "rv",
  },
  campervan: {
    label: "Camper Van",
    icon: "Users",
    description: "Compact camping",
    category: "rv",
  },
  motorhome: {
    label: "Motorhome",
    icon: "Home",
    description: "Luxury mobile living",
    category: "rv",
  },
  // Other Vehicles
  atv: {
    label: "ATV",
    icon: "Mountain",
    description: "Off-road adventure",
    category: "other",
  },
  bicycle: {
    label: "Bicycle",
    icon: "Wind",
    description: "Eco-friendly cycling",
    category: "other",
  },
  ebike: {
    label: "E-Bike",
    icon: "Zap",
    description: "Electric cycling",
    category: "other",
  },
} as const;

export const TRANSMISSION_TYPES = {
  manual: "Manual",
  automatic: "Automatic",
} as const;

export const FUEL_TYPES = {
  petrol: { label: "Petrol", icon: "Fuel" },
  diesel: { label: "Diesel", icon: "Fuel" },
  hybrid: { label: "Hybrid", icon: "Leaf" },
  electric: { label: "Electric", icon: "Zap" },
  lpg: { label: "LPG", icon: "Fuel" },
} as const;

export const VEHICLE_CONDITION = {
  new: "New",
  good: "Good",
  fair: "Fair",
  needs_repair: "Needs Repair",
} as const;

export const VEHICLE_FEATURES = [
  // Common Features (all vehicles)
  { id: "gps", name: "GPS/Navigation", category: "convenience" },
  { id: "wifi", name: "WiFi", category: "entertainment" },
  { id: "bluetooth", name: "Bluetooth", category: "entertainment" },
  { id: "usb_charging", name: "USB Charging", category: "convenience" },

  // Car/Motorcycle Features
  { id: "ac", name: "Air Conditioning", category: "comfort" },
  { id: "backup_camera", name: "Backup Camera", category: "safety" },
  { id: "parking_sensors", name: "Parking Sensors", category: "safety" },
  { id: "autopilot", name: "Autopilot/Cruise", category: "convenience" },
  { id: "cruise_control", name: "Cruise Control", category: "convenience" },
  { id: "heated_seats", name: "Heated Seats", category: "comfort" },
  { id: "sunroof", name: "Sunroof/Moonroof", category: "comfort" },
  {
    id: "premium_audio",
    name: "Premium Audio System",
    category: "entertainment",
  },
  { id: "child_seat", name: "Child Seat Available", category: "safety" },
  { id: "pet_friendly", name: "Pet Friendly", category: "convenience" },

  // Motorcycle Features
  { id: "helmet_included", name: "Helmet Included", category: "safety" },
  {
    id: "protective_gear",
    name: "Protective Gear Available",
    category: "safety",
  },

  // Boat Features
  { id: "life_jackets", name: "Life Jackets Available", category: "safety" },
  { id: "fishing_gear", name: "Fishing Equipment", category: "convenience" },
  { id: "snorkel_gear", name: "Snorkel Gear", category: "convenience" },
  { id: "refrigerator", name: "Refrigerator", category: "convenience" },
  { id: "kitchen", name: "Galley/Kitchen", category: "comfort" },
  { id: "bedding", name: "Bedding Included", category: "comfort" },

  // RV Features
  { id: "shower", name: "Shower Available", category: "comfort" },
  { id: "toilet", name: "Toilet Available", category: "comfort" },
  { id: "heating", name: "Heating System", category: "comfort" },
  { id: "air_conditioning_rv", name: "A/C & Heating", category: "comfort" },
  { id: "generator", name: "Generator", category: "convenience" },
  { id: "water_system", name: "Fresh Water System", category: "convenience" },

  // Bicycle Features
  { id: "lock_included", name: "Lock Included", category: "safety" },
  { id: "lights", name: "Lights/Reflectors", category: "safety" },
  { id: "basket", name: "Basket/Carrier", category: "convenience" },
] as const;

// ============================================================================
// BOOKING & PRICING
// ============================================================================

export const CANCELLATION_POLICIES = {
  flexible: {
    label: "Flexible",
    description: "Free cancellation up to 24 hours before",
    refundPercentage: 100,
    refundDeadlineHours: 24,
  },
  moderate: {
    label: "Moderate",
    description: "50% refund if cancelled 48 hours before",
    refundPercentage: 50,
    refundDeadlineHours: 48,
  },
  strict: {
    label: "Strict",
    description: "Non-refundable with few exceptions",
    refundPercentage: 0,
    refundDeadlineHours: 0,
  },
} as const;

export const INSURANCE_OPTIONS = {
  basic: {
    id: "basic",
    name: "Basic Coverage",
    description: "Standard damage protection",
    coverage: "$2,500 max",
    pricePerDay: 15,
    maxCoverage: 2500,
  },
  standard: {
    id: "standard",
    name: "Standard Coverage",
    description: "Comprehensive damage protection",
    coverage: "$5,000 max",
    pricePerDay: 25,
    maxCoverage: 5000,
  },
  premium: {
    id: "premium",
    name: "Premium Coverage",
    description: "Full damage & theft protection",
    coverage: "$10,000 max",
    pricePerDay: 40,
    maxCoverage: 10000,
  },
} as const;

export const ADDONS = {
  extra_driver: {
    id: "extra_driver",
    name: "Extra Driver",
    description: "Add an additional insured driver",
    price: 10,
    category: "driver" as const,
  },
  gps: {
    id: "gps",
    name: "GPS Navigation",
    description: "Premium GPS device with offline maps",
    price: 5,
    category: "equipment" as const,
  },
  baby_seat: {
    id: "baby_seat",
    name: "Baby Seat",
    description: "Child safety seat installation",
    price: 15,
    category: "equipment" as const,
  },
  wifi_device: {
    id: "wifi_device",
    name: "WiFi Device",
    description: "Portable WiFi hotspot for connectivity",
    price: 8,
    category: "equipment" as const,
  },
  roadside_assistance: {
    id: "roadside_assistance",
    name: "24/7 Roadside Assistance",
    description: "Emergency roadside support and towing",
    price: 12,
    category: "service" as const,
  },
} as const;

// ============================================================================
// BOOKING STATUS & PAYMENT
// ============================================================================

export const BOOKING_STATUS = {
  pending: { label: "Pending", color: "yellow", icon: "Clock" },
  confirmed: { label: "Confirmed", color: "blue", icon: "CheckCircle" },
  ongoing: { label: "Ongoing", color: "blue", icon: "Play" },
  completed: { label: "Completed", color: "green", icon: "Check" },
  cancelled: { label: "Cancelled", color: "red", icon: "X" },
  disputed: { label: "Disputed", color: "orange", icon: "AlertCircle" },
} as const;

export const PAYMENT_METHODS = {
  credit_card: "Credit Card",
  debit_card: "Debit Card",
  wallet: "Wallet",
  upi: "UPI",
} as const;

export const PAYMENT_STATUS = {
  pending: { label: "Pending", color: "yellow" },
  confirmed: { label: "Confirmed", color: "green" },
  failed: { label: "Failed", color: "red" },
  refunded: { label: "Refunded", color: "blue" },
} as const;

// ============================================================================
// REVIEW & RATING
// ============================================================================

export const REVIEW_CATEGORIES = [
  { id: "cleanliness", label: "Cleanliness", emoji: "🧹" },
  { id: "accuracy", label: "Accuracy", emoji: "✅" },
  { id: "communication", label: "Communication", emoji: "💬" },
  { id: "value", label: "Value for Money", emoji: "💰" },
  { id: "safety", label: "Safety", emoji: "🔒" },
] as const;

export const RATING_LABELS = {
  5: "Excellent",
  4: "Good",
  3: "Average",
  2: "Poor",
  1: "Very Poor",
} as const;

// ============================================================================
// ISSUE TYPES
// ============================================================================

export const ISSUE_TYPES = {
  damage: { label: "Damage", color: "red", icon: "AlertTriangle" },
  cleanliness: { label: "Cleanliness", color: "yellow", icon: "Zap" },
  mileage: { label: "Mileage Dispute", color: "orange", icon: "Activity" },
  other: { label: "Other", color: "gray", icon: "HelpCircle" },
} as const;

export const ISSUE_STATUS = {
  reported: "Reported",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
  disputed: "Disputed",
} as const;

// ============================================================================
// PAGINATION & LIMITS
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  REVIEWS_PER_PAGE: 10,
  MESSAGES_PER_PAGE: 25,
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_VEHICLE_PRICE: 10,
  MAX_VEHICLE_PRICE: 10000,
  MIN_BOOKING_DAYS: 1,
  MAX_BOOKING_DAYS: 365,
  MIN_YEAR: 2010,
  MAX_YEAR: new Date().getFullYear(),
  MIN_SEATS: 1,
  MAX_SEATS: 8,
  MIN_MILEAGE: 0,
  MAX_MILEAGE: 1000000,
  PHONE_REGEX: /^\+?[\d\s\-()]+$/,
  ZIP_CODE_REGEX: /^[0-9a-zA-Z\s\-]{3,10}$/,
} as const;

// ============================================================================
// TIME & DATE CONSTANTS
// ============================================================================

export const TIME = {
  MILLISECONDS_PER_MINUTE: 60000,
  MILLISECONDS_PER_HOUR: 3600000,
  MILLISECONDS_PER_DAY: 86400000,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
} as const;

export const BOOKING_CANCELLATION_DEADLINES = {
  FLEXIBLE: 24,
  MODERATE: 48,
  STRICT: 0,
} as const;

export const RESPONSE_TIME_THRESHOLDS = {
  EXCELLENT: 1, // hours
  GOOD: 4,
  AVERAGE: 12,
} as const;

// ============================================================================
// API & ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  SESSION_EXPIRED: "SESSION_EXPIRED",

  // Validation
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PHONE: "INVALID_PHONE",
  WEAK_PASSWORD: "WEAK_PASSWORD",

  // Business Logic
  VEHICLE_NOT_FOUND: "VEHICLE_NOT_FOUND",
  BOOKING_NOT_FOUND: "BOOKING_NOT_FOUND",
  BOOKING_CONFLICT: "BOOKING_CONFLICT",
  BOOKING_CANCELLED: "BOOKING_CANCELLED",
  INVALID_DATE_RANGE: "INVALID_DATE_RANGE",
  INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  CANCELLATION_NOT_ALLOWED: "CANCELLATION_NOT_ALLOWED",

  // Generic
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  BAD_REQUEST: "BAD_REQUEST",
  CONFLICT: "CONFLICT",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
} as const;

// ============================================================================
// NOTIFICATION SETTINGS
// ============================================================================

export const NOTIFICATION_TYPES = {
  booking_request: { label: "Booking Request", icon: "Calendar" },
  booking_confirmed: { label: "Booking Confirmed", icon: "CheckCircle" },
  booking_cancelled: { label: "Booking Cancelled", icon: "XCircle" },
  message: { label: "New Message", icon: "MessageSquare" },
  review: { label: "New Review", icon: "Star" },
  payment: { label: "Payment Update", icon: "DollarSign" },
  issue: { label: "Issue Report", icon: "AlertTriangle" },
  system: { label: "System Alert", icon: "AlertCircle" },
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
  INSTANT_BOOKING: true,
  REQUEST_TO_BOOK: true,
  MESSAGING: true,
  REVIEWS: true,
  INSURANCE: true,
  ADDONS: true,
  WALLET: false, // Coming soon
  CORPORATE_ACCOUNTS: false, // Coming soon
  MONTHLY_PLANS: false, // Coming soon
} as const;

// ============================================================================
// ROUTES & PAGES
// ============================================================================

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  BROWSE: "/browse",
  VEHICLES: "/vehicles",
  VEHICLE_DETAIL: "/vehicles/[id]",
  BOOKINGS: "/bookings",
  BOOKING_DETAIL: "/bookings/[id]",
  HOST: "/host",
  HOST_VEHICLES: "/host/vehicles",
  HOST_VEHICLE_NEW: "/host/vehicles/new",
  HOST_VEHICLE_EDIT: "/host/vehicles/[id]/edit",
  HOST_BOOKINGS: "/host/bookings",
  HOST_EARNINGS: "/host/earnings",
  HOST_REVIEWS: "/host/reviews",
  MESSAGES: "/messages",
  CONVERSATION: "/messages/[id]",
  PROFILE: "/profile",
  PROFILE_SETTINGS: "/profile/settings",
  FAVORITES: "/favorites",
  REVIEWS: "/reviews",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/[token]",
} as const;

// ============================================================================
// ANALYTICS EVENTS
// ============================================================================

export const ANALYTICS_EVENTS = {
  // Search & Browse
  SEARCH_INITIATED: "search_initiated",
  FILTER_APPLIED: "filter_applied",
  VEHICLE_VIEWED: "vehicle_viewed",

  // Booking
  BOOKING_STARTED: "booking_started",
  BOOKING_COMPLETED: "booking_completed",
  BOOKING_CANCELLED: "booking_cancelled",
  BOOKING_DISPUTED: "booking_disputed",

  // Review
  REVIEW_SUBMITTED: "review_submitted",

  // User
  SIGN_UP: "sign_up",
  SIGN_IN: "sign_in",
  SIGN_OUT: "sign_out",
  PROFILE_UPDATED: "profile_updated",

  // Host
  VEHICLE_LISTED: "vehicle_listed",
  VEHICLE_UPDATED: "vehicle_updated",
  VEHICLE_REMOVED: "vehicle_removed",
} as const;

// ============================================================================
// CURRENCY & LOCALIZATION
// ============================================================================

export const CURRENCIES = {
  USD: { code: "USD", symbol: "$", name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", name: "Euro" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound" },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee" },
  AED: { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
} as const;

export const DEFAULT_CURRENCY = "USD" as const;

// ============================================================================
// COMMON MESSAGES
// ============================================================================

export const MESSAGES = {
  // Success
  SUCCESS: "Operation completed successfully",
  BOOKING_CREATED: "Booking created successfully",
  PAYMENT_SUCCESS: "Payment processed successfully",
  PROFILE_UPDATED: "Profile updated successfully",

  // Error
  ERROR: "Something went wrong",
  PLEASE_TRY_AGAIN: "Please try again later",
  INVALID_INPUT: "Please check your input",
  NETWORK_ERROR: "Network error. Please check your connection",

  // Confirmation
  CONFIRM_BOOKING: "Are you sure you want to book this vehicle?",
  CONFIRM_CANCELLATION: "Are you sure you want to cancel this booking?",
  CONFIRM_DELETE: "Are you sure? This action cannot be undone.",

  // Information
  NO_RESULTS: "No results found",
  LOADING: "Loading...",
  EMPTY_STATE: "Nothing here yet",
} as const;

// ============================================================================
// EXTERNAL LINKS
// ============================================================================

export const LINKS = {
  PRIVACY_POLICY: "/privacy",
  TERMS_OF_SERVICE: "/terms",
  HELP_CENTER: "/help",
  COMMUNITY_GUIDELINES: "/guidelines",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
  SOCIAL: {
    TWITTER: "https://twitter.com",
    FACEBOOK: "https://facebook.com",
    INSTAGRAM: "https://instagram.com",
    LINKEDIN: "https://linkedin.com",
  },
} as const;
