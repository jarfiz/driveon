"use client";

import Link from "next/link";
import { Calendar, Heart, MapPin, Plus, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const stats = [
    {
      title: "Total Bookings",
      value: "8",
      description: "This month",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Saved Vehicles",
      value: "12",
      description: "Favorite cars",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Spent",
      value: "Rp 2.4M",
      description: "This year",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Trusted Hosts",
      value: "5",
      description: "Regular partners",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      car: "Tesla Model 3",
      owner: "John Doe",
      startDate: "Dec 5, 2025",
      endDate: "Dec 8, 2025",
      total: "Rp 1.5M",
      status: "confirmed",
    },
    {
      id: 2,
      car: "Toyota Fortuner",
      owner: "Jane Smith",
      startDate: "Dec 10, 2025",
      endDate: "Dec 12, 2025",
      total: "Rp 700K",
      status: "confirmed",
    },
    {
      id: 3,
      car: "BMW X5",
      owner: "Mike Johnson",
      startDate: "Dec 15, 2025",
      endDate: "Dec 18, 2025",
      total: "Rp 2.2M",
      status: "pending",
    },
  ];

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="mt-2 text-slate-600">
            Manage your bookings and favorite vehicles
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden transition-shadow hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} rounded-lg p-2`}>
                    <Icon className={`${stat.color} h-5 w-5`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="mt-1 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>
                    Your upcoming and past bookings
                  </CardDescription>
                </div>
                <Link href="/dashboard/bookings">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentBookings.length > 0 ? (
                  <div className="space-y-3">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-start gap-4 rounded-lg bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                      >
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-slate-900">
                                {booking.car}
                              </h4>
                              <p className="mt-1 text-sm text-slate-500">
                                Owner: {booking.owner}
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.startDate} → {booking.endDate}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-primary text-lg font-bold">
                            {booking.total}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="mb-4 text-slate-500">No bookings yet</p>
                    <Link href="/vehicles/cars">
                      <Button size="sm">Browse Vehicles</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/vehicles/cars" className="w-full">
                  <Button size="sm" className="w-full justify-start gap-2">
                    <Plus className="h-4 w-4" />
                    Book a Vehicle
                  </Button>
                </Link>
                <Link href="/dashboard" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    View Favorites
                  </Button>
                </Link>
                <Link href="/profile" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Featured Card */}
            <Card className="from-primary/10 to-accent/10 border-primary/20 bg-gradient-to-br">
              <CardHeader>
                <CardTitle className="text-base">New Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-600">
                  Subscribe to get exclusive deals on premium vehicles!
                </p>
                <Button size="sm" className="w-full">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-600">
                  Contact our 24/7 support team
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
