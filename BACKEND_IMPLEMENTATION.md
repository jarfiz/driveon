# VehicleShare Backend Implementation

## Overview

Complete fullstack backend for a P2P vehicle rental platform built with Next.js 15, Prisma ORM, and PostgreSQL.

## Architecture

### Directory Structure

```
src/
├── app/api/                    # API Route Handlers
│   ├── auth/                   # Authentication endpoints
│   ├── vehicles/               # Vehicle management
│   ├── bookings/               # Booking management
│   ├── listings/               # Listing management
│   ├── reviews/                # Review system
│   └── payments/               # Payment processing
│
├── server/                     # Backend business logic
│   ├── db.ts                   # Prisma client singleton
│   ├── services/               # Business logic services
│   │   ├── booking.service.ts  # Booking operations
│   │   ├── vehicle.service.ts  # Vehicle operations
│   │   ├── listing.service.ts  # Listing operations
│   │   ├── payment.service.ts  # Payment processing
│   │   └── review.service.ts   # Review management
│   ├── middleware/             # Request middleware
│   │   └── auth.ts             # Authentication guards
│   └── utils/                  # Utility functions
│       └── response.ts         # API response formatters
```

## Database Schema

### Core Models

#### User

- Authentication user with role-based access
- Host and guest profiles
- Rating system for both roles
- Account status management

#### Vehicle

- Complete vehicle details (brand, model, year, etc.)
- Vehicle features and images
- Status tracking (ACTIVE, MAINTENANCE, ARCHIVED)
- Host relationship

#### Listing

- Vehicle rental listing with pricing
- Availability rules and booking preferences
- Host information
- Active/inactive status

#### Booking

- Complete booking lifecycle
- Pricing calculation (daily rate, tax, delivery)
- Guest and host relationships
- Cancellation tracking with refund logic

#### Payment

- Integrated with Stripe
- Multiple payment methods
- Refund handling
- Receipt generation

#### Review

- Host, guest, and vehicle reviews
- Star rating system (1-5)
- User rating aggregation
- Visibility controls

#### Additional Models

- Insurance (coverage options)
- Message (P2P messaging)
- Conversation (message threads)
- Wallet (balance management)
- Transaction (financial tracking)
- SupportTicket (customer support)

## Service Layer

### BookingService

```typescript
-createBooking() - // Create new booking with validation
  getBooking() - // Fetch booking details
  getBookings() - // List bookings with filters
  updateBookingStatus() - // Change booking status
  cancelBooking(); // Cancel with refund calculation
```

### VehicleService

```typescript
-createVehicle() - // Add new vehicle
  getVehicle() - // Vehicle details
  getVehicles() - // List with filters
  searchVehicles() - // Full-text search
  updateVehicle() - // Update vehicle info
  deleteVehicle(); // Delete with validation
```

### ListingService

```typescript
-createListing() - // Create vehicle listing
  getListing() - // Listing details
  getListingsByHost() - // Host's listings
  getAvailableListings() - // Browse available
  updateListing() - // Update pricing/rules
  deactivateListing(); // Deactivate listing
```

### PaymentService

```typescript
-createPayment() - // Initialize payment
  getPayment() - // Payment details
  getPaymentsByUser() - // User's transactions
  completePayment() - // Mark as completed
  failPayment() - // Handle failures
  refundPayment() - // Process refund
  getPaymentStats(); // Host earnings
```

### ReviewService

```typescript
-createReview() - // Create review
  getReviews() - // Fetch reviews
  updateUserRating() - // Calculate ratings
  deleteReview(); // Delete with recount
```

## API Endpoints

### Vehicles

```
GET  /api/vehicles              # Search/list vehicles
POST /api/vehicles              # Create vehicle (auth required)
GET  /api/vehicles/[id]         # Get vehicle details
```

**Query Parameters:**

- `brand`, `model`, `minYear`, `maxYear`
- `transmission`, `fuelType`
- `minPrice`, `maxPrice`

### Bookings

```
GET  /api/bookings              # List bookings (auth required)
POST /api/bookings              # Create booking (auth required)
GET  /api/bookings/[id]         # Booking details
PATCH /api/bookings/[id]        # Update booking status
```

**Actions:**

- `status`: PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
- `cancel`: Cancel booking with reason

### Listings

```
GET  /api/listings              # Browse listings
POST /api/listings              # Create listing (auth required)
GET  /api/listings/[id]         # Listing details
PATCH /api/listings/[id]        # Update listing
```

### Reviews

```
GET  /api/reviews               # Fetch reviews
POST /api/reviews               # Create review (auth required)
```

### Payments

```
GET  /api/payments              # User's payments (auth required)
POST /api/payments              # Create payment (auth required)
```

## Authentication

### Middleware

```typescript
requireAuth(); // Verify user session
requireHost(); // HOST or ADMIN role
requireAdmin(); // ADMIN role only
```

Uses Better Auth with session-based authentication.

## Error Handling

Standardized API error responses:

```typescript
{
  success: false,
  error: {
    code: "VEHICLE_NOT_FOUND",
    message: "Vehicle not found",
    details: {...}
  },
  meta: {
    timestamp: "2024-12-09T...",
    path: "/api/vehicles/123"
  }
}
```

## Database Setup

### 1. Configure Database URL

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/vehicleshare"
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Create Migration

```bash
npx prisma migrate dev --name init
```

### 4. Seed Database

```bash
npx ts-node prisma/seed.ts
```

This creates:

- 1 admin user
- 3 host users
- 5 guest users
- 3 vehicles with listings

## Pricing & Calculation

### Booking Total = Subtotal + Tax + DeliveryCharge - Discount

```typescript
subtotal = pricePerDay * rentalDays
tax = subtotal * 0.1 (10%)
totalPrice = subtotal + tax + deliveryCharge
```

### Refund Policy

- 7+ days before: 100% refund
- 3-7 days before: 50% refund
- < 3 days: No refund

## Business Logic

### Vehicle Availability

- Checks for conflicting bookings
- Validates date ranges
- Blocks maintenance periods

### Booking Creation

- Validates guest/host/vehicle
- Calculates pricing
- Generates unique booking number
- Instant booking or requires approval

### Payment Processing

- Creates payment intent
- Handles Stripe integration
- Updates booking status on completion
- Processes refunds

### Rating System

- Recalculates on review add/delete
- Aggregate for host/guest
- Updates user profile

## Security

- Session-based authentication
- Role-based access control (RBAC)
- Input validation on all endpoints
- SQL injection prevention via Prisma
- Encrypted sensitive data fields

## Performance

- Indexed key fields (userId, status, dates)
- Efficient database queries
- Pagination support
- Caching ready

## Future Enhancements

- [ ] Real-time messaging with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Automated email notifications
- [ ] Insurance integration
- [ ] Multi-currency support
- [ ] Advanced fraud detection
- [ ] Rate limiting and DDoS protection
- [ ] API documentation (OpenAPI/Swagger)

## Development

```bash
# Start dev server
pnpm dev

# Type checking
pnpm type-check

# Lint
pnpm lint

# Run tests
pnpm test
```

## Testing

Services are designed to be testable with mock data. Each service has isolated dependencies and clear interfaces.

## Deployment

1. Set `DATABASE_URL` in production environment
2. Run migrations: `npx prisma migrate deploy`
3. Deploy Next.js application normally
4. Monitor API logs and error tracking (Sentry)
