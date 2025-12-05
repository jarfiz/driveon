import VehicleTypeSelector from "@/components/vehicles/vehicle-type-selector";

export const metadata = {
  title: "Browse Vehicles | VehicleShare",
  description:
    "Browse our extensive selection of vehicles including cars, motorcycles, boats, RVs, and more.",
};

export default function VehiclesPage() {
  return (
    <main className="from-background to-secondary/20 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <VehicleTypeSelector />
      </div>
    </main>
  );
}
