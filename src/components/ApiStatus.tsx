"use client";

import { useState, useEffect } from "react";

// No props needed for this component
const ApiStatus = () => {
  const [signalRStatus, setSignalRStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [userApiStatus, setUserApiStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    // More reliable way to check remote service availability
    const pingEndpoint = async (url: string): Promise<boolean> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      try {
        await fetch(url, {
          method: "GET",
          mode: "no-cors", // This prevents CORS errors
          cache: "no-store", // Don't cache the result
          signal: controller.signal,
          headers: { Accept: "*/*" },
        });

        clearTimeout(timeoutId);
        // With no-cors we can't actually read the response, but if we get here,
        // the server is reachable (though we don't know if it returned success)
        return true;
      } catch (error) {
        clearTimeout(timeoutId);
        console.warn(`Failed to ping ${url}:`, error);
        return false;
      }
    };

    // Check both APIs and update status
    const checkApis = async () => {
      // Check SignalR hub
      const signalRAvailable = await pingEndpoint(
        "https://tech-test.raintor.com/Hub"
      );
      setSignalRStatus(signalRAvailable ? "online" : "offline");

      // Check Users API
      const usersApiAvailable = await pingEndpoint(
        "https://tech-test.raintor.com/api/users/GetUsersList?take=1&skip=0"
      );
      setUserApiStatus(usersApiAvailable ? "online" : "offline");

      // Update the last checked timestamp
      setLastChecked(new Date());
    };

    // Initial check
    checkApis();

    // Set up an interval to check every 30 seconds
    const interval = setInterval(checkApis, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIndicator = (status: "checking" | "online" | "offline") => {
    switch (status) {
      case "online":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Online
          </span>
        );
      case "offline":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800">
            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
            Offline
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>
            Checking...
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-2 bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm">
      <h3 className="text-sm font-medium mb-3">API Status Dashboard</h3>
      <div className="grid grid-cols-2 gap-6 text-xs">
        <div className="flex flex-col items-center gap-2">
          <span className="font-medium">SignalR Hub</span>
          {getStatusIndicator(signalRStatus)}
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-medium">Users API</span>
          {getStatusIndicator(userApiStatus)}
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Last checked: {lastChecked.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ApiStatus;
