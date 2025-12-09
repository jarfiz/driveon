import { NextRequest } from "next/server";
import { bookingService } from "@/server/services/booking.service";
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
    const booking = await bookingService.getBooking(id);
    return successResponse(booking);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to fetch booking"), 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, status, reason } = body;

    if (action === "cancel") {
      const booking = await bookingService.cancelBooking(id, reason);
      return successResponse(booking);
    }

    if (status) {
      const booking = await bookingService.updateBookingStatus(id, status);
      return successResponse(booking);
    }

    throw new ApiError("INVALID_ACTION", "Invalid action provided");
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to update booking"), 500);
  }
}
