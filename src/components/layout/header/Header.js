"use client";

import React, { useState } from "react";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";
import GYSLogo from "@/assets/GYS_LOGO.png";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ToggleTheme";
import { usePathname } from "next/navigation";
import NavItems from "@/components/ui/Animations/NavItems";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/aboutus" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black/10 backdrop-blur-md shadow-md transition-all">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between items-center h-14 sm:h-14 md:h-16">
          <Link href="/" className="flex items-center gap-2">
            {/* <Image
              src={GYSLogo}
              height={150}
              width={150}
              alt="GYS Technologies Logo"
              className="h-22 w-22"
            /> */}
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
         
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-base font-medium transition-colors ${isActive
                      ? "text-violet-600 dark:text-violet-400 font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400"
                    }`}
                >
                  {item.label}
                  
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/services"
              className="hidden md:inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 lg:px-6 rounded-4xl"
            >
              Explore More
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <i className="ri-close-line text-2xl text-black dark:text-white"></i>
              ) : (
                <i className="ri-menu-line text-2xl text-black dark:text-white"></i>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 space-y-2 py-2 shadow-lg">

            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-center text-sm py-2 border-b border-gray-200 dark:border-gray-700 ${isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="flex justify-center">
              <Link
                href="/services"
                className="p-2 mt-2 bg-purple-600 text-center text-sm hover:bg-purple-700 text-white font-medium rounded-4xl w-full"
              >
                Explore More
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
