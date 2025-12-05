"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VehicleAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/host">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Vehicle Analytics</h1>
          <p className="text-sm text-slate-600">
            Track performance and earnings of your vehicle
          </p>
        </div>
      </div>

      {/* Vehicle Info */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
              alt="Vehicle"
              className="h-32 w-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Toyota Camry 2023</h2>
              <p className="text-slate-600">Sedan • Jakarta, Indonesia</p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Daily Rate</p>
                  <p className="font-bold">Rp 500,000</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Bookings</p>
                  <p className="font-bold">12</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Rating</p>
                  <p className="font-bold">⭐ 4.8</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Total Earnings", value: "Rp 6,000,000" },
              { label: "Completed Bookings", value: "12" },
              { label: "Average Duration", value: "2.5 days" },
              { label: "Cancellation Rate", value: "0%" },
              { label: "Occupancy Rate", value: "68%" },
              { label: "Revenue Per Day", value: "Rp 500,000" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="flex justify-between border-b pb-3"
              >
                <span className="text-slate-600">{metric.label}</span>
                <span className="font-semibold">{metric.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reviews & Rating */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Reviews</CardTitle>
            <CardDescription>Recent feedback from renters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                author: "Ahmad Rauf",
                rating: 5,
                text: "Excellent vehicle, very clean and well-maintained!",
              },
              {
                author: "Siti Nurhaliza",
                rating: 4,
                text: "Good experience, responsive host",
              },
            ].map((review) => (
              <div key={review.author} className="border-b pb-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-semibold">{review.author}</p>
                  <span>{"⭐".repeat(review.rating)}</span>
                </div>
                <p className="text-sm text-slate-600">{review.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Booking Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>Last 30 days activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg bg-slate-50">
              <p className="text-slate-600">Chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Earnings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: "October 2024", amount: "Rp 1,500,000", bookings: 3 },
                { month: "November 2024", amount: "Rp 2,000,000", bookings: 4 },
                { month: "December 2024", amount: "Rp 2,500,000", bookings: 5 },
              ].map((item) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                >
                  <div>
                    <p className="font-semibold">{item.month}</p>
                    <p className="text-sm text-slate-600">
                      {item.bookings} bookings
                    </p>
                  </div>
                  <p className="font-bold">{item.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
