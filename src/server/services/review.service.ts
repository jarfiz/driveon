import db from "@/server/db";
import { ApiError } from "@/server/utils/response";

export class ReviewService {
  async createReview(data: {
    reviewerId: string;
    reviewedId: string;
    bookingId: string;
    vehicleId?: string;
    title: string;
    comment: string;
    rating: number;
    type: string;
  }) {
    // Validate rating
    if (data.rating < 1 || data.rating > 5) {
      throw new ApiError("INVALID_RATING", "Rating must be between 1 and 5");
    }

    // Check if review already exists for this booking
    const existing = await db.review.findUnique({
      where: { bookingId: data.bookingId },
    });

    if (existing) {
      throw new ApiError(
        "REVIEW_EXISTS",
        "Review already exists for this booking",
      );
    }

    const review = await db.review.create({
      data: {
        reviewerId: data.reviewerId,
        reviewedId: data.reviewedId,
        bookingId: data.bookingId,
        vehicleId: data.vehicleId,
        title: data.title,
        comment: data.comment,
        rating: data.rating,
        type: data.type,
        isPublic: true,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Update user rating
    await this.updateUserRating(data.reviewedId, data.type);

    return review;
  }

  async getReviews(filters: {
    reviewedId?: string;
    vehicleId?: string;
    type?: string;
  }) {
    return db.review.findMany({
      where: {
        isPublic: true,
        ...(filters.reviewedId && { reviewedId: filters.reviewedId }),
        ...(filters.vehicleId && { vehicleId: filters.vehicleId }),
        ...(filters.type && { type: filters.type }),
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateUserRating(userId: string, type: string) {
    const reviews = await db.review.findMany({
      where: {
        reviewedId: userId,
        type,
        isPublic: true,
      },
    });

    if (reviews.length === 0) {
      return;
    }

    const avgRating =
      reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
      reviews.length;

    const updateData: any = {
      [type === "HOST" ? "hostRating" : "guestRating"]: avgRating,
      [type === "HOST" ? "hostReviews" : "guestReviews"]: reviews.length,
    };

    await db.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async deleteReview(id: string, userId: string) {
    const review = await db.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new ApiError("REVIEW_NOT_FOUND", "Review not found", 404);
    }

    if (review.reviewerId !== userId) {
      throw new ApiError(
        "UNAUTHORIZED",
        "You can only delete your own reviews",
        403,
      );
    }

    const deleted = await db.review.delete({
      where: { id },
    });

    // Update rating after deletion
    await this.updateUserRating(deleted.reviewedId, deleted.type);

    return deleted;
  }
}

export const reviewService = new ReviewService();
