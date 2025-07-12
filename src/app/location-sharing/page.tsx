"use client";

import { useState } from "react";
import { useSignalR } from "@/hooks/useSignalR";
import LocationMap from "@/components/LocationMap";
import LocationSender from "@/components/LocationSender";
import PageLayout from "@/components/PageLayout";

export default function LocationSharingPage() {
  const [userName, setUserName] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Initialize SignalR connection only when username is submitted
  const { isConnected, lastReceivedLocation, sendLocation, connectionError } =
    useSignalR({
      userName: isSubmitted ? userName : "", // Pass empty string before submission
    });

  // Handle form submission to connect with username
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      console.log("Submitting username:", userName);
      setIsSubmitted(true); // This will trigger useSignalR with the proper username
    }
  };

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real-Time Location Sharing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your location and see updates from other users in real-time
              using SignalR WebSockets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="order-2 lg:order-1">
              <div className="animate-slideUp">
                {!isSubmitted ? (
                  <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      Enter Your Email
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                          Email / Username
                        </label>
                        <input
                          type="email"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="block w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                          placeholder="you@example.com"
                          required
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          This will be used as your identifier in the location
                          sharing
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors text-base font-medium"
                      >
                        Connect to Location Service
                      </button>
                    </form>
                  </div>
                ) : (
                  <LocationSender
                    onSendLocation={sendLocation}
                    isConnected={isConnected}
                  />
                )}

                {connectionError && (
                  <div className="mt-6 p-5 bg-red-50 text-red-700 rounded-lg border border-red-200 animate-pulse">
                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
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
                      <strong className="text-lg">Connection Error</strong>
                    </div>
                    <p>{connectionError.message}</p>
                  </div>
                )}

                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-bold mb-4">Connection Status</h2>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`w-4 h-4 rounded-full mr-3 ${
                        isConnected
                          ? "bg-green-500 animate-pulse"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-lg">
                      {isConnected ? "Connected" : "Disconnected"}
                    </span>
                  </div>

                  {isConnected && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-base text-blue-700">
                        Connected as:{" "}
                        <span className="font-semibold">{userName}</span>
                      </p>
                    </div>
                  )}

                  {lastReceivedLocation && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">
                        Last Received Location
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded shadow-sm">
                          <span className="text-sm text-gray-500">User</span>
                          <p className="font-medium">
                            {lastReceivedLocation.userName}
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded shadow-sm">
                          <span className="text-sm text-gray-500">Time</span>
                          <p className="font-medium">
                            {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded shadow-sm">
                          <span className="text-sm text-gray-500">
                            Latitude
                          </span>
                          <p className="font-medium">
                            {lastReceivedLocation.lat.toFixed(6)}
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded shadow-sm">
                          <span className="text-sm text-gray-500">
                            Longitude
                          </span>
                          <p className="font-medium">
                            {lastReceivedLocation.lon.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white p-6 rounded-xl shadow-md animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6">Location Map</h2>
                <div className="rounded-lg overflow-hidden">
                  <LocationMap location={lastReceivedLocation} />

                  {!lastReceivedLocation && (
                    <div className="mt-4 p-4 bg-gray-50 border-t text-center">
                      <p className="text-gray-500">
                        No location updates received yet. Connect and send a
                        location, or wait for updates from other users.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
