"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HostDashboardPage() {
  const listedVehicles = [
    {
      id: 1,
      name: "Toyota Camry 2023",
      type: "Sedan",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      price: "Rp 500,000/day",
      bookings: 12,
      earnings: "Rp 6,000,000",
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      name: "Honda Civic 2022",
      type: "Compact",
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500",
      price: "Rp 400,000/day",
      bookings: 8,
      earnings: "Rp 3,200,000",
      rating: 4.9,
      status: "active",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Host Dashboard</h1>
            <p className="text-sm text-slate-600">
              Manage your vehicle listings and earnings
            </p>
          </div>
        </div>
        <Link href="/host/list-vehicle">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            List New Vehicle
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Vehicles",
            value: "2",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total Bookings",
            value: "20",
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Total Earnings",
            value: "Rp 9.2M",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Average Rating",
            value: "4.85",
            color: "text-yellow-600",
            bg: "bg-yellow-50",
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className={`rounded-lg ${stat.bg} mb-2 p-3`}>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Listed Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle>Your Vehicles</CardTitle>
          <CardDescription>
            Manage and track your listed vehicles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listedVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
              >
                <div className="flex gap-4">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <p className="text-sm text-slate-600">{vehicle.type}</p>
                    <div className="mt-1 flex gap-4 text-sm">
                      <span>{vehicle.price}</span>
                      <span className="text-slate-600">
                        ⭐ {vehicle.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Bookings</p>
                  <p className="mb-2 text-lg font-bold">{vehicle.bookings}</p>
                  <p className="text-sm text-slate-600">Earnings</p>
                  <p className="text-lg font-bold">{vehicle.earnings}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/host/edit-vehicle/${vehicle.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/host/vehicle-analytics/${vehicle.id}`}>
                    <Button variant="outline" size="sm">
                      Analytics
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
