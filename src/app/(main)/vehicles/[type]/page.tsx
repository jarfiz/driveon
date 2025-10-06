import Cars from "@/components/vehicles/cars";

export default async function Page({ params }: { params: { type: string } }) {
  const { type } = params;

  if (type === "cars") return <Cars />;

  return <div>404 - not found</div>;
}
