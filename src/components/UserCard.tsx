"use client";

import { User } from "@/types";
import Image from "next/image";
import UserCardActions from "./UserCardActions";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="card bg-white rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg border border-border-color animate-fadeIn">
      <div className="p-5 flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md border-2 border-primary-color/20 group">
            <Image
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="80px"
              className="rounded-full transition-transform group-hover:scale-110 duration-500"
            />
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-text-primary mb-2 flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
              {user.firstName} {user.lastName}
            </span>
          </h3>

          <div className="text-sm text-text-secondary grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
            <div className="flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-primary-color"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="truncate hover:text-primary-color">
                {user.email}
              </span>
            </div>

            <div className="flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-secondary-color"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="truncate hover:text-secondary-color">
                {user.phone}
              </span>
            </div>

            <div className="flex items-center gap-2 md:col-span-2 transition-transform hover:translate-x-1 duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-accent-color"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="truncate hover:text-accent-color">
                {user.company.title}
              </span>
            </div>

            <div className="flex items-center gap-2 md:col-span-2 transition-transform hover:translate-x-1 duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-info-color"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
              <span className="truncate hover:text-info-color">
                {user.university}
              </span>
            </div>
          </div>
        </div>
      </div>

      <UserCardActions user={user} />
    </div>
  );
};

export default UserCard;
