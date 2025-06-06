import type { Metadata } from "next";
import "./globals.css";
import "../styles/theme.css";
import GoogleAnalytics from "../../components/GoogleAnalytics"; // Adjust path as needed

export const metadata: Metadata = {
  title: "Umbra - Data with privacy, not piracy.",
  description: "Umbra's personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/peakpx(1).jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/images/peakpx.jpg" media="(min-width: 768px)" />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
