import Cars from "@/components/vehicles/cars";

export default async function Page({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;

  if (type === "cars" && id) return <Cars id={id} />;

  return <div>404 - not found</div>;
}
