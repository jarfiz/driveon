import Cars from "@/components/vehicles/cars";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = slug[0];
  const id = slug[1];

  if (type === "cars") return <Cars id={id} />;

  return <div>page</div>;
}
