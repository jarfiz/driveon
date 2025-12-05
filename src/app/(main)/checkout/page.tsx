"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/vehicles">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-sm text-slate-600">Complete your booking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Vehicle Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150"
                  alt="Vehicle"
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">Toyota Camry 2023</h3>
                  <p className="text-sm text-slate-600">Sedan • Jakarta</p>
                  <div className="mt-2 text-sm">
                    <p>Jan 15 - Jan 18 (3 days)</p>
                    <p className="font-semibold">Rp 500,000/day</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                  defaultValue="Your Name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                  defaultValue="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Phone</label>
                <input
                  type="tel"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="+62 XXX XXX XXXX"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pickup & Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>Pickup & Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">Pickup Method</label>
                  <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
                    <option>Self pickup</option>
                    <option>Airport delivery</option>
                    <option>Hotel delivery</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">Time</label>
                  <input
                    type="time"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                    defaultValue="10:00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card>
            <CardHeader>
              <CardTitle>Insurance & Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "Basic Coverage",
                  price: "Included",
                  desc: "Third-party liability",
                },
                {
                  title: "Premium Coverage",
                  price: "+ Rp 50,000/day",
                  desc: "Full coverage including collision",
                },
              ].map((option) => (
                <label
                  key={option.title}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-300 p-3 hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="insurance"
                    defaultChecked={option.title === "Basic Coverage"}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{option.title}</p>
                    <p className="text-sm text-slate-600">{option.desc}</p>
                  </div>
                  <span className="text-sm font-semibold">{option.price}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Additional Services */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "GPS Device", price: "Rp 50,000" },
                { name: "Child Seat", price: "Rp 100,000" },
                { name: "Extra Driver", price: "Rp 200,000" },
              ].map((service) => (
                <label key={service.name} className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span className="flex-1">{service.name}</span>
                  <span className="font-semibold">{service.price}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Terms */}
          <Card>
            <CardContent className="pt-6">
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm">
                  I agree to the terms and conditions and rental policies
                </span>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Price Summary */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 border-b pb-3">
                <div className="flex justify-between text-sm">
                  <span>3 days × Rp 500,000</span>
                  <span className="font-semibold">Rp 1,500,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Basic Insurance</span>
                  <span className="font-semibold">Included</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span className="font-semibold">Rp 100,000</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold">Rp 1,600,000</span>
              </div>

              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" />
                Complete Booking
              </Button>

              <p className="text-center text-xs text-slate-600">
                You won't be charged until the host confirms
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
