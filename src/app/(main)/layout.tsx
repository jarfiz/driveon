import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VehicleShare - Peer-to-Peer Vehicle Rental",
  description:
    "VehicleShare - Rent vehicles from local owners or list your own vehicle to earn extra income. The peer-to-peer vehicle rental platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
              <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Company Info */}
                <div>
                  <h3 className="mb-4 font-bold text-white">VehicleShare</h3>
                  <p className="mb-4 text-sm">
                    Connect with local vehicle owners. Rent affordable vehicles
                    or earn by leasing yours.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>support@vehicleshare.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Jakarta, Indonesia</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="hover:text-primary transition-colors"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/vehicles/cars"
                        className="hover:text-primary transition-colors"
                      >
                        Browse Vehicles
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard"
                        className="hover:text-primary transition-colors"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="hover:text-primary transition-colors"
                      >
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="mb-4 font-semibold text-white">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                      >
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="mb-4 font-semibold text-white">Follow Us</h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="border-t border-slate-800 pt-8">
                <div className="flex flex-col items-center justify-between text-sm md:flex-row">
                  <p>&copy; 2025 VehicleShare. All rights reserved.</p>
                  <p>Made with ❤️ for travelers</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
