/**
 * Core domain types for P2P Vehicle Rental Platform
 * Following domain-driven design principles
 */

// ============================================================================
// USER & PROFILE TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "renter" | "host" | "admin";

export interface UserProfile extends User {
  bio?: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  verifiedDocument: boolean;
  totalBookings: number;
  totalListings: number;
  averageRating: number;
  reviewCount: number;
  responseTime?: number; // in hours
  joinedDate: Date;
}

export interface HostProfile extends UserProfile {
  companyName?: string;
  businessVerified: boolean;
  insuranceVerified: boolean;
  totalVehicles: number;
  activeListings: number;
  totalEarnings: number;
}

// ============================================================================
// VEHICLE TYPES
// ============================================================================

// Cars
export type CarType =
  | "compact"
  | "sedan"
  | "suv"
  | "truck"
  | "van"
  | "luxury"
  | "electric"
  | "hatchback"
  | "coupe";

// Motorcycles & Scooters
export type MotorcycleType = "motorcycle" | "scooter" | "cruiser" | "sportbike";

// Boats & Water Vehicles
export type BoatType =
  | "yacht"
  | "speedboat"
  | "sailboat"
  | "jetski"
  | "fishing_boat"
  | "houseboat";

// RVs & Recreational
export type RVType = "rv" | "campervan" | "motorhome";

// Other Vehicles
export type OtherVehicleType = "atv" | "bicycle" | "ebike";

// Union of all vehicle types
export type VehicleType =
  | CarType
  | MotorcycleType
  | BoatType
  | RVType
  | OtherVehicleType;

// Vehicle categories
export type VehicleCategory = "car" | "motorcycle" | "boat" | "rv" | "other";

export type VehicleTransmission = "manual" | "automatic";
export type VehicleCondition = "new" | "good" | "fair" | "needs-repair";
export type FuelType = "petrol" | "diesel" | "hybrid" | "electric" | "lpg";

