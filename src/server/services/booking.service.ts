import { Decimal } from "@prisma/client/runtime/library";
import db from "@/server/db";
import { ApiError } from "@/server/utils/response";

// Simple date utility functions
function differenceInDays(endDate: Date, startDate: Date): number {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  return Math.ceil((endDate.getTime() - startDate.getTime()) / ONE_DAY);
}

export class BookingService {
  async createBooking(data: {
    guestId: string;
    vehicleId: string;
    startDate: Date;
    endDate: Date;
    pickupLocation: string;
    dropoffLocation?: string;
    specialRequests?: string;
  }) {
    const { guestId, vehicleId, startDate, endDate } = data;

    // Validate dates
    if (startDate >= endDate) {
      throw new ApiError("INVALID_DATES", "End date must be after start date");
    }

    // Check vehicle availability
    const conflictingBooking = await db.booking.findFirst({
      where: {
        vehicleId,
        status: {
          in: ["PENDING", "CONFIRMED", "IN_PROGRESS"],
        },
        OR: [
          {
            startDate: { lt: endDate },
            endDate: { gt: startDate },
          },
        ],
      },
    });

    if (conflictingBooking) {
      throw new ApiError(
        "VEHICLE_NOT_AVAILABLE",
        "Vehicle is not available for selected dates",
      );
    }

    // Get listing for pricing
    const listing = await db.listing.findUnique({
      where: { vehicleId },
      include: { vehicle: true },
    });

    if (!listing) {
      throw new ApiError("LISTING_NOT_FOUND", "Vehicle listing not found");
    }

    // Calculate pricing
    const rentalDays = differenceInDays(endDate, startDate);
    const subtotal = listing.pricePerDay.toNumber() * rentalDays;
    const taxAmount = subtotal * 0.1; // 10% tax
    const deliveryCharge = listing.deliveryCharge.toNumber();
    const totalPrice = subtotal + taxAmount + deliveryCharge;

    // Create booking
    const bookingNumber = `BK-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    const booking = await db.booking.create({
      data: {
        bookingNumber,
        guestId,
        vehicleId,
        hostId: listing.hostId,
        startDate,
        endDate,
        rentalDays,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation || data.pickupLocation,
        specialRequests: data.specialRequests,
        dailyRate: listing.pricePerDay,
        subtotal: new Decimal(subtotal),
        depositAmount: listing.depositAmount,
        taxAmount: new Decimal(taxAmount),
        deliveryCharge: listing.deliveryCharge,
        totalPrice: new Decimal(totalPrice),
        status: listing.allowInstantBooking ? "CONFIRMED" : "PENDING",
      },
      include: {
        guest: true,
        vehicle: true,
        host: true,
      },
    });

    return booking;
  }

  async getBooking(id: string) {
    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        guest: true,
        vehicle: true,
        host: true,
        payment: true,
        insuranceSelected: true,
      },
    });

    if (!booking) {
      throw new ApiError("BOOKING_NOT_FOUND", "Booking not found", 404);
    }

    return booking;
  }

  async getBookings(
    filters: {
      guestId?: string;
      hostId?: string;
      status?: string;
      vehicleId?: string;
    },
    options: { skip?: number; take?: number } = {},
  ) {
    return db.booking.findMany({
      where: filters,
      include: {
        guest: true,
        vehicle: true,
        host: true,
        payment: true,
      },
      skip: options.skip || 0,
      take: options.take || 20,
      orderBy: { createdAt: "desc" },
    });
  }

  async updateBookingStatus(id: string, status: string) {
    const booking = await db.booking.update({
      where: { id },
      data: { status },
      include: {
        guest: true,
        vehicle: true,
        host: true,
      },
    });

    return booking;
  }

  async cancelBooking(id: string, reason: string) {
    const booking = await this.getBooking(id);

    if (!["PENDING", "CONFIRMED"].includes(booking.status)) {
      throw new ApiError(
        "CANNOT_CANCEL",
        "Booking cannot be cancelled in its current status",
      );
    }

    // Calculate refund (simplified logic)
    const now = new Date();
    const daysUntilStart = differenceInDays(booking.startDate, now);
    let refundPercentage = 1.0;

    if (daysUntilStart < 7) refundPercentage = 0.5;
    if (daysUntilStart < 3) refundPercentage = 0;

    const refundAmount = booking.totalPrice.toNumber() * refundPercentage;

    return db.booking.update({
      where: { id },
      data: {
        status: "CANCELLED",
        cancelledAt: now,
        cancellationReason: reason,
        cancellationRefund: new Decimal(refundAmount),
      },
      include: {
        guest: true,
        vehicle: true,
        host: true,
      },
    });
  }
}

export const bookingService = new BookingService();
