"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { LocationData } from "@/types";

// Hub URL from the task requirements
const SIGNALR_URL = "https://tech-test.raintor.com/Hub";

interface UseSignalROptions {
  userName: string;
}

interface UseSignalRReturn {
  connection: HubConnection | null;
  isConnected: boolean;
  lastReceivedLocation: LocationData | null;
  sendLocation: (lat: number, lon: number) => Promise<void>;
  connectionError: Error | null;
}

export const useSignalR = ({
  userName,
}: UseSignalROptions): UseSignalRReturn => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastReceivedLocation, setLastReceivedLocation] =
    useState<LocationData | null>(null);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  const connectionRef = useRef<HubConnection | null>(null);
  const userNameRef = useRef<string>(userName);

  // Initialize connection
  useEffect(() => {
    // Skip connection if username is empty
    if (!userName) {
      console.log("Skipping SignalR connection - username is empty");
      return;
    }

    // Skip if username hasn't changed and we already have a connection
    if (userName === userNameRef.current && connectionRef.current) {
      console.log(
        "Username unchanged and connection exists, skipping reconnect"
      );
      return;
    }

    // Update ref to track current username
    userNameRef.current = userName;

    const createConnection = async () => {
      try {
        console.log("Creating SignalR connection with username:", userName);

        // Stop existing connection if it exists
        if (connectionRef.current) {
          console.log("Stopping existing connection");
          await connectionRef.current.stop();
          connectionRef.current = null;
          setConnection(null);
          setIsConnected(false);
        }

        const newConnection = new HubConnectionBuilder()
          .withUrl(SIGNALR_URL, {
            withCredentials: false, // Don't send credentials to avoid CORS issues
            skipNegotiation: true, // Skip negotiation to avoid additional CORS request
            transport: 1, // Use WebSockets only (1 = WebSockets in SignalR)
          })
          .withAutomaticReconnect()
          .configureLogging(LogLevel.Information)
          .build();

        // Set up event handlers before starting the connection
        newConnection.on("ReceiveLatLon", (locationData: LocationData) => {
          console.log("Received location update:", locationData);
          setLastReceivedLocation(locationData);
        });

        // Handle connection state changes
        newConnection.onreconnecting(() => {
          console.log("SignalR attempting to reconnect...");
          setIsConnected(false);
        });

        newConnection.onreconnected(() => {
          console.log("SignalR reconnected");
          setIsConnected(true);
          setConnectionError(null);
        });

        newConnection.onclose(() => {
          console.log("SignalR connection closed");
          setIsConnected(false);
        });

        // Start the connection
        await newConnection.start();
        console.log("SignalR connection established");

        // Update both the state and ref
        connectionRef.current = newConnection;
        setConnection(newConnection);
        setIsConnected(true);
        setConnectionError(null);
      } catch (error) {
        console.error("Error establishing SignalR connection:", error);
        setConnectionError(
          error instanceof Error ? error : new Error(String(error))
        );
        setIsConnected(false);
        connectionRef.current = null;
      }
    };

    // Create a new connection when username changes
    createConnection();

    // Cleanup on unmount
    return () => {
      if (connectionRef.current) {
        console.log("Cleanup: stopping connection");
        connectionRef.current
          .stop()
          .catch((err) => console.error("Error stopping connection:", err));
        connectionRef.current = null;
      }
    };
  }, [userName]); // Only depend on userName

  // Function to send location updates
  const sendLocation = useCallback(
    async (lat: number, lon: number) => {
      // Validate inputs first
      if (!userName) {
        const error = new Error("Username is required to send location");
        console.error("Cannot send location:", error);
        throw error;
      }

      // Use the ref instead of state to avoid race conditions
      if (!connectionRef.current) {
        const error = new Error("SignalR connection has not been created");
        console.error("Cannot send location:", error);
        throw error;
      }

      if (!isConnected) {
        const error = new Error(
          "SignalR connection is not in the Connected state"
        );
        console.error("Cannot send location:", error);
        throw error;
      }

      try {
        // Check connection state directly from the connection object using ref
        if (connectionRef.current.state !== "Connected") {
          console.warn(
            "Connection state is not 'Connected', attempting to reconnect..."
          );

          // Attempt to restart the connection using ref
          await connectionRef.current.start();
          setIsConnected(true);
          console.log("Connection reestablished");
        }

        // Using the method name specified in the requirements with ref
        await connectionRef.current.invoke("SendLatLon", lat, lon, userName);
        console.log("Location sent successfully");

        // Always update our local state with the sent location
        // This ensures we see our own location even if server doesn't echo it back
        const ownLocation: LocationData = { userName, lat, lon };
        setLastReceivedLocation(ownLocation);
      } catch (error) {
        console.error("Error sending location:", error);
        throw error;
      }
    },
    [isConnected, userName] // connectionRef is a ref so it doesn't need to be in deps
  );

  return {
    connection,
    isConnected,
    lastReceivedLocation,
    sendLocation,
    connectionError,
  };
};
