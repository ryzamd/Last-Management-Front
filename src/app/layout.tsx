import type { Metadata } from "next";
import { Phudu } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const phudu = Phudu({
  subsets: ["latin"],
  variable: "--font-phudu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Last Management System",
  description: "Space Theme Management Dashboard",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          phudu.variable, // Inject font
          "font-phudu antialiased bg-space-gradient min-h-screen text-space-300 selection:bg-space-500 selection:text-white"
        )}
      >
        {children}
      </body>
    </html>
  );
}