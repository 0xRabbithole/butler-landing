import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

// NOTE: Metadata stays English on the server render for SEO / OG reasons —
// the landing site is primarily discovered via English search queries, and
// the og:title / og:description are shown outside the page where our client
// i18n can't reach. The in-page <title> updates on the client via the
// language switcher so the browser tab reflects the user's choice.
export const metadata: Metadata = {
  title: "Butler — A little helper for the things you'd rather not forget",
  description:
    "Butler remembers so you don't have to — and helps the people who love you help you. From morning pills to your daughter's birthday.",
  openGraph: {
    title: "Butler",
    description: "A little helper for the things you'd rather not forget.",
    url: "https://mybutler.pro",
    siteName: "Butler",
    type: "website",
  },
  icons: {
    icon: "/butler-mark.png",
    apple: "/butler-mark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="en" is the initial server render; the LanguageProvider updates
    // document.documentElement.lang on the client once the user's preference
    // is known.
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="paper-grain font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
