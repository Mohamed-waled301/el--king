import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./context/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "El King — Smart Phone Accessories",
  description: "Premium phone accessories, cases, chargers, and more. Fast delivery across Egypt.",
  keywords: ["phone accessories", "iPhone cases", "Samsung accessories", "El King", "phone chargers"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
