"use client";

import { useEffect } from "react";
import { useUsersFeed } from "@/hooks/useUsersFeed";
import UserFeed from "@/components/UserFeed";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import PageLayout from "@/components/PageLayout";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div
      className="p-8 bg-error-color/5 border border-error-color/20 rounded-xl text-error-color shadow-md animate-fadeIn"
      role="alert"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-error-color/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="mb-6 text-lg opacity-90">{error.message}</p>
          <button
            className="btn btn-primary py-3 px-6 rounded-lg font-medium inline-flex items-center gap-2"
            onClick={resetErrorBoundary}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default function UserFeedPage() {
  const {
    users,
    error,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    total,
    mutate,
  } = useUsersFeed();

  // Log the progress for debugging
  useEffect(() => {
    if (total) {
      console.log(`Loaded ${users.length} of ${total} users`);
    }
  }, [users.length, total]);

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-white via-background-light to-white py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-accent-color">
              User Directory
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-6">
              <p className="text-lg text-text-secondary">
                Browse through our community members
              </p>
              {total && !isLoading && (
                <span className="px-4 py-1.5 bg-primary-color/10 text-primary-color rounded-full text-sm font-medium">
                  Showing {users.length} of {total} users
                </span>
              )}
            </div>
          </header>

          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // Reset the state when the user clicks "Try again"
              mutate();
            }}
          >
            <div className="mb-8 flex justify-between items-center animate-fadeIn">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-accent-color"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-text-primary">
                  Community Members
                </h2>
              </div>

              <button
                onClick={() => mutate()}
                className="btn btn-primary flex items-center gap-1.5 py-2"
                aria-label="Refresh user list"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>

            <div className="animate-slideUp px-1">
              <UserFeed
                users={users}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                error={error}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </PageLayout>
  );
}
