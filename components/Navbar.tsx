'use client'

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

function Navbars() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  setIsAuthenticated(false); // Set to false for testing, change as needed
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Practice", link: "/questions" },
    { name: "Compete", link: "/contest" },
  ];

  return (
    <div className="relative w-full">
      <Navbar className="dark">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === item.link
                    ? "text-white underline underline-offset-4"
                    : "text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <NavbarButton href="/signup" variant="secondary">
                  SignUp
                </NavbarButton>
                <NavbarButton
                  href="/login"
                  variant="secondary"
                  className="bg-cyan-600"
                >
                  Login
                </NavbarButton>
              </div>
            ) : (
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block py-2 text-sm font-medium",
                  pathname === item.link
                    ? "text-white underline underline-offset-4"
                    : "text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex w-full flex-col gap-4 mt-4">
              {!isAuthenticated ? (
                <div className="flex flex-row gap-2">
                  <NavbarButton
                    className="bg-gray-900 text-white w-full"
                    href="/signup"
                    variant="secondary"
                  >
                    SignUp
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                    href="/login"
                  >
                    Login
                  </NavbarButton>
                </div>
              ) : (
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default Navbars;
