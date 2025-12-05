"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Filter, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VehicleTypeListPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const typeLabels: Record<string, string> = {
    cars: "Cars",
    motorcycles: "Motorcycles",
    trucks: "Trucks",
    vans: "Vans",
    suv: "SUV",
    boats: "Boats",
    rv: "RVs",
  };

  const vehicles = [
    {
      id: 1,
      name: "Toyota Camry 2023",
      type: "Sedan",
      price: 500000,
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      location: "Jakarta",
      seats: 5,
    },
    {
      id: 2,
      name: "Honda Civic 2022",
      type: "Compact",
      price: 400000,
      rating: 4.9,
      reviews: 32,
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400",
      location: "Jakarta",
      seats: 5,
    },
    {
      id: 3,
      name: "Toyota Avanza 2021",
      type: "MPV",
      price: 350000,
      rating: 4.7,
      reviews: 28,
      image:
        "https://images.unsplash.com/photo-1493220789253-12f28a4a6d7e?w=400",
      location: "Jakarta",
      seats: 7,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/vehicles">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{typeLabels[type] || type}</h1>
            <p className="text-sm text-slate-600">
              {vehicles.length} vehicles available
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-semibold">Price Range</label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>Any price</option>
                <option>Under Rp 500k</option>
                <option>Rp 500k - 1M</option>
                <option>Over Rp 1M</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Seats</label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>Any seats</option>
                <option>2-4 seats</option>
                <option>5 seats</option>
                <option>7+ seats</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Transmission</label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>Any</option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Fuel Type</label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>Any</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Link key={vehicle.id} href={`/vehicles/${type}/${vehicle.id}`}>
            <Card className="h-full cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow">
                  {vehicle.type}
                </span>
              </div>
              <CardContent className="pt-4">
                <h3 className="mb-1 text-lg font-semibold">{vehicle.name}</h3>
                <div className="mb-3 flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{vehicle.rating}</span>
                  <span className="text-slate-600">({vehicle.reviews})</span>
                </div>
                <div className="mb-3 flex items-center gap-1 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {vehicle.location}
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-2xl font-bold">
                    Rp {vehicle.price.toLocaleString("id-ID")}
                  </p>
                  <span className="text-sm text-slate-600">/day</span>
                </div>
                <div className="mb-3 flex gap-2 text-sm text-slate-600">
                  <span>🪑 {vehicle.seats} seats</span>
                </div>
                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
