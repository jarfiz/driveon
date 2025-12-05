import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { Truck } from "lucide-react";
import { Toaster } from "sonner";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VehicleShare",
  description:
    "VehicleShare - Peer-to-peer vehicle rental. Rent vehicles from local owners or list your own vehicle to earn extra income.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">
          {/* Header */}
          <header className="border-b border-slate-200">
            <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="group flex w-fit items-center gap-2">
                <div className="from-primary to-accent rounded-lg bg-gradient-to-br p-2 transition-all group-hover:shadow-lg">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-lg font-bold tracking-tight text-transparent">
                  VehicleShare
                </span>
              </Link>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
              <div className="animate-fade-in">{children}</div>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-slate-50/50">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-600 sm:px-6 lg:px-8">
              <p>
                © 2025 VehicleShare. All rights reserved. |{" "}
                <Link href="/" className="hover:text-primary">
                  Back to Home
                </Link>
              </p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
