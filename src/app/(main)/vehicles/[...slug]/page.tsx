export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = slug[0];
  const id = slug[1];

  if (type === "cars") return <h1>Cars {id}</h1>;
  return <div>page</div>;
}
