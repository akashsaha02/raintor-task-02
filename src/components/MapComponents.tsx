"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocationData } from "@/types";

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapComponentsProps {
  location: LocationData | null;
  center: [number, number];
  zoom: number;
}

// Components that depend on Leaflet, separated to enable dynamic import
const MapComponents = ({ location, center, zoom }: MapComponentsProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
      className="rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location && (
        <Marker position={[location.lat, location.lon]} icon={defaultIcon}>
          <Popup>
            User: {location.userName || "Anonymous"}
            <br />
            Lat: {location.lat.toFixed(6)}
            <br />
            Lon: {location.lon.toFixed(6)}
          </Popup>
        </Marker>
      )}
      {/* Debug marker - always visible at center */}
      <Marker position={center} icon={defaultIcon}>
        <Popup>
          Map Center
          <br />
          Lat: {center[0].toFixed(6)}
          <br />
          Lon: {center[1].toFixed(6)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponents;
