"use client";

import Link from "next/link";
import Image from "next/image";
import ApiStatus from "@/components/ApiStatus";
import { useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink = ({ href, children, isActive }: NavLinkProps) => (
  <Link
    href={href}
    className={`relative px-4 py-2 rounded-md transition-all ${
      isActive
        ? "text-blue-600 font-medium before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`}
  >
    {children}
  </Link>
);

interface PageHeaderProps {
  currentPath: string;
}

const PageHeader = ({ currentPath }: PageHeaderProps) => {
  const [showStatus, setShowStatus] = useState(false);

  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-10">
            <Image
              src="/next.svg"
              alt="Raintor Logo"
              width={30}
              height={30}
              className="dark:invert"
            />
            <span className="font-bold text-lg hidden sm:inline">Raintor</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/" isActive={currentPath === "/"}>
              Home
            </NavLink>
            <NavLink
              href="/location-sharing"
              isActive={currentPath === "/location-sharing"}
            >
              Location Sharing
            </NavLink>
            <NavLink href="/user-feed" isActive={currentPath === "/user-feed"}>
              User Feed
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowStatus(!showStatus)}
            className="text-gray-600 hover:text-blue-600 flex items-center gap-1 text-sm border border-gray-200 rounded-full px-3 py-1 hover:border-blue-300 transition-colors"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                showStatus ? "bg-green-500" : "bg-blue-500"
              } animate-pulse-slow`}
            ></span>
            API Status
          </button>
        </div>
      </div>

      {showStatus && (
        <div className="absolute top-full left-0 w-full mt-1 px-6 pb-4 animate-slideUp">
          <div className="max-w-xs mx-auto">
            <ApiStatus />
          </div>
        </div>
      )}

      {/* Mobile navigation */}
      <nav className="md:hidden flex justify-center w-full mt-4 bg-gray-50 rounded-lg">
        <div className="flex w-full max-w-xs justify-between">
          <NavLink href="/" isActive={currentPath === "/"}>
            <span className="flex flex-col items-center text-xs py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </span>
          </NavLink>
          <NavLink
            href="/location-sharing"
            isActive={currentPath === "/location-sharing"}
          >
            <span className="flex flex-col items-center text-xs py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Location
            </span>
          </NavLink>
          <NavLink href="/user-feed" isActive={currentPath === "/user-feed"}>
            <span className="flex flex-col items-center text-xs py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Users
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default PageHeader;
