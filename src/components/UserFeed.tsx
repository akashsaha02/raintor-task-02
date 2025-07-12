"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import UserCard from "./UserCard";
import UserCardSkeleton from "./UserCardSkeleton";
import { User } from "@/types";

interface UserFeedProps {
  users: User[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

const UserFeed = ({
  users,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  onLoadMore,
}: UserFeedProps) => {
  // Set up the intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px 0px", // Start loading more users before the user reaches the bottom
  });

  // Load more when we reach the bottom and have more users to load
  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoadingMore, isLoading, onLoadMore]);

  // Generate skeleton loaders
  const skeletons = Array(6)
    .fill(0)
    .map((_, index) => <UserCardSkeleton key={`skeleton-${index}`} />);

  if (isLoading && users.length === 0) {
    return (
      <div className="animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{skeletons}</div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">
          {" "}
          Failed to load users: {error.message}
        </span>
        <button
          onClick={() => onLoadMore()}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-6"
      role="feed"
      aria-live="polite"
      aria-busy={isLoading}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            tabIndex={0}
            className="transform transition-all duration-300"
          >
            <UserCard user={user} />
          </div>
        ))}
      </div>

      {/* Loading more indicator */}
      {isLoadingMore && (
        <div className="pt-2 pb-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skeletons[0]}
            {skeletons[1]}
          </div>
        </div>
      )}

      {/* Error loading more */}
      {error && users.length > 0 && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm relative mb-4 animate-fadeIn"
          role="alert"
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              Failed to load more users: {error.message}
            </span>
          </div>
          <button
            onClick={() => onLoadMore()}
            className="mt-3 btn btn-primary inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Retry
          </button>
        </div>
      )}

      {/* Invisible element that triggers the load more when it comes into view */}
      {hasMore && !error && (
        <div ref={ref} className="h-10" aria-hidden="true"></div>
      )}

      {/* End of list message */}
      {!hasMore && users.length > 0 && (
        <div className="text-center py-8 text-gray-500 animate-fadeIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto mb-2 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-lg font-medium">
            You&apos;ve reached the end of the list
          </p>
          <p className="text-sm mt-1">All users have been loaded</p>
        </div>
      )}
    </div>
  );
};

export default UserFeed;
