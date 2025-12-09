import { NextRequest } from "next/server";
import { requireAuth } from "@/server/middleware/auth";
import { listingService } from "@/server/services/listing.service";
import {
  ApiError,
  errorResponse,
  successResponse,
} from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");

    const listings = await listingService.getAvailableListings({
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      transmission: transmission || undefined,
      fuelType: fuelType || undefined,
    });

    return successResponse(listings);
  } catch (error) {
    return errorResponse(new Error("Failed to fetch listings"));
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const listing = await listingService.createListing({
      ...body,
      hostId: user.id,
    });

    return successResponse(listing, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to create listing"), 500);
  }
}
