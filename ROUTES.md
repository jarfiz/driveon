# 🗺️ VehicleShare Routes & Pages Documentation

Complete guide to all implemented routes and pages in the VehicleShare platform.

---

## 📋 Route Structure Overview

```
src/app/
├── (auth)/
│   ├── forgot-password/
│   ├── sign-in/
│   ├── sign-up/
│   └── layout.tsx
├── (main)/
│   ├── page.tsx                          # Home page
│   ├── layout.tsx                        # Main layout with navbar & footer
│   ├── dashboard/                        # User dashboard
│   ├── profile/                          # User profile management
│   ├── settings/                         # User settings
│   ├── bookings/                         # My bookings list
│   │   └── [id]/                         # Booking details
│   ├── messages/                         # Messaging system
│   ├── vehicles/                         # Browse vehicles
│   │   ├── page.tsx                      # Main vehicle browse page
│   │   └── [type]/                       # Vehicle type listing
│   │       ├── page.tsx                  # Vehicle type list (cars, bikes, etc.)
│   │       └── [id]/                     # Vehicle details
│   │           └── page.tsx
│   ├── checkout/                         # Booking checkout
│   ├── booking-confirmation/             # Confirmation after booking
│   ├── host/                             # Host dashboard
│   │   ├── page.tsx                      # Host overview
│   │   ├── list-vehicle/                 # List new vehicle
│   │   │   └── page.tsx
│   │   ├── edit-vehicle/                 # Edit vehicle
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── vehicle-analytics/            # Vehicle analytics
│   │       └── [id]/
│   │           └── page.tsx
│   ├── help/                             # Help & support
│   └── api/
└── globals.css
```

---

## 🏠 Public Routes (No Authentication Required)

### Home Page

- **Route**: `/`
- **File**: `src/app/(main)/page.tsx`
- **Description**: Landing page with hero section, featured vehicles, and vehicle type selector
- **Features**: Hero, search, stats, featured listings

### Vehicle Browse

- **Route**: `/vehicles`
- **File**: `src/app/(main)/vehicles/page.tsx`
- **Description**: Main vehicle browsing page with type selection
- **Features**: Vehicle type cards, quick access to categories

### Vehicle Type List

- **Route**: `/vehicles/[type]` (e.g., `/vehicles/cars`)
- **File**: `src/app/(main)/vehicles/[type]/page.tsx`
- **Description**: Browse vehicles by type (cars, motorcycles, boats, RVs, etc.)
- **Features**: Filtering, sorting, grid view, pricing display
- **Supported Types**: cars, motorcycles, trucks, vans, suv, boats, rv

### Vehicle Details

- **Route**: `/vehicles/[type]/[id]` (e.g., `/vehicles/cars/1`)
- **File**: `src/app/(main)/vehicles/[type]/[id]/page.tsx`
- **Description**: Detailed vehicle page with photos, specs, reviews, and booking widget
- **Features**: Gallery, specifications, host info, reviews, booking sidebar, pricing breakdown

### Checkout

- **Route**: `/checkout`
- **File**: `src/app/(main)/checkout/page.tsx`
- **Description**: Vehicle booking checkout page
- **Features**: Contact info, insurance options, services, payment summary

### Booking Confirmation

- **Route**: `/booking-confirmation`
- **File**: `src/app/(main)/booking-confirmation/page.tsx`
- **Description**: Confirmation page after successful booking
- **Features**: Reference number, booking summary, next steps, invoice download

### Help & Support

- **Route**: `/help`
- **File**: `src/app/(main)/help/page.tsx`
- **Description**: Help center with FAQs and support options
- **Features**: Search, contact options, FAQ sections, support channels

---

## 👤 Authenticated Routes (User)

### Dashboard

- **Route**: `/dashboard`
- **File**: `src/app/(main)/dashboard/page.tsx`
- **Description**: User dashboard with stats and quick actions
- **Features**: Stats cards, recent bookings, quick actions

### Profile

- **Route**: `/profile`
- **File**: `src/app/(main)/profile/page.tsx`
- **Description**: User profile management
- **Features**: Avatar upload, personal info edit, rating display, bio management

### Settings

- **Route**: `/settings`
- **File**: `src/app/(main)/settings/page.tsx`
- **Description**: User account settings and preferences
- **Features**: Notifications, privacy & security, appearance, language, account management

### My Bookings

- **Route**: `/bookings`
- **File**: `src/app/(main)/bookings/page.tsx`
- **Description**: List of all user bookings
- **Features**: Status filters, booking cards, action buttons

### Booking Details

- **Route**: `/bookings/[id]`
- **File**: `src/app/(main)/bookings/[id]/page.tsx`
- **Description**: Detailed view of a single booking
- **Features**: Vehicle info, dates, pricing, host info, cancellation options, status timeline

### Messages

- **Route**: `/messages`
- **File**: `src/app/(main)/messages/page.tsx`
- **Description**: Messaging system between users and hosts
- **Features**: Conversation list, chat interface, file sharing, online status

---

## 🏢 Host Routes (Renter Account)

### Host Dashboard

- **Route**: `/host`
- **File**: `src/app/(main)/host/page.tsx`
- **Description**: Host overview and vehicle management
- **Features**: Stats (earnings, bookings, rating), vehicle list, quick actions

### List New Vehicle

- **Route**: `/host/list-vehicle`
- **File**: `src/app/(main)/host/list-vehicle/page.tsx`
- **Description**: Form to list a new vehicle
- **Features**: Vehicle type, brand, model, pricing, description, photos, features, rules

### Edit Vehicle

