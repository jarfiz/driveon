"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Heart,
  MapPin,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = use(params);
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link href="/vehicles">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 overflow-hidden rounded-lg bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000"
                alt="Vehicle"
                className="h-full w-full object-cover"
              />
              <button className="absolute top-4 right-4 rounded-full bg-white p-2 shadow-lg hover:bg-slate-100">
                <Heart className="h-6 w-6 text-red-500" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
                "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=200",
                "https://images.unsplash.com/photo-1493220789253-12f28a4a6d7e?w=200",
              ].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Gallery ${i + 1}`}
                  className="h-24 w-full cursor-pointer rounded-lg object-cover hover:opacity-75"
                />
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle>About This Vehicle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold">Toyota Camry 2023</h2>
                <div className="mt-2 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8 (45 reviews)</span>
                  <span className="text-slate-600">• Jakarta, Indonesia</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "Type", value: "Sedan" },
                  { label: "Seats", value: "5" },
                  { label: "Transmission", value: "Automatic" },
                  { label: "Fuel", value: "Petrol" },
                  { label: "Mileage", value: "15,000 km" },
                  { label: "Year", value: "2023" },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-lg bg-slate-50 p-3 text-center"
                  >
                    <p className="text-sm text-slate-600">{spec.label}</p>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-2 font-semibold">Description</p>
                <p className="text-slate-600">
                  Well-maintained Toyota Camry in excellent condition. Perfect
                  for comfortable city driving and highway trips. The vehicle is
                  clean, well-equipped with modern features, and maintained
                  regularly.
                </p>
              </div>

              <div>
                <p className="mb-3 font-semibold">Features & Amenities</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    "AC",
                    "Power Windows",
                    "ABS",
                    "Airbags",
                    "Bluetooth",
                    "Backup Camera",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Host Information */}
          <Card>
            <CardHeader>
              <CardTitle>About the Host</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xl font-bold text-white">
                    JS
                  </div>
                  <div>
                    <p className="text-lg font-semibold">John Smith</p>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8 (45 reviews)</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Superhost • Joined 2 years ago
                    </p>
                  </div>
                </div>
                <Button>Contact</Button>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Ahmad R.",
                  rating: 5,
                  date: "2 weeks ago",
                  text: "Excellent vehicle and very responsive host!",
                },
                {
                  name: "Siti N.",
                  rating: 4,
                  date: "1 month ago",
                  text: "Great experience, clean car.",
                },
              ].map((review, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-semibold">{review.name}</p>
                    <span className="text-sm text-slate-600">
                      {review.date}
                    </span>
                  </div>
                  <div className="mb-1">{"⭐".repeat(review.rating)}</div>
                  <p className="text-sm text-slate-600">{review.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Booking */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <p className="text-3xl font-bold">Rp 500,000</p>
                <p className="text-sm text-slate-600">per day</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Check-in</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Check-out</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>

              <div className="space-y-2 rounded-lg bg-slate-50 p-3">
                <div className="flex justify-between text-sm">
                  <span>3 days × Rp 500,000</span>
                  <span className="font-semibold">Rp 1,500,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span className="font-semibold">Rp 100,000</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold">Rp 1,600,000</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full">Book Now</Button>
              </Link>

              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex h-48 items-center justify-center rounded-lg bg-slate-200">
                <p className="text-slate-600">Map would be displayed here</p>
              </div>
              <p className="font-semibold">Jakarta, Indonesia</p>
              <p className="text-sm text-slate-600">
                Jalan Gatot Subroto, Menteng
              </p>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>No smoking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>No pets</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Full tank required for return</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
