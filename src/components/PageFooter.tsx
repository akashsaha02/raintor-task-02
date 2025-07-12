"use client";

import Link from "next/link";

const PageFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-500 text-sm">
              Raintor Tech Test - {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold mb-2">Features</h3>
              <nav className="flex flex-col gap-1">
                <Link
                  href="/location-sharing"
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  Location Sharing
                </Link>
                <Link
                  href="/user-feed"
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  User Feed
                </Link>
              </nav>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold mb-2">Technologies</h3>
              <nav className="flex flex-col gap-1">
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  Next.js
                </a>
                <a
                  href="https://dotnet.microsoft.com/apps/aspnet/signalr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  SignalR
                </a>
                <a
                  href="https://swr.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  SWR
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
