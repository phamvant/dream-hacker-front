import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import "./globals.css";
import { cn } from "./lib/utils";
import { Topbar } from "./components/Topbar";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "./ui/ThemeProvider";

export const metadata: Metadata = {
  title: "Dreamhacker",
  description: "Study abroad oppotunities",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Topbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
