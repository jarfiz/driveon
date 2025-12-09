import db from "@/server/db";

async function seed() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const admin = await db.user.upsert({
    where: { email: "admin@vehicleshare.com" },
    update: {},
    create: {
      id: "admin-1",
      name: "Admin User",
      email: "admin@vehicleshare.com",
      emailVerified: true,
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log("✅ Admin user created:", admin.id);

  // Create host users
  const hostIds = [];
  for (let i = 1; i <= 3; i++) {
    const host = await db.user.upsert({
      where: { email: `host${i}@vehicleshare.com` },
      update: {},
      create: {
        id: `host-${i}`,
        name: `Host User ${i}`,
        email: `host${i}@vehicleshare.com`,
        emailVerified: true,
        role: "HOST",
        isHost: true,
        hostJoinedAt: new Date(),
        hostRating: 4.5 + i * 0.1,
        hostReviews: 10 + i * 5,
        isActive: true,
      },
    });
    hostIds.push(host.id);
    console.log(`✅ Host ${i} created:`, host.id);
  }

  // Create guest users
  for (let i = 1; i <= 5; i++) {
    const guest = await db.user.upsert({
      where: { email: `guest${i}@vehicleshare.com` },
      update: {},
      create: {
        id: `guest-${i}`,
        name: `Guest User ${i}`,
        email: `guest${i}@vehicleshare.com`,
        emailVerified: true,
        role: "USER",
        guestRating: 4.0 + i * 0.1,
        guestReviews: 5 + i,
        isActive: true,
      },
    });
    console.log(`✅ Guest ${i} created:`, guest.id);
  }

  // Create vehicles
  const vehicles = [
    {
      brand: "Toyota",
      model: "Camry",
      year: 2023,
      color: "Silver",
      transmission: "Automatic",
      fuelType: "Petrol",
      features: ["Air Conditioning", "GPS", "Cruise Control"],
    },
    {
      brand: "Honda",
      model: "Civic",
      year: 2022,
      color: "Blue",
      transmission: "Automatic",
      fuelType: "Petrol",
      features: ["Air Conditioning", "WiFi", "Bluetooth"],
    },
    {
      brand: "BMW",
      model: "X5",
      year: 2023,
      color: "Black",
      transmission: "Automatic",
      fuelType: "Diesel",
      features: ["Leather Seats", "Panoramic Roof", "GPS", "Heated Seats"],
    },
  ];

  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = await db.vehicle.upsert({
      where: {
        licensePlate: `LP${String(i + 1).padStart(4, "0")}`,
      },
      update: {},
      create: {
        brand: vehicles[i].brand,
        model: vehicles[i].model,
        year: vehicles[i].year,
        licensePlate: `LP${String(i + 1).padStart(4, "0")}`,
        color: vehicles[i].color,
        transmission: vehicles[i].transmission,
        fuelType: vehicles[i].fuelType,
        description: `Beautiful ${vehicles[i].brand} ${vehicles[i].model} ready for rent`,
        features: vehicles[i].features,
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        ],
        status: "ACTIVE",
        hostId: hostIds[i % hostIds.length],
      },
    });
    console.log(
      `✅ Vehicle ${i + 1} created:`,
      `${vehicle.brand} ${vehicle.model}`,
    );

    // Create listing for each vehicle
    await db.listing.upsert({
      where: { vehicleId: vehicle.id },
      update: {},
      create: {
        vehicleId: vehicle.id,
        hostId: vehicle.hostId,
        pricePerDay: 50 + i * 30,
        depositAmount: 500 + i * 100,
        deliveryCharge: 50,
        minRentalDays: 1,
        maxRentalDays: 365,
        allowInstantBooking: true,
        requireApproval: false,
        allowPets: i % 2 === 0,
        allowSmoking: false,
        isActive: true,
      },
    });
    console.log(`✅ Listing created for ${vehicle.brand} ${vehicle.model}`);
  }

  console.log("🎉 Database seed completed successfully!");
}

seed()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
