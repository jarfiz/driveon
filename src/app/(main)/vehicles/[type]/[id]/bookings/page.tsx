import Bookings from "@/components/vehicles/bookings";

export default async function Page({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;

  if (type === "cars" && id) return <Bookings />;

  return <div>404 - not found</div>;
}
