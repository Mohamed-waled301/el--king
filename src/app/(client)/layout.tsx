import React from "react";
import { Navbar } from "../../components/Navbar";
import { CartDrawer } from "../../components/CartDrawer";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      <main className="flex-1 pt-20">{children}</main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for SmartPhone Accessories E-Commerce.
          </p>
        </div>
      </footer>
    </div>
  );
}
