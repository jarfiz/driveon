import { Decimal } from "@prisma/client/runtime/library";
import db from "@/server/db";
import { ApiError } from "@/server/utils/response";

export class ListingService {
  async createListing(data: {
    vehicleId: string;
    hostId: string;
    pricePerDay: number;
    depositAmount: number;
    deliveryCharge?: number;
    minRentalDays?: number;
    maxRentalDays?: number;
    allowInstantBooking?: boolean;
    requireApproval?: boolean;
    allowPets?: boolean;
    allowSmoking?: boolean;
  }) {
    // Check if listing already exists
    const existing = await db.listing.findUnique({
      where: { vehicleId: data.vehicleId },
    });

    if (existing) {
      throw new ApiError(
        "LISTING_EXISTS",
        "Vehicle already has an active listing",
      );
    }

    const listing = await db.listing.create({
      data: {
        vehicleId: data.vehicleId,
        hostId: data.hostId,
        pricePerDay: new Decimal(data.pricePerDay),
        depositAmount: new Decimal(data.depositAmount),
        deliveryCharge: new Decimal(data.deliveryCharge || 0),
        minRentalDays: data.minRentalDays || 1,
        maxRentalDays: data.maxRentalDays,
        allowInstantBooking: data.allowInstantBooking !== false,
        requireApproval: data.requireApproval || false,
        allowPets: data.allowPets || false,
        allowSmoking: data.allowSmoking || false,
        isActive: true,
      },
      include: { vehicle: true },
    });

    return listing;
  }

  async getListing(id: string) {
    const listing = await db.listing.findUnique({
      where: { id },
      include: {
        vehicle: {
          include: {
            reviews: true,
            _count: {
              select: { bookings: true },
            },
          },
        },
        host: {
          select: {
            id: true,
            name: true,
            image: true,
            hostRating: true,
            hostReviews: true,
          },
        },
      },
    });

    if (!listing) {
      throw new ApiError("LISTING_NOT_FOUND", "Listing not found", 404);
    }

    return listing;
  }

  async getListingsByHost(hostId: string) {
    return db.listing.findMany({
      where: { hostId, isActive: true },
      include: {
        vehicle: {
          include: {
            _count: {
              select: { bookings: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAvailableListings(filters?: {
    minPrice?: number;
    maxPrice?: number;
    transmission?: string;
    fuelType?: string;
  }) {
    return db.listing.findMany({
      where: {
        isActive: true,
        ...(filters?.minPrice && {
          pricePerDay: { gte: new Decimal(filters.minPrice) },
        }),
        ...(filters?.maxPrice && {
          pricePerDay: { lte: new Decimal(filters.maxPrice) },
        }),
        ...(filters?.transmission && {
          vehicle: { transmission: filters.transmission },
        }),
        ...(filters?.fuelType && {
          vehicle: { fuelType: filters.fuelType },
        }),
      },
      include: {
        vehicle: {
          include: {
            reviews: true,
            _count: {
              select: { bookings: true },
            },
          },
        },
        host: {
          select: {
            id: true,
            name: true,
            image: true,
            hostRating: true,
          },
        },
      },
      take: 50,
    });
  }

  async updateListing(
    id: string,
    data: Partial<Parameters<typeof db.listing.update>[0]["data"]>,
  ) {
    const listing = await db.listing.update({
      where: { id },
      data,
      include: { vehicle: true },
    });

    return listing;
  }

  async deactivateListing(id: string) {
    return db.listing.update({
      where: { id },
      data: { isActive: false },
    });
  }
}

export const listingService = new ListingService();
