// API Usage Examples for VehicleShare Backend

// ============================================================================
// VEHICLES API
// ============================================================================

// List all vehicles
fetch('/api/vehicles')
.then(r => r.json())
.then(data => console.log(data.data));

// Search vehicles with filters
fetch('/api/vehicles?brand=Toyota&minPrice=40&maxPrice=100&transmission=Automatic')
.then(r => r.json())
.then(data => console.log(data.data));

// Create a new vehicle (Host only)
fetch('/api/vehicles', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
brand: 'Mercedes',
model: 'C-Class',
year: 2023,
licensePlate: 'MB2023001',
color: 'White',
transmission: 'Automatic',
fuelType: 'Petrol',
description: 'Luxury sedan perfect for business trips',
features: ['Leather Seats', 'GPS', 'Panoramic Roof'],
images: ['https://example.com/image1.jpg']
})
})
.then(r => r.json())
.then(data => console.log(data.data));

// Get vehicle details
fetch('/api/vehicles/vehicle-id-123')
.then(r => r.json())
.then(data => console.log(data.data));

// ============================================================================
// LISTINGS API
// ============================================================================

// Browse available listings
fetch('/api/listings?minPrice=50&maxPrice=150')
.then(r => r.json())
.then(data => console.log(data.data));

// Create a listing for a vehicle (Host only)
fetch('/api/listings', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
vehicleId: 'vehicle-id-123',
pricePerDay: 75,
depositAmount: 750,
deliveryCharge: 50,
minRentalDays: 1,
maxRentalDays: 365,
allowInstantBooking: true,
requireApproval: false,
allowPets: true,
allowSmoking: false
})
})
.then(r => r.json())
.then(data => console.log(data.data));

// Get listing details with reviews
fetch('/api/listings/listing-id-123')
.then(r => r.json())
.then(data => console.log(data.data));

// ============================================================================
// BOOKINGS API
// ============================================================================

// List my bookings (as guest)
fetch('/api/bookings')
.then(r => r.json())
.then(data => console.log(data.data));

// List my bookings (as host)
fetch('/api/bookings?role=host')
.then(r => r.json())
.then(data => console.log(data.data));

// Filter by status
fetch('/api/bookings?status=CONFIRMED')
.then(r => r.json())
.then(data => console.log(data.data));

// Create a new booking
fetch('/api/bookings', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
vehicleId: 'vehicle-id-123',
startDate: '2024-12-20T10:00:00Z',
endDate: '2024-12-25T10:00:00Z',
pickupLocation: 'Jakarta Airport',
dropoffLocation: 'Jakarta Downtown Hotel',
specialRequests: 'Please deliver to hotel'
})
})
.then(r => r.json())
.then(data => console.log(data.data));

// Get booking details
fetch('/api/bookings/booking-id-123')
.then(r => r.json())
.then(data => console.log(data.data));

// Confirm booking (Host)
fetch('/api/bookings/booking-id-123', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
status: 'CONFIRMED'
})
})
.then(r => r.json())
.then(data => console.log(data.data));

// Cancel booking with refund
fetch('/api/bookings/booking-id-123', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
action: 'cancel',
reason: 'Guest emergency'
})
})
.then(r => r.json())
.then(data => console.log(data.data));

// ============================================================================
// PAYMENTS API
// ============================================================================

// Get payment history
fetch('/api/payments')
.then(r => r.json())
.then(data => console.log(data.data));

// Create payment for booking
fetch('/api/payments', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
bookingId: 'booking-id-123',
amount: 525.50,
method: 'CARD',
cardDetails: {
last4: '4242',
brand: 'Visa',
expiryMonth: 12,
expiryYear: 2025
}
})
})
.then(r => r.json())
.then(data => console.log(data.data));

// ============================================================================
// REVIEWS API
// ============================================================================

// Get reviews for a vehicle
fetch('/api/reviews?vehicleId=vehicle-id-123')
.then(r => r.json())
.then(data => console.log(data.data));