- **Route**: `/host/edit-vehicle/[id]`
- **File**: `src/app/(main)/host/edit-vehicle/[id]/page.tsx`
- **Description**: Edit existing vehicle listing
- **Features**: All listing fields editable, pricing update, feature toggles

### Vehicle Analytics

- **Route**: `/host/vehicle-analytics/[id]`
- **File**: `src/app/(main)/host/vehicle-analytics/[id]/page.tsx`
- **Description**: Performance analytics for a listed vehicle
- **Features**: Key metrics, guest reviews, booking trends, monthly breakdown, earnings

---

## 🔐 Authentication Routes

### Sign In

- **Route**: `/sign-in`
- **File**: `src/app/(auth)/sign-in/page.tsx`
- **Description**: User login page
- **Features**: Email/password, OAuth login, signup link

### Sign Up

- **Route**: `/sign-up`
- **File**: `src/app/(auth)/sign-up/page.tsx`
- **Description**: New user registration
- **Features**: Email/password form, validation, OAuth signup

### Forgot Password

- **Route**: `/forgot-password`
- **File**: `src/app/(auth)/forgot-password/page.tsx`
- **Description**: Password recovery flow
- **Features**: Email input, recovery link

---

## 🔄 Dynamic Route Parameters

### Vehicle Type Parameter (`[type]`)

Used in vehicle browsing routes to filter by vehicle type.

**Valid Values:**

- `cars` - Cars and sedans
- `motorcycles` - Motorcycles and bikes
- `trucks` - Trucks and commercial vehicles
- `vans` - Vans and minivans
- `suv` - SUV and cross-overs
- `boats` - Boats and watercraft
- `rv` - RVs and motorhomes

### ID Parameters (`[id]`)

Used in detail and edit routes to identify specific resources.

**Examples:**

- `/vehicles/cars/1` - Car with ID 1
- `/bookings/123` - Booking with ID 123
- `/host/edit-vehicle/456` - Vehicle with ID 456

---

## 🎯 Key Features by Route

| Route                          | Authenticated | Mobile | Features                           |
| ------------------------------ | ------------- | ------ | ---------------------------------- |
| `/`                            | ❌            | ✅     | Hero, search, types, featured      |
| `/vehicles`                    | ❌            | ✅     | Type selector, browse              |
| `/vehicles/[type]`             | ❌            | ✅     | Filter, sort, list, pricing        |
| `/vehicles/[type]/[id]`        | ❌            | ✅     | Gallery, specs, reviews, book      |
| `/checkout`                    | ✅            | ✅     | Contact, insurance, summary        |
| `/booking-confirmation`        | ✅            | ✅     | Reference, summary, actions        |
| `/dashboard`                   | ✅            | ✅     | Stats, bookings, actions           |
| `/profile`                     | ✅            | ✅     | Avatar, info, rating               |
| `/settings`                    | ✅            | ✅     | Notifications, privacy, appearance |
| `/bookings`                    | ✅            | ✅     | List, filter, status               |
| `/bookings/[id]`               | ✅            | ✅     | Details, pricing, actions          |
| `/messages`                    | ✅            | ✅     | Chat, conversations, files         |
| `/host`                        | ✅            | ✅     | Stats, vehicles, management        |
| `/host/list-vehicle`           | ✅            | ✅     | Form, photos, features             |
| `/host/edit-vehicle/[id]`      | ✅            | ✅     | Form, update, features             |
| `/host/vehicle-analytics/[id]` | ✅            | ✅     | Metrics, reviews, earnings         |
| `/help`                        | ❌            | ✅     | FAQ, search, support               |

---

## 🔗 Navigation Links

### Main Navigation (Navbar)

- Home: `/`
- Browse: `/vehicles`
- Dashboard: `/dashboard` (logged in)
- Profile: `/profile` (logged in)
- Settings: `/settings` (logged in)
- Host: `/host` (logged in)
- Messages: `/messages` (logged in)

### Footer Links

- Home, Browse, Dashboard, Help, Privacy Policy, Terms of Service

---

## 📱 Responsive Design

All routes are fully responsive and optimized for:

- **Mobile**: `sm:` breakpoint (640px)
- **Tablet**: `md:` breakpoint (768px)
- **Desktop**: `lg:` breakpoint (1024px)

---

## 🔒 Authentication Flow

```
Non-Authenticated User
    ↓
/sign-in or /sign-up
    ↓
Dashboard (/dashboard)
    ↓
Browse Vehicles (/vehicles/[type])
    ↓
Vehicle Details (/vehicles/[type]/[id])
    ↓
Checkout (/checkout)
    ↓
Booking Confirmation (/booking-confirmation)
    ↓
My Bookings (/bookings)
    ↓
Booking Details (/bookings/[id])

Host Flow
    ↓
Host Dashboard (/host)
    ↓
List Vehicle (/host/list-vehicle)
    ↓
Edit Vehicle (/host/edit-vehicle/[id])
    ↓
Analytics (/host/vehicle-analytics/[id])
```

---

## 📊 Route Statistics

- **Total Routes**: 20+ dynamic routes
- **Public Routes**: 7
- **Authenticated Routes**: 13
- **Dynamic Parameters**: 3 types
- **Mobile Responsive**: All routes (100%)

---

## 🚀 Coming Soon Features

- Invoice generation and download
- Advanced search and filtering
- Review and rating system
- Payment gateway integration
- Notification center
- Real-time tracking
- Document verification
- Insurance selection UI
- Multi-language support
- Advanced analytics dashboard

---

_Last Updated: December 5, 2025_
_Platform: VehicleShare - Peer-to-Peer Vehicle Rental & Leasing_
