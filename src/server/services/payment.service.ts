import { Decimal } from "@prisma/client/runtime/library";
import db from "@/server/db";
import { ApiError } from "@/server/utils/response";

export class PaymentService {
  async createPayment(data: {
    bookingId: string;
    userId: string;
    amount: number;
    method: string;
    cardDetails?: {
      last4: string;
      brand: string;
      expiryMonth: number;
      expiryYear: number;
    };
  }) {
    // Check if booking exists
    const booking = await db.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!booking) {
      throw new ApiError("BOOKING_NOT_FOUND", "Booking not found", 404);
    }

    const receiptNumber = `RC-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    const payment = await db.payment.create({
      data: {
        bookingId: data.bookingId,
        userId: data.userId,
        amount: new Decimal(data.amount),
        method: data.method,
        receiptNumber,
        status: "PENDING",
        last4: data.cardDetails?.last4,
        brand: data.cardDetails?.brand,
        expiryMonth: data.cardDetails?.expiryMonth,
        expiryYear: data.cardDetails?.expiryYear,
      },
    });

    return payment;
  }

  async getPayment(id: string) {
    const payment = await db.payment.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            guest: true,
            vehicle: true,
            host: true,
          },
        },
        user: true,
      },
    });

    if (!payment) {
      throw new ApiError("PAYMENT_NOT_FOUND", "Payment not found", 404);
    }

    return payment;
  }

  async getPaymentsByUser(userId: string) {
    return db.payment.findMany({
      where: { userId },
      include: {
        booking: {
          include: {
            vehicle: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async completePayment(id: string, paymentIntentId?: string) {
    const payment = await db.payment.update({
      where: { id },
      data: {
        status: "COMPLETED",
        paymentIntentId,
      },
      include: {
        booking: true,
      },
    });

    // Update booking status to confirmed if it was pending
    if (payment.booking.status === "PENDING") {
      await db.booking.update({
        where: { id: payment.bookingId },
        data: { status: "CONFIRMED" },
      });
    }

    return payment;
  }

  async failPayment(id: string, reason: string) {
    return db.payment.update({
      where: { id },
      data: {
        status: "FAILED",
        failureReason: reason,
      },
    });
  }

  async refundPayment(id: string, refundAmount: number, reason: string) {
    const payment = await db.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new ApiError("PAYMENT_NOT_FOUND", "Payment not found", 404);
    }

    if (payment.status !== "COMPLETED") {
      throw new ApiError(
        "CANNOT_REFUND",
        "Only completed payments can be refunded",
      );
    }

    return db.payment.update({
      where: { id },
      data: {
        status: "REFUNDED",
        refundAmount: new Decimal(refundAmount),
        refundReason: reason,
        refundedAt: new Date(),
      },
    });
  }

  async getPaymentStats(hostId: string) {
    const payments = await db.payment.findMany({
      where: {
        booking: {
          hostId,
        },
        status: "COMPLETED",
      },
      include: {
        booking: true,
      },
    });

    const totalEarnings = payments.reduce(
      (sum: number, p: any) => sum + p.amount.toNumber(),
      0,
    );
    const totalBookings = new Set(payments.map((p: any) => p.bookingId)).size;

    return {
      totalEarnings,
      totalBookings,
      averageBookingValue:
        totalBookings > 0 ? totalEarnings / totalBookings : 0,
      paymentCount: payments.length,
    };
  }
}

export const paymentService = new PaymentService();
