import { NextRequest } from "next/server";
import { requireAuth } from "@/server/middleware/auth";
import { reviewService } from "@/server/services/review.service";
import {
  ApiError,
  errorResponse,
  successResponse,
} from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reviewedId = searchParams.get("reviewedId");
    const vehicleId = searchParams.get("vehicleId");
    const type = searchParams.get("type");

    const reviews = await reviewService.getReviews({
      reviewedId: reviewedId || undefined,
      vehicleId: vehicleId || undefined,
      type: type || undefined,
    });

    return successResponse(reviews);
  } catch (error) {
    return errorResponse(new Error("Failed to fetch reviews"));
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const review = await reviewService.createReview({
      ...body,
      reviewerId: user.id,
    });

    return successResponse(review, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to create review"), 500);
  }
}
