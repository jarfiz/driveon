"use client";

import { use } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/bookings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Booking Details</h1>
          <p className="text-sm text-slate-600">Booking #VHL-2025-001</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Vehicle Card */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
                  alt="Vehicle"
                  className="h-48 rounded-lg object-cover sm:col-span-1"
                />
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Vehicle</p>
                    <p className="text-xl font-bold">Toyota Camry 2023</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Type</p>
                    <p className="font-semibold">Sedan</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Plate</p>
                    <p className="font-mono font-bold">B 1234 ABC</p>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <p className="text-sm text-slate-600">Transmission</p>
                      <p className="font-semibold">Automatic</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Fuel</p>
                      <p className="font-semibold">Petrol</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Info */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-600">Check-in</p>
                  <p className="text-lg font-bold">January 15, 2025</p>
                  <p className="text-sm text-slate-500">10:00 AM</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Check-out</p>
                  <p className="text-lg font-bold">January 18, 2025</p>
                  <p className="text-sm text-slate-500">5:00 PM</p>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-slate-600">Duration</p>
                <p className="text-lg font-bold">3 days</p>
              </div>
            </CardContent>
          </Card>

          {/* Host Info */}
          <Card>
            <CardHeader>
              <CardTitle>Host Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xl font-bold text-white">
                    JS
                  </div>
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        4.8 (45 reviews)
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">Joined 2 years ago</p>
                  </div>
                </div>
                <Button size="sm">Contact Host</Button>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3 rounded-lg bg-yellow-50 p-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                <div>
                  <p className="text-sm font-semibold">Cancellation Policy</p>
                  <p className="text-sm text-slate-600">
                    Free cancellation up to 48 hours before check-in
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Rental Rules:</p>
                <ul className="list-inside list-disc space-y-1 text-slate-600">
                  <li>No smoking</li>
                  <li>No pets</li>
                  <li>Full tank required for return</li>
                  <li>Insurance: Basic coverage included</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Price Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Daily Rate × 3 days</span>
                <span className="font-semibold">Rp 1,500,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Discount</span>
                <span className="font-semibold text-green-600">
                  -Rp 150,000
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Insurance</span>
                <span className="font-semibold">Rp 50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Service Fee</span>
                <span className="font-semibold">Rp 100,000</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold">Rp 1,500,000</span>
              </div>
            </CardContent>
          </Card>

          {/* Pickup Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 font-semibold">Jakarta, Indonesia</p>
              <div className="flex h-32 w-full items-center justify-center rounded-lg bg-slate-200">
                <p className="text-slate-600">Map would be displayed here</p>
              </div>
              <Button variant="outline" className="mt-3 w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Host
              </Button>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Confirmed</p>
                    <p className="text-xs text-slate-600">Jan 10, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-blue-600">→</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Upcoming</p>
                    <p className="text-xs text-slate-600">Jan 15, 2025</p>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
