export const metadata = {
  title: "Jenkins Demo",
  description: "Simple Next.js + Spring Boot demo for Jenkins CI/CD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
