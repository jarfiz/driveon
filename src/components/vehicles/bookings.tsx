"use client";

import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type BookingItem = {
  label: string;
  price: number;
};

type Booking = {
  id: string;
  vehicle: { id: string; title: string; type?: string };
  user?: { name?: string; email?: string };
  startDate: string; // ISO
  endDate: string; // ISO
  createdAt: string; // ISO
  items: BookingItem[];
  total: number;
  currency?: string;
  status: "pending" | "confirmed" | "cancelled" | string;
  paymentMethod?: string;
};

const sampleBooking: Booking = {
  id: "bk_0001",
  vehicle: {
    id: "huracan-evo",
    title: "Lamborghini Huracán EVO",
    type: "supercar",
  },
  user: { name: "John Doe", email: "john@example.com" },
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  items: [
    { label: "Rental (3 days)", price: 1000000 },
    { label: "Insurance", price: 50000 },
    { label: "Cleaning fee", price: 20000 },
  ],
  total: 1070000,
  currency: "IDR",
  status: "confirmed",
  paymentMethod: "card",
};

function fmtCurrency(amount: number, currency = "IDR") {
  try {
    // show as localized currency; fallback to simple number
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
}

function fmtDate(iso?: string) {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

const Bookings = ({ booking }: { booking?: Booking }) => {
  const b = booking ?? sampleBooking;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <Card className="w-full max-w-5xl">
        <CardContent>
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-3xl leading-tight font-semibold">Invoice</h2>
              <p className="text-muted-foreground text-sm">
                Booking ID: {b.id}
              </p>
              <p className="text-muted-foreground text-sm">
                Created: {fmtDate(b.createdAt)}
              </p>
            </div>

            <div className="text-right">
              <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm">
                <span className="capitalize">{b.status}</span>
              </p>
              <div className="mt-3 flex justify-end gap-2 print:hidden">
                <Button variant="ghost" onClick={() => window.print()}>
                  Print
                </Button>
                <Button
                  onClick={() => {
                    const data = `Invoice ${b.id}\nTotal: ${fmtCurrency(b.total, b.currency)}`;
                    const blob = new Blob([data], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `invoice-${b.id}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Renter</h3>
              <p className="text-base">{b.user?.name ?? "-"}</p>
              <p className="text-muted-foreground text-sm">
                {b.user?.email ?? "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Vehicle</h3>
              <p className="text-base">{b.vehicle.title}</p>
              <p className="text-muted-foreground text-sm">{b.vehicle.type}</p>
            </div>
          </div>

          <div className="text-muted-foreground mb-6 flex flex-col gap-4 text-sm sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" />
              <div>
                <div className="font-medium">Start</div>
                <div>{fmtDate(b.startDate)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" />
              <div>
                <div className="font-medium">End</div>
                <div>{fmtDate(b.endDate)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <div>
                <div className="font-medium">Pickup</div>
                <div>Jakarta, ID</div>
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-md border">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground bg-transparent text-left text-xs">
                <tr>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {b.items.map((it, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-4 py-3">{it.label}</td>
                    <td className="px-4 py-3 text-right">
                      {fmtCurrency(it.price, b.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-white">
                <tr>
                  <td className="px-4 py-4 text-sm font-medium">Total</td>
                  <td className="px-4 py-4 text-right text-2xl font-bold">
                    {fmtCurrency(b.total, b.currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              Payment: {b.paymentMethod ?? "—"}
            </div>
            <div className="text-sm">
              Status: <span className="font-medium">{b.status}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
