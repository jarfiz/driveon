import { NextRequest } from "next/server";
import { requireAuth } from "@/server/middleware/auth";
import { paymentService } from "@/server/services/payment.service";
import {
  ApiError,
  errorResponse,
  successResponse,
} from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const payments = await paymentService.getPaymentsByUser(user.id);
    return successResponse(payments);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to fetch payments"), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const payment = await paymentService.createPayment({
      ...body,
      userId: user.id,
    });

    return successResponse(payment, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error, error.statusCode);
    }
    return errorResponse(new Error("Failed to create payment"), 500);
  }
}
