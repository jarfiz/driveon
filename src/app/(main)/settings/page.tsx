"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Lock, LogOut, Palette, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-sm text-slate-600">
            Manage your account preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Booking Confirmations",
                description: "Get notified when bookings are confirmed",
              },
              {
                title: "Messages",
                description: "New messages from hosts and renters",
              },
              {
                title: "Promotions",
                description: "Special offers and discounts",
              },
              {
                title: "Vehicle Updates",
                description: "Updates on your favorite vehicles",
              },
            ].map((notif) => (
              <div
                key={notif.title}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-sm text-slate-600">{notif.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Control your privacy and account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Two-Factor Authentication
            </Button>
            <div className="rounded-lg bg-yellow-50 p-4">
              <p className="font-medium">Active Sessions</p>
              <p className="text-sm text-slate-600">
                You have 2 active sessions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how VehicleShare looks for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Theme</label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Language</label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>English</option>
                <option>Indonesian</option>
                <option>Spanish</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
