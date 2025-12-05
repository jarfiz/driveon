"use client";

import Link from "next/link";
import {
  Bike,
  Car,
  Crown,
  Home,
  Mountain,
  TrendingUp,
  Truck,
  Users,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface VehicleTypeCardProps {
  type: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  count?: number;
  href: string;
}

function VehicleTypeCard({
  label,
  description,
  icon,
  count,
  href,
}: VehicleTypeCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex-1">
            <h3 className="text-lg font-bold">{label}</h3>
            <CardDescription className="mt-1 text-xs">
              {description}
            </CardDescription>
          </div>
          <div className="text-primary ml-2 text-3xl">{icon}</div>
        </CardHeader>
        <CardContent>
          {count !== undefined && (
            <p className="text-muted-foreground text-sm">
              {count} vehicles available
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function VehicleTypeSelector() {
  const categories = [
    {
      title: "🚗 Cars",
      description: "Explore all types of cars available",
      types: [
        {
          name: "Compact Cars",
          description: "Small & efficient",
          icon: <Zap className="h-8 w-8" />,
          href: "/vehicles/cars",
        },
        {
          name: "Sedan",
          description: "Comfortable & smooth",
          icon: <Car className="h-8 w-8" />,
          href: "/vehicles/cars?type=sedan",
        },
        {
          name: "SUV",
          description: "Spacious & powerful",
          icon: <Mountain className="h-8 w-8" />,
          href: "/vehicles/cars?type=suv",
        },
        {
          name: "Truck",
          description: "Heavy duty",
          icon: <Truck className="h-8 w-8" />,
          href: "/vehicles/cars?type=truck",
        },
        {
          name: "Van",
          description: "Group travel",
          icon: <Users className="h-8 w-8" />,
          href: "/vehicles/cars?type=van",
        },
        {
          name: "Luxury",
          description: "Premium experience",
          icon: <Crown className="h-8 w-8" />,
          href: "/vehicles/cars?type=luxury",
        },
      ],
    },
    {
      title: "🏍️ Motorcycles",
      description: "Adventure on two wheels",
      types: [
        {
          name: "Motorcycles",
          description: "Adventure rides",
          icon: <Bike className="h-8 w-8" />,
          href: "/vehicles/motorcycles",
        },
        {
          name: "Scooters",
          description: "Easy city riding",
          icon: <Wind className="h-8 w-8" />,
          href: "/vehicles/motorcycles?type=scooter",
        },
        {
          name: "Cruisers",
          description: "Classic style",
          icon: <Bike className="h-8 w-8" />,
          href: "/vehicles/motorcycles?type=cruiser",
        },
        {
          name: "Sport Bikes",
          description: "High performance",
          icon: <TrendingUp className="h-8 w-8" />,
          href: "/vehicles/motorcycles?type=sportbike",
        },
      ],
    },
    {
      title: "⛵ Boats",
      description: "Water adventures await",
      types: [
        {
          name: "Yachts",
          description: "Luxury experience",
          icon: <Waves className="h-8 w-8" />,
          href: "/vehicles/boats",
        },
        {
          name: "Speed Boats",
          description: "Fast & thrilling",
          icon: <Wind className="h-8 w-8" />,
          href: "/vehicles/boats?type=speedboat",
        },
        {
          name: "Sailboats",
          description: "Classic sailing",
          icon: <Wind className="h-8 w-8" />,
          href: "/vehicles/boats?type=sailboat",
        },
        {
          name: "Fishing Boats",
          description: "Catch adventure",
          icon: <Waves className="h-8 w-8" />,
          href: "/vehicles/boats?type=fishing",
        },
      ],
    },
    {
      title: "🏕️ RVs & Campervans",
      description: "Mobile adventures",
      types: [
        {
          name: "RVs",
          description: "Full-size living",
          icon: <Home className="h-8 w-8" />,
          href: "/vehicles/rvs",
        },
        {
          name: "Campervans",
          description: "Compact camping",
          icon: <Home className="h-8 w-8" />,
          href: "/vehicles/rvs?type=campervan",
        },
        {
          name: "Motorhomes",
          description: "Luxury mobile living",
          icon: <Home className="h-8 w-8" />,
          href: "/vehicles/rvs?type=motorhome",
        },
      ],
    },
    {
      title: "🛞 Other Vehicles",
      description: "Unique experiences",
      types: [
        {
          name: "ATVs",
          description: "Off-road adventure",
          icon: <Mountain className="h-8 w-8" />,
          href: "/vehicles/other",
        },
        {
          name: "Bicycles",
          description: "Eco-friendly",
          icon: <Bike className="h-8 w-8" />,
          href: "/vehicles/other?type=bicycle",
        },
        {
          name: "E-Bikes",
          description: "Electric cycling",
          icon: <Zap className="h-8 w-8" />,
          href: "/vehicles/other?type=ebike",
        },
      ],
    },
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Choose Your Vehicle</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Browse our extensive selection of vehicles for every adventure. From
          cars to boats to RVs, find the perfect rental for your needs.
        </p>
      </div>

      {/* Category Sections */}
      {categories.map((category) => (
        <div key={category.title} className="space-y-4">
          <div>
            <h2 className="mb-2 text-3xl font-bold">{category.title}</h2>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          {/* Vehicle Type Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.types.map((vehicle) => (
              <VehicleTypeCard
                key={vehicle.name}
                type={vehicle.name}
                label={vehicle.name}
                description={vehicle.description}
                icon={vehicle.icon}
                href={vehicle.href}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Browse All Button */}
      <div className="flex justify-center pt-8">
        <Button asChild size="lg" className="px-8">
          <Link href="/vehicles/all">Browse All Vehicles</Link>
        </Button>
      </div>
    </div>
  );
}
