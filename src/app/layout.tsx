import type { Metadata } from "next";
import { Phudu, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const phudu = Phudu({
  subsets: ["latin"],
  variable: "--font-phudu",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Last Management System",
  description: "Space Theme Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          phudu.variable,
          spaceGrotesk.variable,
          spaceMono.variable,
          "font-mono antialiased bg-space-gradient min-h-screen text-space-300 selection:bg-space-500 selection:text-white"
        )}
      >
        {children}
      </body>
    </html>
  );
}