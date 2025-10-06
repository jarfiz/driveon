import Bookings from "@/components/vehicles/bookings";
import Cars from "@/components/vehicles/cars";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = slug[0];
  const id = slug[1];
  const bookings = slug[2];

  if (type === "cars" && id && bookings === "bookings") return <Bookings />;
  if (type === "cars" && id && bookings !== "bookings")
    return <h1>404 route</h1>;
  if (type === "cars" && id) return <Cars id={id} />;
  if (type === "cars") return <Cars />;

  return <div>page</div>;
}
