"use client";

import Link from "next/link";
import { CheckCircle, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BookingConfirmationPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Success Message */}
      <div className="mb-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
        <h1 className="mb-2 text-3xl font-bold">Booking Confirmed!</h1>
        <p className="text-slate-600">
          Your booking has been successfully created. Check your email for
          confirmation.
        </p>
      </div>

      {/* Booking Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center font-mono text-2xl font-bold">
            VHL-2025-001
          </p>
          <p className="text-center text-sm text-slate-600">
            Save this reference number for your records
          </p>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150"
              alt="Vehicle"
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">Toyota Camry 2023</h3>
              <p className="text-sm text-slate-600">
                Sedan • Jakarta, Indonesia
              </p>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Check-in</span>
              <span className="font-semibold">January 15, 2025 • 10:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out</span>
              <span className="font-semibold">January 18, 2025 • 5:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span className="font-semibold">3 days</span>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Daily Rate</span>
              <span className="font-semibold">Rp 500,000</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal (3 days)</span>
              <span className="font-semibold">Rp 1,500,000</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span className="font-semibold">Rp 100,000</span>
            </div>
            <div className="mt-2 flex justify-between border-t pt-2">
              <span className="font-bold">Total Amount</span>
              <span className="text-xl font-bold">Rp 1,600,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Host Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Host Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
                JS
              </div>
              <div>
                <p className="font-semibold">John Smith</p>
                <p className="text-sm text-slate-600">
                  Superhost • Response: &lt;1hr
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card className="mb-6 bg-blue-50">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <span className="flex-shrink-0 font-bold text-blue-600">1</span>
            <div>
              <p className="font-semibold">Confirmation</p>
              <p className="text-sm text-slate-600">
                You'll receive a confirmation email shortly
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 font-bold text-blue-600">2</span>
            <div>
              <p className="font-semibold">Wait for Host Acceptance</p>
              <p className="text-sm text-slate-600">
                The host will review and accept your booking
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 font-bold text-blue-600">3</span>
            <div>
              <p className="font-semibold">Pickup</p>
              <p className="text-sm text-slate-600">
                Follow the host's instructions for vehicle pickup
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Share2 className="h-4 w-4" />
          Share Booking
        </Button>
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
