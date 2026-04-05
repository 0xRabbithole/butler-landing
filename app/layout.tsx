import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Butler — A little helper for the things you'd rather not forget",
  description:
    "Butler remembers so you don't have to — and helps the people who love you help you. From morning pills to your daughter's birthday.",
  openGraph: {
    title: "Butler",
    description:
      "A little helper for the things you'd rather not forget.",
    url: "https://mybutler.pro",
    siteName: "Butler",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23160F22'/><text x='16' y='22' text-anchor='middle' font-family='Georgia,serif' font-size='18' fill='%23F5C842' font-style='italic'>B</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="paper-grain font-sans antialiased">{children}</body>
    </html>
  );
}
