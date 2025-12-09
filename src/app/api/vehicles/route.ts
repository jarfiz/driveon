import { NextRequest } from "next/server";
import { requireAuth } from "@/server/middleware/auth";
import { vehicleService } from "@/server/services/vehicle.service";
import {
  ApiError,
  errorResponse,
  successResponse,
} from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const brand = searchParams.get("brand");
    const model = searchParams.get("model");
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (brand || model || minPrice || maxPrice) {
      const vehicles = await vehicleService.searchVehicles({
        brand: brand || undefined,
        model: model || undefined,
        transmission: transmission || undefined,
        fuelType: fuelType || undefined,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      });

      return successResponse(vehicles);
    }

    const vehicles = await vehicleService.getVehicles({
      transmission: transmission || undefined,
      fuelType: fuelType || undefined,
    });

    return successResponse(vehicles);
  } catch (error) {
    return errorResponse(
      error instanceof ApiError ? error : new Error("Failed to fetch vehicles"),
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const vehicle = await vehicleService.createVehicle({
      ...body,
      hostId: user.id,
    });

    return successResponse(vehicle, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to create vehicle"), 500);
  }
}
