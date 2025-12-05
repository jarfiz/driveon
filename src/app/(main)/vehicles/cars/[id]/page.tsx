"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Fuel,
  Heart,
  MapPin,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: vehicleId } = use(params);

  const vehicle = {
    name: "Tesla Model 3",
    owner: "John Doe",
    price: 500000,
    rating: 4.8,
    reviews: 156,
    type: "Electric Sedan",
    seats: 5,
    transmission: "Automatic",
    year: 2024,
    fuel: "Electric",
    mileage: 45000,
    features: [
      "Autopilot",
      "Premium Audio",
      "Navigation",
      "Climate Control",
      "Backup Camera",
      "Parking Sensors",
      "USB Charging",
      "Sunroof",
    ],
    description:
      "Experience luxury and efficiency with the Tesla Model 3. Perfect for eco-conscious travelers who value performance and comfort. This premium sedan offers the latest in electric vehicle technology.",
    location: "Jakarta, Indonesia",
    availability: "Available from Dec 10 to Dec 20, 2025",
    image: "/file.svg",
  };

  const [startDate, setStartDate] = "" + vehicleId;
  const [endDate, setEndDate] = "" + vehicleId;

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/vehicles/cars" className="mb-6 inline-flex">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicles
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Images and Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Buttons Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="rounded-full bg-white/90 p-3 backdrop-blur transition-colors hover:bg-white">
                  <Heart className="h-5 w-5 text-red-500" />
                </button>
              </div>

              {/* Type Badge */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                {vehicle.type}
              </div>
            </div>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{vehicle.name}</CardTitle>
                    <div className="mt-2 flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{vehicle.rating}</span>
                      <span className="text-slate-500">
                        ({vehicle.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <p className="text-slate-600">{vehicle.description}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-blue-600">
                      <Users className="h-4 w-4" />
                      <p className="text-xs font-medium">Seats</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      {vehicle.seats}
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-green-600">
                      <Zap className="h-4 w-4" />
                      <p className="text-xs font-medium">Fuel Type</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      {vehicle.fuel}
                    </p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-orange-600">
                      <Fuel className="h-4 w-4" />
                      <p className="text-xs font-medium">Transmission</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      {vehicle.transmission}
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-purple-600">
                      <Calendar className="h-4 w-4" />
                      <p className="text-xs font-medium">Year</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      {vehicle.year}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Features</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {vehicle.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 p-2"
                      >
                        <Shield className="text-primary h-4 w-4 flex-shrink-0" />
                        <span className="text-sm text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Info */}
                <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-1 font-semibold">Before Booking</p>
                    <ul className="list-inside list-disc space-y-1 text-xs">
                      <li>Valid driver's license required</li>
                      <li>Insurance is included</li>
                      <li>Free cancellation up to 7 days before</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Owner Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{vehicle.owner[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {vehicle.owner}
                      </p>
                      <p className="text-xs text-slate-500">
                        Verified Owner • 15+ years
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Contact Owner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            {/* Location */}
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-semibold text-slate-900">
                      {vehicle.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-600">Availability</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {vehicle.availability}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Card */}
            <Card className="border-primary/20 border-2">
              <CardHeader>
                <div>
                  <p className="text-sm text-slate-600">Price per day</p>
                  <p className="text-primary text-3xl font-bold">
                    Rp {vehicle.price.toLocaleString()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-2 rounded-lg bg-slate-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      Rp {vehicle.price.toLocaleString()} x 3 days
                    </span>
                    <span className="font-semibold">
                      Rp {(vehicle.price * 3).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Insurance</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                    <span>Total</span>
                    <span>Rp {(vehicle.price * 3).toLocaleString()}</span>
                  </div>
                </div>

                <Button size="lg" className="h-11 w-full gap-2 font-semibold">
                  <Calendar className="h-5 w-5" />
                  Book Now
                </Button>

                <p className="text-center text-xs text-slate-500">
                  No payment needed now. Confirm booking and pay later.
                </p>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-4 w-4 text-green-600" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-green-600">✓</span>
                  <span className="text-slate-700">
                    Verified vehicle and owner
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-green-600">✓</span>
                  <span className="text-slate-700">
                    Secure payment protection
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-green-600">✓</span>
                  <span className="text-slate-700">
                    24/7 roadside assistance
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-green-600">✓</span>
                  <span className="text-slate-700">
                    Cancel up to 7 days before
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
