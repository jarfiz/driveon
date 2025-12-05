"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/host">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Vehicle</h1>
          <p className="text-sm text-slate-600">
            Update your vehicle information
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
          <CardDescription>Modify details about your vehicle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Vehicle Type</label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                defaultValue="Car"
              >
                <option>Car</option>
                <option>Motorcycle</option>
                <option>Truck</option>
                <option>Van</option>
                <option>SUV</option>
                <option>Boat</option>
                <option>RV</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Brand</label>
              <input
                type="text"
                placeholder="e.g., Toyota"
                defaultValue="Toyota"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Model</label>
              <input
                type="text"
                placeholder="e.g., Camry"
                defaultValue="Camry"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Year</label>
              <input
                type="number"
                placeholder="2023"
                defaultValue="2023"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-4 font-semibold">Pricing & Availability</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">
                  Daily Price (Rp)
                </label>
                <input
                  type="number"
                  placeholder="500000"
                  defaultValue="500000"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">
                  Weekly Price (Rp)
                </label>
                <input
                  type="number"
                  placeholder="3000000"
                  defaultValue="3000000"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              placeholder="Describe your vehicle, condition, features..."
              defaultValue="Well-maintained Toyota Camry in excellent condition. Perfect for comfortable city driving and highway trips."
              rows={6}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-semibold">Location</label>
            <input
              type="text"
              placeholder="City, Province"
              defaultValue="Jakarta, Indonesia"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          {/* Features */}
          <div className="rounded-lg bg-green-50 p-4">
            <h3 className="mb-4 font-semibold">Vehicle Features</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "AC",
                "Power Windows",
                "ABS",
                "Airbags",
                "Bluetooth",
                "Backup Camera",
                "GPS",
                "Sunroof",
              ].map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={[
                      "AC",
                      "Power Windows",
                      "ABS",
                      "Airbags",
                      "Bluetooth",
                      "Backup Camera",
                    ].includes(feature)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Save Changes</Button>
            <Link href="/host" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
