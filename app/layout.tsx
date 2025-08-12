"use client";

import "./globals.css";
// import type { Metadata } from "next";
import Navbars from "@/components/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

// You can't export metadata from a client component. Move it to a server file if needed.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <Providers>
          {shouldShowNavbar && <Navbars />}
          <main className="flex-1">{children}</main>
          <Toaster/>
          <ShootingStars className="-z-50 h-full" />
          <StarsBackground className="-z-50 h-screen" />
        </Providers>
      </body>
    </html>
  );
}