export interface Vehicle {
  id: string;
  hostId: string;
  title: string;
  description: string;
  type: VehicleType;
  category: VehicleCategory;
  make?: string; // Manufacturer (optional for some vehicles like bicycles)
  model?: string;
  year?: number;
  licensePlate?: string;
  transmission?: VehicleTransmission;
  fuelType?: FuelType;
  seats?: number;
  luggage?: number;
  mileage?: number;
  condition: VehicleCondition;
  pricePerDay: number; // in local currency
  pricePerHour?: number;
  minimumBookingDays: number;
  maxBookingDays?: number;
  images: VehicleImage[];
  location: Location;
  features: VehicleFeature[];
  rules: VehicleRule[];
  insurance: InsuranceOption[];
  rating: VehicleRating;
  availability: Availability[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  isMain: boolean;
}

export interface VehicleFeature {
  id: string;
  name: string;
  icon?: string;
  category: "comfort" | "safety" | "entertainment" | "convenience";
}

export interface VehicleRule {
  id: string;
  title: string;
  description: string;
  type: "requirement" | "restriction" | "guideline";
}

export interface VehicleRating {
  average: number; // 0-5
  count: number;
  cleanliness: number;
  accuracy: number;
  communication: number;
  value: number;
  safety: number;
}

export interface Availability {
  id: string;
  startDate: Date;
  endDate: Date;
  isAvailable: boolean;
}

// ============================================================================
// LOCATION TYPES
// ============================================================================

export interface Location {
  id?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  instructions?: string; // Pickup instructions
}

// ============================================================================
// BOOKING TYPES
// ============================================================================

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "ongoing"
  | "completed"
  | "cancelled"
  | "disputed";

export type PaymentStatus = "pending" | "confirmed" | "failed" | "refunded";

export interface Booking {
  id: string;
  vehicleId: string;
  renterId: string;
  hostId: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  pickupLocation: Location;
  dropoffLocation: Location;
  mileageAtPickup?: number;
  mileageAtDropoff?: number;
  pricing: BookingPricing;
  payment: Payment;
  insurance?: InsuranceSelected;
  addOns: Addon[];
  cancellationPolicy: CancellationPolicy;
  communication: Message[];
  issues: Issue[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingPricing {
  basePrice: number; // daily/hourly rate × days/hours
  insurancePrice: number;
  addOnsPrice: number;
  discounts: number;
  platformFee: number;
  tax: number;
  total: number;
  currency: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentMethod = "credit_card" | "debit_card" | "wallet" | "upi";

export interface InsuranceOption {
  id: string;
  name: string;
  description: string;
  coverage: string;
  pricePerDay: number;
  maxCoverage: number;
}

export interface InsuranceSelected {
  insuranceId: string;
  name: string;
  pricePerDay: number;
  coverage: string;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: "driver" | "equipment" | "service";
}

export interface CancellationPolicy {
  type: "flexible" | "moderate" | "strict";
  refundPercentage: number;
  refundDeadlineHours: number;
}

export interface Issue {
  id: string;
  reportedBy: string; // userId
  type: "damage" | "cleanliness" | "mileage" | "other";
  description: string;
  images: string[];
  status: "reported" | "acknowledged" | "resolved" | "disputed";
  resolution?: string;
  createdAt: Date;
}

// ============================================================================
// REVIEW & RATING TYPES
// ============================================================================

export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  reviewType: "host" | "renter" | "vehicle";
  rating: number; // 1-5
  categories?: ReviewCategories;
  title: string;
  comment: string;
  images: string[];
  helpful: number;
  response?: ReviewResponse;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewCategories {
  cleanliness?: number;
  accuracy?: number;
  communication?: number;
  value?: number;
  safety?: number;
}

export interface ReviewResponse {
  content: string;
  createdAt: Date;
}

// ============================================================================
// MESSAGING TYPES
// ============================================================================

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments?: Attachment[];
  readAt?: Date;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participantIds: string[]; // Usually host and renter
  bookingId?: string;
  lastMessage?: Message;
  unreadCount: Record<string, number>; // userId -> count
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  url: string;
  type: "image" | "document";
  name: string;
}

// ============================================================================
// SEARCH & FILTER TYPES
// ============================================================================

export interface SearchFilters {
  location?: Location;
  startDate?: Date;
  endDate?: Date;
  categories?: VehicleCategory[]; // Filter by vehicle categories (car, motorcycle, boat, rv, other)
  vehicleType?: VehicleType[]; // Filter by specific vehicle types
  priceRange?: {
    min: number;
    max: number;
  };
  features?: string[];
  transmission?: VehicleTransmission;
  fuelType?: FuelType;
  seats?: number;
  rating?: number; // minimum rating
  maxDistance?: number; // km from location
  sortBy?: "price" | "rating" | "newest" | "popular";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  vehicle: Vehicle;
  host: HostProfile;
  availability: boolean;
  matchScore?: number; // relevance score
}

// ============================================================================
// TRANSACTION & EARNING TYPES
// ============================================================================

export interface Earning {
  id: string;
  hostId: string;
  bookingId: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: "pending" | "processed" | "paid";
  paidAt?: Date;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "earning" | "expense" | "refund" | "payout";
  amount: number;
  currency: string;
  description: string;
  relatedId?: string; // bookingId, earningId, etc.
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export type NotificationType =
  | "booking_request"
  | "booking_confirmed"
  | "booking_cancelled"
  | "message"
  | "review"
  | "payment"
  | "issue"
  | "system";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: string; // bookingId, userId, etc.
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface VehicleFormData {
  title: string;
  description: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  transmission: VehicleTransmission;
  fuelType: FuelType;
  seats: number;
  luggage: number;
  mileage: number;
  condition: VehicleCondition;
  pricePerDay: number;
  pricePerHour?: number;
  minimumBookingDays: number;
  maxBookingDays?: number;
  images: File[];
  location: Location;
  features: string[];
  rules: VehicleRule[];
  insurance: InsuranceOption[];
}

export interface BookingFormData {
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: Location;
  dropoffLocation: Location;
  insuranceId?: string;
  addOns: string[];
}

// ============================================================================
// STATISTICS & ANALYTICS TYPES
// ============================================================================

export interface HostStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  activeListings: number;
  totalEarnings: number;
  averageRating: number;
  responseRate: number;
  acceptanceRate: number;
  totalReviews: number;
}

export interface RenterStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpent: number;
  averageRating: number;
  totalReviews: number;
  favoriteVehicles: number;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface BusinessError {
  code: string;
  message: string;
  statusCode: number;
}
