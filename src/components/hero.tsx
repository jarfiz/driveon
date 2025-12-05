import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search, Users, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const Hero = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-8">
            <div className="from-primary/10 to-accent/10 ring-primary/20 inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2 ring-1">
              <Zap className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-semibold">
                Trusted by 50k+ drivers worldwide
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Your Journey,
                <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                  {" "}
                  Our Vehicles
                </span>
              </h1>

              <p className="max-w-lg text-lg text-slate-600">
                Premium car rentals at unbeatable prices. From compact cars to
                luxury SUVs, find the perfect vehicle for every adventure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      aria-label="Pickup location"
                      placeholder="Pickup location"
                      className="border-border focus:ring-primary/40 w-full rounded-lg border bg-white py-3 pr-4 pl-10 text-sm shadow-sm transition-all focus:ring-2"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      aria-label="Vehicle or destination"
                      placeholder="What vehicle?"
                      className="border-border focus:ring-primary/40 w-full rounded-lg border bg-white py-3 pr-4 pl-10 text-sm shadow-sm transition-all focus:ring-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/vehicles/cars" className="flex-1">
                  <Button size="lg" className="w-full gap-2 rounded-lg">
                    <Search className="h-5 w-5" />
                    Search Vehicles
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/vehicles" className="flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-lg"
                  >
                    Browse All
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              <div>
                <p className="text-primary text-3xl font-bold">50K+</p>
                <p className="text-sm text-slate-600">Active vehicles</p>
              </div>
              <div>
                <p className="text-primary text-3xl font-bold">4.9/5</p>
                <p className="text-sm text-slate-600">Customer rating</p>
              </div>
              <div>
                <p className="text-primary text-3xl font-bold">24/7</p>
                <p className="text-sm text-slate-600">Support team</p>
              </div>
            </div>
          </div>

          <div className="order-first md:order-last">
            <div className="animate-fade-in relative mx-auto max-w-lg">
              <div className="from-primary/20 to-accent/20 absolute inset-0 rounded-3xl bg-gradient-to-br blur-3xl"></div>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-2xl">
                <Image
                  src="/file.svg"
                  alt="vehicle"
                  width={640}
                  height={420}
                  className="w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Types of vehicle */}
        <div className="mt-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Vehicle Types</h2>
            <p className="mt-2 text-slate-600">
              Choose from our wide selection
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              { name: "Economy", icon: "🚗" },
              { name: "Sedan", icon: "🚙" },
              { name: "SUV", icon: "🚐" },
              { name: "Truck", icon: "🚚" },
              { name: "Luxury", icon: "🏎️" },
            ].map((type, index) => (
              <Link key={index} href={`/vehicles/${type.name.toLowerCase()}`}>
                <Card className="hover:ring-primary flex cursor-pointer flex-col items-center justify-center gap-4 p-6 transition-all hover:shadow-lg hover:ring-2">
                  <div className="text-5xl">{type.icon}</div>
                  <p className="text-center text-sm font-semibold text-slate-900">
                    {type.name}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Available Vehicle */}
        <div className="mt-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Vehicles
            </h2>
            <p className="mt-2 text-slate-600">
              Popular choices from our fleet
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Tesla Model 3",
                price: 500000,
                owner: "John Doe",
                rating: 4.8,
              },
              {
                name: "Toyota Fortuner",
                price: 350000,
                owner: "Jane Smith",
                rating: 4.9,
              },
              {
                name: "BMW X5",
                price: 750000,
                owner: "Mike Johnson",
                rating: 4.7,
              },
              {
                name: "Honda CR-V",
                price: 300000,
                owner: "Sarah Williams",
                rating: 4.8,
              },
              {
                name: "Mercedes C-Class",
                price: 600000,
                owner: "Robert Brown",
                rating: 4.9,
              },
              {
                name: "Suzuki Swift",
                price: 200000,
                owner: "Emily Davis",
                rating: 4.6,
              },
            ].map((vehicle, index) => (
              <Link key={index} href={`/vehicles/cars/${index + 1}`}>
                <Card className="hover:ring-primary overflow-hidden transition-all hover:shadow-xl hover:ring-1">
                  <div className="relative h-48 w-full bg-gradient-to-br from-slate-200 to-slate-300">
                    <Image
                      src="/file.svg"
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="text-primary absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold backdrop-blur">
                      ⭐ {vehicle.rating}
                    </div>
                  </div>
                  <CardContent className="space-y-4 pt-4">
                    <div>
                      <CardTitle className="text-lg text-slate-900">
                        {vehicle.name}
                      </CardTitle>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>{vehicle.owner[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-600">
                            {vehicle.owner}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                      <div>
                        <p className="text-xs text-slate-600">Per day</p>
                        <p className="text-primary text-xl font-bold">
                          Rp {vehicle.price.toLocaleString()}
                        </p>
                      </div>
                      <Button size="sm" className="gap-1 rounded-lg">
                        Book Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
