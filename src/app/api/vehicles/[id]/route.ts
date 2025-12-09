import { NextRequest } from "next/server";
import { vehicleService } from "@/server/services/vehicle.service";
import {
  ApiError,
  errorResponse,
  successResponse,
} from "@/server/utils/response";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const vehicle = await vehicleService.getVehicle(id);
    return successResponse(vehicle);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to fetch vehicle"), 500);
  }
}
