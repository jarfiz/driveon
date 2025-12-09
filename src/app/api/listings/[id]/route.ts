import { NextRequest } from "next/server";
import { listingService } from "@/server/services/listing.service";
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
    const listing = await listingService.getListing(id);
    return successResponse(listing);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to fetch listing"), 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const listing = await listingService.updateListing(id, body);
    return successResponse(listing);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to update listing"), 500);
  }
}
