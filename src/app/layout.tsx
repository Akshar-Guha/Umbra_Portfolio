import type { Metadata } from "next";
import "./globals.css";
import "../styles/theme.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
