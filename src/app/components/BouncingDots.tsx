// BouncingDots.tsx
"use client";

import React from "react";
import { Box } from "@mui/material";

/**
 * Component that renders a bouncing dots animation
 */
const BouncingDots: React.FC = () => {
  const dotStyle = {
    width: "8px",
    height: "8px",
    backgroundColor: "#888",
    borderRadius: "50%",
    margin: "0 2px",
    display: "inline-block",
    animation: "bounce 1.4s infinite ease-in-out both",
  };

  return (
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center" }}>
      <Box component="span" sx={{ ...dotStyle, animationDelay: "0s" }} />
      <Box component="span" sx={{ ...dotStyle, animationDelay: "0.2s" }} />
      <Box component="span" sx={{ ...dotStyle, animationDelay: "0.4s" }} />
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
};

export default BouncingDots;