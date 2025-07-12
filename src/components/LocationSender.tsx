"use client";

import { useState } from "react";

interface LocationSenderProps {
  onSendLocation: (lat: number, lon: number) => Promise<void>;
  isConnected: boolean;
}

const LocationSender = ({
  onSendLocation,
  isConnected,
}: LocationSenderProps) => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendLocation = async () => {
    setError(null);

    // Check connection status first
    if (!isConnected) {
      setError(
        "Cannot send location: Not connected to SignalR server. Please wait for connection or refresh the page."
      );
      return;
    }

    // Validate inputs
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      setError("Please enter valid latitude and longitude values");
      return;
    }

    if (lat < -90 || lat > 90) {
      setError("Latitude must be between -90 and 90");
      return;
    }

    if (lon < -180 || lon > 180) {
      setError("Longitude must be between -180 and 180");
      return;
    }

    setIsSending(true);
    try {
      console.log(`Sending location: Lat ${lat}, Lon ${lon}`);
      await onSendLocation(lat, lon);
      console.log("Location sent successfully. Check map for update.");

      // Show success message
      setError(null);
    } catch (err) {
      console.error("Location sending error:", err);
      setError(
        `Failed to send location: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setError(null);
        },
        (err) => {
          setError(`Failed to get location: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Send Location</h2>

      <div className="flex flex-col space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Latitude
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter latitude (e.g. 51.507351)"
              disabled={!isConnected || isSending}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Longitude
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter longitude (e.g. -0.127758)"
              disabled={!isConnected || isSending}
            />
          </label>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleSendLocation}
          disabled={!isConnected || isSending}
          className={`${
            isConnected ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          } text-white py-2 px-4 rounded-md transition-colors`}
        >
          {isSending ? "Sending..." : "Send Location"}
        </button>

        <button
          onClick={handleGetCurrentLocation}
          disabled={isSending}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors"
        >
          Use Current Location
        </button>
      </div>

      {!isConnected && (
        <p className="mt-2 text-sm text-red-600">
          Not connected to SignalR server
        </p>
      )}
    </div>
  );
};

export default LocationSender;
