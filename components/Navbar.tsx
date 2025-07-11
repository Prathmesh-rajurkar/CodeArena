'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

Navbar
import React, { useState } from "react";

function Navbars() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const navItems = [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Practice",
          link: "questions",
        },
        {
          name: "Compete",
          link: "contest",
        },
      ];
  return (
    <div className="relative w-full">
      <Navbar className="dark">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <div className="">
              {/* search bar */}
              {/* <form className="relative flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search Question"
                    className="bg-gray-800 text-white rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                  <Button className="text-white bg-cyan-600 rounded-full p-2 hover:bg-cyan-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </Button>
                </form> */}
            </div>
            {!isAuthenticated ? (
              <div>
                <NavbarButton className="" href="/signup" variant="secondary">
                  SignUp
                </NavbarButton>
                <NavbarButton
                  className="bg-cyan-600 "
                  href="/login"
                  variant="secondary"
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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
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
