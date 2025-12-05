"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  Search,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const vehicles = [
  {
    id: 1,
    name: "Tesla Model 3",
    price: 500000,
    owner: "John Doe",
    rating: 4.8,
    reviews: 156,
    type: "Electric",
    seats: 5,
    transmission: "Automatic",
    image: "/file.svg",
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    price: 350000,
    owner: "Jane Smith",
    rating: 4.9,
    reviews: 203,
    type: "SUV",
    seats: 7,
    transmission: "Automatic",
    image: "/file.svg",
  },
  {
    id: 3,
    name: "BMW X5",
    price: 750000,
    owner: "Mike Johnson",
    rating: 4.7,
    reviews: 98,
    type: "Luxury",
    seats: 5,
    transmission: "Automatic",
    image: "/file.svg",
  },
  {
    id: 4,
    name: "Honda CR-V",
    price: 300000,
    owner: "Sarah Williams",
    rating: 4.8,
    reviews: 172,
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    image: "/file.svg",
  },
  {
    id: 5,
    name: "Mercedes C-Class",
    price: 600000,
    owner: "Robert Brown",
    rating: 4.9,
    reviews: 214,
    type: "Luxury",
    seats: 5,
    transmission: "Automatic",
    image: "/file.svg",
  },
  {
    id: 6,
    name: "Suzuki Swift",
    price: 200000,
    owner: "Emily Davis",
    rating: 4.6,
    reviews: 89,
    type: "Compact",
    seats: 5,
    transmission: "Manual",
    image: "/file.svg",
  },
  {
    id: 7,
    name: "Hyundai Tucson",
    price: 320000,
    owner: "David Wilson",
    rating: 4.7,
    reviews: 145,
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    image: "/file.svg",
  },
  {
    id: 8,
    name: "Audi A4",
    price: 680000,
    owner: "Lisa Anderson",
    rating: 4.8,
    reviews: 167,
    type: "Sedan",
    seats: 5,
    transmission: "Automatic",
    image: "/file.svg",
  },
];

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("popular");

  const types = ["Compact", "Sedan", "SUV", "Electric", "Luxury"];

  const filteredVehicles = vehicles
    .filter((v) => {
      const matchesSearch = v.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || v.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return b.reviews - a.reviews; // popular
    });

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Browse Vehicles</h1>
          <p className="mt-2 text-slate-600">
            Find the perfect car for your next journey
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by vehicle name or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold text-slate-900">
              Vehicle Type
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                All
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">Sort By</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "popular", label: "Most Popular" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "rating", label: "Highest Rated" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold">{filteredVehicles.length}</span>{" "}
            vehicle{filteredVehicles.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/vehicles/cars/${vehicle.id}`}>
              <Card className="hover:ring-primary flex h-full cursor-pointer flex-col overflow-hidden transition-all hover:shadow-xl hover:ring-1">
                {/* Image Section */}
                <div className="relative h-48 w-full flex-shrink-0 bg-gradient-to-br from-slate-200 to-slate-300">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Badge */}
                  <div className="text-primary absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold backdrop-blur">
                    <Star className="h-4 w-4 fill-current" />
                    {vehicle.rating}
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-3 left-3 rounded-full bg-white/90 p-2 backdrop-blur transition-colors hover:bg-white">
                    <Heart className="h-5 w-5 text-red-500" />
                  </button>

                  {/* Type Badge */}
                  <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {vehicle.type}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="flex flex-1 flex-col pt-4">
                  <CardTitle className="line-clamp-2 text-lg text-slate-900">
                    {vehicle.name}
                  </CardTitle>

                  {/* Stats */}
                  <div className="my-3 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {vehicle.seats} Seats
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5" />
                      {vehicle.transmission}
                    </div>
                  </div>

                  {/* Owner & Rating */}
                  <div className="mb-4 flex items-center justify-between border-t border-b border-slate-200 py-3">
                    <div>
                      <p className="text-xs text-slate-500">Owner</p>
                      <p className="text-sm font-medium text-slate-900">
                        {vehicle.owner}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        {vehicle.reviews} reviews
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        ⭐ {vehicle.rating}
                      </p>
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-600">Per Day</p>
                      <p className="text-primary text-2xl font-bold">
                        Rp {vehicle.price.toLocaleString()}
                      </p>
                    </div>
                    <Button size="sm" className="gap-1">
                      Book
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="py-12 text-center">
            <p className="mb-4 text-slate-500">
              No vehicles found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedType(null);
                setSortBy("popular");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
