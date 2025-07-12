"use client";

import useSWRInfinite from "swr/infinite";
import { UsersListResponse } from "@/types";

// API URL from the task requirements
const API_URL = "https://tech-test.raintor.com/api/users/GetUsersList";
const USERS_PER_PAGE = 10;

// Define fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url, {
    // Add these options to avoid CORS issues
    credentials: "omit", // Don't include credentials
    mode: "cors", // Explicitly use CORS mode
    headers: {
      // Set appropriate headers
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  return response.json() as Promise<UsersListResponse>;
};

export function useUsersFeed() {
  // Define the SWR infinite key function
  const getKey = (
    pageIndex: number,
    previousPageData: UsersListResponse | null
  ) => {
    // If we have no previous page data, or if we've reached the end (total users)
    if (previousPageData && !previousPageData.users.length) return null;

    // Add the page index to the API URL
    return `${API_URL}?take=${USERS_PER_PAGE}&skip=${
      pageIndex * USERS_PER_PAGE
    }`;
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Combine users from all pages
  const users = data ? data.flatMap((page) => page.users) : [];

  // Check if there are more users to load
  const isReachingEnd =
    data && data[data.length - 1]?.users.length < USERS_PER_PAGE;
  const hasMore = !isReachingEnd;

  // Get the total number of users from the API response
  const total = data && data[0]?.total;

  return {
    users,
    error,
    isLoading: !data && !error,
    isLoadingMore: size > 0 && typeof data?.[size - 1] === "undefined",
    hasMore,
    total,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}

export default useUsersFeed;
