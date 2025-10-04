import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const Hero = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm font-medium">
              New · Driveon Picks
            </span>

            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Rent premium vehicles near you
            </h1>

            <p className="max-w-xl text-slate-600">
              Find and book cars, SUVs and trucks for any trip. Flexible rental
              durations, transparent pricing, and 24/7 support to keep you
              moving.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex w-full gap-3">
                <input
                  aria-label="Pickup location"
                  placeholder="Pickup location"
                  className="border-border focus:ring-primary/40 w-1/2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm focus:ring-2"
                />
                <input
                  aria-label="Vehicle or destination"
                  placeholder="Vehicle or destination"
                  className="border-border focus:ring-primary/40 w-1/2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm focus:ring-2"
                />
              </div>

              <div className="flex gap-2">
                <button className="bg-primary inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-95">
                  Search vehicles
                </button>
                <button className="bg-muted hover:bg-muted/80 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
                  Browse all
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">4.9</span>
                <span className="text-sm text-slate-500">
                  /5 rating — 12k+ bookings
                </span>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Trusted hosts</p>
                  <p className="text-muted-foreground text-xs">
                    Verified owners across cities
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-first md:order-last">
            <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg">
              <Image
                src="/file.svg"
                alt="vehicle"
                width={640}
                height={420}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Types of vehicle */}
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Types</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="flex items-center justify-center gap-3 p-4"
              >
                <CardContent className="flex flex-col items-center gap-2 p-0">
                  <Image src="/next.svg" width={72} height={72} alt="type" />
                  <p className="text-sm font-medium">Category {index + 1}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Vehicle */}
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Available Vehicles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-40 w-full bg-slate-100">
                  <Image
                    src="/next.svg"
                    alt="vehicle"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent>
                  <CardTitle>Car Model {index + 1}</CardTitle>
                  <CardDescription>
                    Rp. {((index + 1) * 250000).toLocaleString()}/Day
                  </CardDescription>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">Owner {index + 1}</p>
                    </div>

                    <div>
                      <button className="bg-primary rounded-md px-3 py-1 text-sm font-medium text-white">
                        Book
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
