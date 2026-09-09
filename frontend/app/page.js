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
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            marginTop: 0,
            marginBottom: "1rem",
          }}
        >
          {data.message}
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            backgroundColor: "#f9fafb",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #f3f4f6",
            marginBottom: "1.25rem",
          }}
        >
          <p style={{ margin: 0, color: "#374151" }}>
            Backend version:{" "}
            <b
              style={{
                backgroundColor: "#e0e7ff",
                color: "#3730a3",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.875rem",
              }}
            >
              {data.version}
            </b>
          </p>
          <p style={{ margin: 0, color: "#374151", fontSize: "0.9rem" }}>
            Server time: <b>{data.timestamp}</b>
          </p>
        </div>

        <p
          style={{
            color: "#6b7280",
            fontSize: "0.85rem",
            lineHeight: "1.4",
            margin: 0,
          }}
        >
          Change the message or version in <code>HelloController.java</code>,
          commit, and this page should update after Jenkins redeploys.
        </p>
      </div>
    </main>
  );
}