"use client";

import { useState } from "react";
import { User } from "@/types";

interface UserCardActionsProps {
  user: User;
}

const UserCardActions = ({ user }: UserCardActionsProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="mt-3 border-t border-border-color pt-3 px-5 pb-4">
      <div className="flex justify-between items-center">
        <button
          onClick={toggleDetails}
          className="text-sm flex items-center gap-1 text-primary-color hover:text-primary-hover transition-colors"
        >
          <span>{showDetails ? "Hide Details" : "View Details"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${
              showDetails ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div className="flex gap-2">
          <button className="btn btn-primary px-3 py-1 text-xs rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Message
          </button>

          <button className="btn btn-secondary px-3 py-1 text-xs rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Follow
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 p-3 bg-background-light rounded-md animate-slideUp text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-text-tertiary mb-1">Address</p>
              <p className="text-text-secondary">
                {user.address.address}, {user.address.city},{" "}
                {user.address.state} {user.address.postalCode}
              </p>
            </div>

            <div>
              <p className="text-text-tertiary mb-1">Company</p>
              <p className="text-text-secondary">
                {user.company.name} - {user.company.department}
              </p>
            </div>

            {user.bank && (
              <div className="md:col-span-2">
                <p className="text-text-tertiary mb-1">Bank</p>
                <p className="text-text-secondary">
                  {user.bank.cardType}: **** **** ****{" "}
                  {user.bank.cardNumber.slice(-4)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCardActions;
