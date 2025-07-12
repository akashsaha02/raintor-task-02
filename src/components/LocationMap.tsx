"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LocationData } from "@/types";

// Define default props for the map
const DEFAULT_CENTER: [number, number] = [51.505, -0.09]; // Default to London
const DEFAULT_ZOOM = 13;

// Dynamically import react-leaflet components to avoid SSR issues
const MapComponents = dynamic(
  () => import("./MapComponents").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] bg-gray-100 flex items-center justify-center">
        Loading map...
      </div>
    ),
  }
);

interface LocationMapProps {
  location?: LocationData | null;
}

const LocationMap = ({ location }: LocationMapProps) => {
  const [clientSideComponent, setClientSideComponent] = useState(false);

  // Make sure we're on the client side before rendering map components
  useEffect(() => {
    setClientSideComponent(true);
  }, []);

  // Debug: Log when location data changes
  useEffect(() => {
    console.log("LocationMap received location data:", location);
  }, [location]);

  // Calculate position based on location or default
  const position: [number, number] = location
    ? [location.lat, location.lon]
    : DEFAULT_CENTER;

  if (!clientSideComponent) {
    return (
      <div className="h-[400px] bg-gray-100 flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  // Render the map only on client-side
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <MapComponents
        center={position}
        zoom={DEFAULT_ZOOM}
        location={location || null}
      />
      {!location && (
        <div className="p-3 text-center text-sm text-gray-500 bg-white border-t">
          No location data received yet
        </div>
      )}
    </div>
  );
};

export default LocationMap;
