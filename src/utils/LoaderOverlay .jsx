import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoaderOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Ensure it's above everything
        pointerEvents: "none", // Disable mouse events
      }}
    >
      <div style={{ pointerEvents: "none" }}>
        {" "}
        {/* Enable mouse events for the spinner */}
        <ThreeCircles color="#275ba7" height={80} width={80} />
      </div>
    </div>
  );
};

export default LoaderOverlay;
