"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyBookingsPage() {
  const bookings = [
    {
      id: 1,
      vehicleImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      vehicleName: "Toyota Camry 2023",
      hostName: "John Smith",
      hostRating: 4.8,
      startDate: "2025-01-15",
      endDate: "2025-01-18",
      totalPrice: "Rp 1,200,000",
      status: "confirmed",
      location: "Jakarta, Indonesia",
    },
    {
      id: 2,
      vehicleImage:
        "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500",
      vehicleName: "Honda Civic 2022",
      hostName: "Sarah Johnson",
      hostRating: 4.9,
      startDate: "2024-12-20",
      endDate: "2024-12-22",
      totalPrice: "Rp 900,000",
      status: "completed",
      location: "Surabaya, Indonesia",
    },
    {
      id: 3,
      vehicleImage:
        "https://images.unsplash.com/photo-1493220789253-12f28a4a6d7e?w=500",
      vehicleName: "BMW X5 2023",
      hostName: "Michael Chen",
      hostRating: 5.0,
      startDate: "2025-02-01",
      endDate: "2025-02-05",
      totalPrice: "Rp 2,500,000",
      status: "pending",
      location: "Bandung, Indonesia",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-sm text-slate-600">
            Manage and track all your vehicle bookings
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
          (filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "default" : "outline"}
              size="sm"
            >
              {filter}
            </Button>
          ),
        )}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6 lg:gap-8">
                {/* Vehicle Image */}
                <div className="relative h-64 overflow-hidden sm:col-span-1 sm:h-auto">
                  <img
                    src={booking.vehicleImage}
                    alt={booking.vehicleName}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="space-y-2 p-4 sm:col-span-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        {booking.vehicleName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        {booking.location}
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusColor(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Host Info */}
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-sm text-slate-600">Host</p>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{booking.hostName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {booking.hostRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-600" />
                    <span>
                      {booking.startDate} to {booking.endDate}
                    </span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col justify-between border-t p-4 sm:col-span-1 sm:border-t-0 sm:border-l">
                  <div>
                    <p className="text-sm text-slate-600">Total Price</p>
                    <p className="text-2xl font-bold">{booking.totalPrice}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {booking.status === "completed" && (
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                    )}
                    {booking.status === "pending" && (
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
