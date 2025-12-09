import { Decimal } from "@prisma/client/runtime/library";
import db from "@/server/db";
import { ApiError } from "@/server/utils/response";

export class VehicleService {
  async createVehicle(data: {
    hostId: string;
    brand: string;
    model: string;
    year: number;
    licensePlate: string;
    color: string;
    transmission: string;
    fuelType: string;
    description?: string;
    features?: string[];
    images?: string[];
  }) {
    // Check if license plate is unique
    const existing = await db.vehicle.findUnique({
      where: { licensePlate: data.licensePlate },
    });

    if (existing) {
      throw new ApiError(
        "LICENSE_PLATE_EXISTS",
        "Vehicle with this license plate already exists",
      );
    }

    const vehicle = await db.vehicle.create({
      data: {
        brand: data.brand,
        model: data.model,
        year: data.year,
        licensePlate: data.licensePlate,
        color: data.color,
        transmission: data.transmission,
        fuelType: data.fuelType,
        description: data.description,
        features: data.features || [],
        images: data.images || [],
        hostId: data.hostId,
        status: "ACTIVE",
      },
    });

    return vehicle;
  }

  async getVehicle(id: string) {
    const vehicle = await db.vehicle.findUnique({
      where: { id },
      include: {
        listing: true,
        reviews: {
          include: {
            reviewer: true,
          },
        },
      },
    });

    if (!vehicle) {
      throw new ApiError("VEHICLE_NOT_FOUND", "Vehicle not found", 404);
    }

    return vehicle;
  }

  async getVehicles(
    filters: {
      hostId?: string;
      status?: string;
      fuelType?: string;
      transmission?: string;
    } = {},
  ) {
    return db.vehicle.findMany({
      where: {
        ...(filters.hostId && { hostId: filters.hostId }),
        ...(filters.status && { status: filters.status }),
        ...(filters.fuelType && { fuelType: filters.fuelType }),
        ...(filters.transmission && { transmission: filters.transmission }),
      },
      include: {
        listing: true,
        host: {
          select: {
            id: true,
            name: true,
            image: true,
            hostRating: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async searchVehicles(query: {
    brand?: string;
    model?: string;
    minYear?: number;
    maxYear?: number;
    fuelType?: string;
    transmission?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const {
      brand,
      model,
      minYear,
      maxYear,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
    } = query;

    return db.vehicle.findMany({
      where: {
        status: "ACTIVE",
        ...(brand && {
          brand: { contains: brand, mode: "insensitive" },
        }),
        ...(model && {
          model: { contains: model, mode: "insensitive" },
        }),
        ...(minYear && { year: { gte: minYear } }),
        ...(maxYear && { year: { lte: maxYear } }),
        ...(fuelType && { fuelType }),
        ...(transmission && { transmission }),
        ...((minPrice || maxPrice) && {
          listing: {
            is: {
              ...(minPrice && {
                pricePerDay: { gte: new Decimal(minPrice) },
              }),
              ...(maxPrice && {
                pricePerDay: { lte: new Decimal(maxPrice) },
              }),
            },
          },
        }),
      },
      include: {
        listing: true,
        host: {
          select: {
            id: true,
            name: true,
            image: true,
            hostRating: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
      take: 50,
    });
  }

  async updateVehicle(
    id: string,
    data: Partial<Parameters<typeof db.vehicle.update>[0]["data"]>,
  ) {
    const vehicle = await db.vehicle.update({
      where: { id },
      data,
      include: { listing: true },
    });

    return vehicle;
  }

  async deleteVehicle(id: string) {
    const vehicle = await db.vehicle.findUnique({
      where: { id },
      include: {
        bookings: {
          where: {
            status: { in: ["PENDING", "CONFIRMED", "IN_PROGRESS"] },
          },
        },
      },
    });

    if (!vehicle) {
      throw new ApiError("VEHICLE_NOT_FOUND", "Vehicle not found", 404);
    }

    if (vehicle.bookings.length > 0) {
      throw new ApiError(
        "ACTIVE_BOOKINGS",
        "Cannot delete vehicle with active bookings",
      );
    }

    return db.vehicle.delete({ where: { id } });
  }
}

export const vehicleService = new VehicleService();