// Get reviews for a host
fetch('/api/reviews?reviewedId=user-id-123&type=HOST')
.then(r => r.json())
.then(data => console.log(data.data));

// Create a review
fetch('/api/reviews', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
reviewedId: 'host-id-123',
bookingId: 'booking-id-123',
vehicleId: 'vehicle-id-123',
title: 'Great vehicle and smooth rental experience',
comment: 'The car was clean, well-maintained, and the host was very responsive. Would rent again!',
rating: 5,
type: 'HOST'
})
})
.then(r => r.json())
.then(data => console.log(data.data));

// ============================================================================
// ERROR HANDLING
// ============================================================================

// Proper error handling
async function apiCall(endpoint, options = {}) {
try {
const response = await fetch(endpoint, options);
const data = await response.json();

    if (!data.success) {
      console.error('API Error:', {
        code: data.error.code,
        message: data.error.message,
        details: data.error.details
      });
      return null;
    }

    return data.data;

} catch (error) {
console.error('Network error:', error);
return null;
}
}

// Usage
const vehicles = await apiCall('/api/vehicles');
const newBooking = await apiCall('/api/bookings', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({...})
});

// ============================================================================
// TYPESCRIPT TYPES (for frontend integration)
// ============================================================================

interface Vehicle {
id: string;
brand: string;
model: string;
year: number;
licensePlate: string;
color: string;
transmission: string;
fuelType: string;
description?: string;
features: string[];
images: string[];
status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'ARCHIVED';
hostId: string;
createdAt: string;
}

interface Listing {
id: string;
vehicleId: string;
hostId: string;
pricePerDay: number;
depositAmount: number;
deliveryCharge: number;
minRentalDays: number;
maxRentalDays?: number;
allowInstantBooking: boolean;
allowPets: boolean;
allowSmoking: boolean;
isActive: boolean;
vehicle?: Vehicle;
}

interface Booking {
id: string;
bookingNumber: string;
guestId: string;
vehicleId: string;
hostId: string;
startDate: string;
endDate: string;
rentalDays: number;
status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
totalPrice: number;
dailyRate: number;
depositAmount: number;
pickupLocation: string;
dropoffLocation?: string;
specialRequests?: string;
createdAt: string;
}

interface Payment {
id: string;
bookingId: string;
userId: string;
amount: number;
status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
method: 'CARD' | 'BANK_TRANSFER' | 'DIGITAL_WALLET';
receiptNumber: string;
createdAt: string;
}

interface Review {
id: string;
title: string;
comment: string;
rating: number; // 1-5
type: 'HOST' | 'GUEST' | 'VEHICLE';
reviewerId: string;
reviewer: { id: string; name: string; image?: string };
createdAt: string;
}

// ============================================================================
// REACT HOOKS EXAMPLES
// ============================================================================

// useVehicles.ts
import { useEffect, useState } from 'react';

export function useVehicles(filters?: any) {
const [vehicles, setVehicles] = useState<Vehicle[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const params = new URLSearchParams(filters);
fetch(`/api/vehicles?${params}`)
.then(r => r.json())
.then(data => {
setVehicles(data.data);
setLoading(false);
});
}, [filters]);

return { vehicles, loading };
}

// useBooking.ts
export function useBooking(bookingId: string) {
const [booking, setBooking] = useState<Booking | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch(`/api/bookings/${bookingId}`)
.then(r => r.json())
.then(data => {
setBooking(data.data);
setLoading(false);
});
}, [bookingId]);

return { booking, loading };
}

// Usage in components
function VehicleListPage() {
const { vehicles, loading } = useVehicles({ minPrice: 50, maxPrice: 150 });

if (loading) return <div>Loading...</div>;

return (
<div>
{vehicles.map(v => (
<div key={v.id}>
<h3>{v.brand} {v.model}</h3>
<p>${v.listing?.pricePerDay}/day</p>
</div>
))}
</div>
);
}
