async function getHello() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`, {
    cache: "no-store", // always fetch fresh so redeploys are visible immediately
  });
  if (!res.ok) {
    return { message: "Could not reach backend", version: "-", timestamp: "-" };
  }
  return res.json();
}

export default async function Home() {
  const data = await getHello();

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>{data.message}</h1>
      <p>Backend version: <b>{data.version}</b></p>
      <p>Server time: {data.timestamp}</p>
      <p style={{ color: "#888" }}>
        Change the message or version in HelloController.java, commit, and this
        page should update after Jenkins redeploys.
      </p>
    </main>
  );
}
