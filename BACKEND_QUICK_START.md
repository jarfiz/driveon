# Backend Quick Reference

## 🚀 Quick Start

### 1. Set Up Database

```bash
# Configure PostgreSQL
export DATABASE_URL="postgresql://user:password@localhost:5432/vehicleshare"

# Generate client and run migrations
npx prisma generate
npx prisma migrate dev --name init

# Seed with sample data
npx ts-node prisma/seed.ts
```

### 2. Start Dev Server

```bash
pnpm dev
# Server runs at http://localhost:3000
```

### 3. Test APIs

```bash
# Browse vehicles
curl http://localhost:3000/api/vehicles

# Create booking (requires auth)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{...}'
```

## 📍 API Endpoints Map

```
VEHICLES
  GET  /api/vehicles              List/search
  POST /api/vehicles              Create
  GET  /api/vehicles/[id]         Details

LISTINGS
  GET  /api/listings              Browse
  POST /api/listings              Create
  GET  /api/listings/[id]         Details
  PATCH /api/listings/[id]        Update

BOOKINGS
  GET  /api/bookings              List my bookings
  POST /api/bookings              Create booking
  GET  /api/bookings/[id]         Details
  PATCH /api/bookings/[id]        Update/cancel

PAYMENTS
  GET  /api/payments              History
  POST /api/payments              Create payment

REVIEWS
  GET  /api/reviews               Fetch reviews
  POST /api/reviews               Create review
```

## 💾 Service Classes

### BookingService

- `createBooking()` - Create with validation
- `getBooking()` - Fetch details
- `getBookings()` - List with filters
- `updateBookingStatus()` - Change status
- `cancelBooking()` - Cancel with refund

### VehicleService

- `createVehicle()` - Add vehicle
- `getVehicle()` - Details
- `getVehicles()` - List
- `searchVehicles()` - Search with filters
- `updateVehicle()` - Update
- `deleteVehicle()` - Delete

### ListingService

- `createListing()` - Create listing
- `getListing()` - Details
- `getListingsByHost()` - Host's listings
- `getAvailableListings()` - Browse
- `updateListing()` - Update
- `deactivateListing()` - Deactivate

### PaymentService

- `createPayment()` - Create
- `getPayment()` - Details
- `getPaymentsByUser()` - History
- `completePayment()` - Mark done
- `failPayment()` - Handle failure
- `refundPayment()` - Process refund
- `getPaymentStats()` - Earnings

### ReviewService

- `createReview()` - Create
- `getReviews()` - Fetch
- `updateUserRating()` - Recalculate
- `deleteReview()` - Delete

## 🔐 Authentication

```typescript
// In API routes
import {
  requireAdmin,
  requireAuth,
  requireHost,
} from "@/server/middleware/auth";

// Get current user
const user = await requireAuth(req);

// Check if host
const hostUser = await requireHost(req);

// Check if admin
const adminUser = await requireAdmin(req);
```

## 📝 Error Handling

```typescript
// All errors return standardized format
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable message",
    details: { /* optional */ }
  }
}

// Common error codes
UNAUTHORIZED          // 401 - No session
FORBIDDEN             // 403 - Insufficient permissions
VEHICLE_NOT_FOUND     // 404 - Vehicle missing
BOOKING_NOT_FOUND     // 404 - Booking missing
VEHICLE_NOT_AVAILABLE // 400 - Dates conflict
CANNOT_CANCEL         // 400 - Invalid state
```

## 💰 Pricing Logic

```
BOOKING TOTAL = Subtotal + Tax + Delivery - Discount

subtotal = pricePerDay × rentalDays
tax = subtotal × 10%
totalPrice = subtotal + tax + deliveryCharge
```

## 🔄 Booking Status Flow

```
PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
       ↓
     CANCELLED
       ↓
     REJECTED (host rejects)
```

## 💳 Refund Policy

```
Days until rental  →  Refund %
≥ 7 days          →  100%
3-7 days          →  50%
< 3 days          →  0%
```

## 📊 Database Schema (Quick)

**User** - Auth + profiles (ADMIN, HOST, USER)
**Vehicle** - Vehicle catalog with features
**Listing** - Rental listing with pricing
**Booking** - Rental bookings + pricing breakdown
**Payment** - Payments + Stripe integration
**Review** - Ratings (1-5 stars)
**Insurance** - Coverage options
**Message** - P2P messaging
**Wallet** - Host balance
**SupportTicket** - Customer support

## 🔍 Common Queries

### Search vehicles by price range

```typescript
await vehicleService.searchVehicles({
  minPrice: 50,
  maxPrice: 150,
  transmission: "Automatic",
});
```

### Get user's bookings

```typescript
await bookingService.getBookings(
  {
    guestId: userId,
  },
  { skip: 0, take: 20 },
);
```

### Get host's earnings

```typescript
await paymentService.getPaymentStats(hostId);
```

### Get vehicle reviews

```typescript
await reviewService.getReviews({
  vehicleId: vehicleId,
  type: "VEHICLE",
});
```

## ⚙️ Key Files

| File                            | Purpose             |
| ------------------------------- | ------------------- |
| `src/server/db.ts`              | Prisma singleton    |
| `src/server/services/`          | Business logic      |
| `src/server/middleware/auth.ts` | Auth guards         |
| `src/server/utils/response.ts`  | Response formatting |
| `prisma/schema.prisma`          | Data model          |
| `prisma/seed.ts`                | Sample data         |

## 🧪 Test Users (After Seed)

| User      | Email                       | Role  |
| --------- | --------------------------- | ----- |
| Admin     | admin@vehicleshare.com      | ADMIN |
| Host 1    | host1@vehicleshare.com      | HOST  |
| Host 2    | host2@vehicleshare.com      | HOST  |
| Host 3    | host3@vehicleshare.com      | HOST  |
| Guest 1-5 | guest{1-5}@vehicleshare.com | USER  |

## 📚 Documentation

- **BACKEND_IMPLEMENTATION.md** - Complete guide
- **API_USAGE_EXAMPLES.md** - Code examples
- **BACKEND_SUMMARY.md** - Overview

## 🚨 Important Notes

1. **Dates** - Use ISO 8601 format (2024-12-20T10:00:00Z)
2. **Pricing** - Stored as Decimal for accuracy
3. **Pagination** - Default 20 items, supports skip/take
4. **Async** - All services are async (use await)
5. **Transactions** - Booking creation includes pricing calculation
6. **Validation** - Input validated at service layer

## 🔧 Development Tips

### View database

```bash
npx prisma studio
```

### Check schema

```bash
npx prisma generate
```

### Reset database

```bash
npx prisma migrate reset
```

### Generate new migration

```bash
npx prisma migrate dev --name feature_name
```

## 🎯 Next Implementation

After backend setup:

1. Connect frontend to API routes
2. Implement payment flow with Stripe
3. Add email notifications
4. Set up real-time messaging (WebSockets)
5. Create admin dashboard
6. Add analytics
7. Set up monitoring (Sentry)

---

**Everything is ready to deploy and integrate with your frontend!**
