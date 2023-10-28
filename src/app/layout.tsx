import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON to Typescript Types Generator",
  description:
    "Generate Typescript types from JSON. Paste and Generate typescript types from JSON.",
  authors: { name: "bibekjodd", url: "https://github.com/bibekjodd" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Toaster richColors duration={5000} closeButton theme="dark" />
        {children}
      </body>
    </html>
  );
}
