import Link from "next/link";
import { Calendar, MapPin, Phone, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample data for available cars. If you have a real data source, replace this
// with a fetch / prop data passed from the parent.
const sampleCars = [
  {
    id: "1",
    title: "Lamborghini Huracán EVO",
    type: "cars",
    price: "Rp 1.000.000",
    location: "Jakarta, ID",
    seats: 2,
    transmission: "Manual",
    rating: 4.9,
    reviews: 120,
  },
  {
    id: "2",
    title: "Ferrari Roma",
    type: "cars",
    price: "Rp 950.000",
    location: "Jakarta, ID",
    seats: 2,
    transmission: "Automatic",
    rating: 4.8,
    reviews: 88,
  },
  {
    id: "3",
    title: "BMW M3",
    type: "cars",
    price: "Rp 600.000",
    location: "Jakarta, ID",
    seats: 4,
    transmission: "Automatic",
    rating: 4.6,
    reviews: 200,
  },
];

const Cars = ({ id }: { id?: string }) => {
  // If no id provided, show all available cars in a grid
  if (!id) {
    return (
      <div className="container mx-auto mt-20 px-4 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold">Available cars</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCars.map((car) => (
            <Card key={car.id} className="shadow-sm">
              <CardContent>
                <div className="mb-3 h-40 w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200" />
                <h3 className="text-lg font-medium">{car.title}</h3>
                <p className="text-muted-foreground text-sm">{car.location}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {car.seats} seats • {car.transmission}
                    </p>
                    <p className="text-lg font-semibold">{car.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Link href={`/vehicles/${car.type}/${car.id}`}>
                      <Button>View</Button>
                    </Link>
                    <span className="text-muted-foreground text-sm">
                      {car.rating} ({car.reviews})
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // If id is present, render the existing single-car layout (fallback to sample data)
  const car = sampleCars.find((c) => c.id === id);
  if (!car) {
    return (
      <div className="container mx-auto mt-20 px-4 lg:px-8">
        <p className="text-center text-lg">Car not found.</p>
        <div className="mt-4 text-center">
          <Link href="/vehicles/cars">
            <Button>Back to all cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Carousel className="mx-auto w-full max-w-3xl">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="overflow-hidden rounded-lg">
                        <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                          {/* placeholder image / number */}
                          <span className="text-6xl font-extrabold text-slate-400">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-4 flex items-center justify-between">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{car.title}</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {car.type} • {car.seats} seats • {car.transmission}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-semibold">{car.price}</p>
                <p className="text-muted-foreground text-sm">per 3 days</p>
              </div>
              <Button className="whitespace-nowrap">Book now</Button>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience pure performance with the {car.title}. This car comes
              with full insurance options and a clear pre-rental inspection.
            </p>

            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-sm">
                  {car.rating} ({car.reviews})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Min. 3 days</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{car.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-muted/50 inline-flex items-center rounded-full px-2 py-1 text-xs">
                  {car.type}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Booking card */}
        <aside className="space-y-6 lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Total estimate
                  </p>
                  <p className="text-2xl font-bold">{car.price}</p>
                  <p className="text-muted-foreground text-sm">3 days</p>
                </div>
                <div className="flex items-center">
                  <Button>Reserve</Button>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <label className="text-muted-foreground text-sm">Dates</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-md border px-3 py-2 text-sm"
                    placeholder="Start"
                  />
                  <input
                    className="flex-1 rounded-md border px-3 py-2 text-sm"
                    placeholder="End"
                  />
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="text-muted-foreground text-sm">Cancellation</p>
                <p className="text-sm">
                  Free cancellation up to 48 hours before pickup.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Lauren Clark</p>
                  <p className="text-muted-foreground text-sm">
                    Host • Joined 2021
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+62 812 3456 7890</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};
export default Cars;
