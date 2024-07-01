import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import "./globals.css";
import { cn } from "./lib/utils";
import { Topbar } from "./components/Topbar";

export const metadata: Metadata = {
  title: "Dreamhacker",
  description: "Study abroad oppotunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-6xl m-auto",
          inter.className,
        )}
      >
        <Topbar />
        {children}
      </body>
    </html>
  );
}
