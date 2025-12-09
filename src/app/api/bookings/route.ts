import { NextRequest } from "next/server";
import { requireAuth } from "@/server/middleware/auth";
import { bookingService } from "@/server/services/booking.service";
import {
  ApiError,
  errorResponse,
  successResponse,
} from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const role = searchParams.get("role") || "guest";

    const filters: any = {
      ...(status && { status }),
      ...(role === "host" ? { hostId: user.id } : { guestId: user.id }),
    };

    const bookings = await bookingService.getBookings(filters, {
      skip: 0,
      take: 20,
    });

    return successResponse(bookings);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to fetch bookings"), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const booking = await bookingService.createBooking({
      ...body,
      guestId: user.id,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    });

    return successResponse(booking, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to create booking"), 500);
  }
}
