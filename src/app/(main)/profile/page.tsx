"use client";

import Link from "next/link";
import { ArrowLeft, Camera, Mail, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

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
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-sm text-slate-600">
              Manage your account information
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
              <button className="absolute right-0 bottom-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Name</p>
              <p className="font-medium">{user?.name || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Email</p>
              <p className="font-medium">{user?.email || "Not set"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your profile details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  defaultValue={user?.name || ""}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  defaultValue={user?.email || ""}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself..."
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Rating */}
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <div>
                    <p className="font-semibold">Your Rating</p>
                    <p className="text-sm text-slate-600">
                      Based on completed bookings
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold">4.8/5</p>
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
