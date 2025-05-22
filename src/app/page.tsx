import React from "react";
import Chatbot from "./components/Chatbot";
import ChatbotHeader from "./components/ChatbotHeader";
import { Box } from "@mui/material";

const ChatbotPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Ensures full screen
        width: "100vw",  // Ensures full width
        overflow: "hidden", // Prevents extra scrolling issues
      }}
    >
      <ChatbotHeader />
      <Chatbot />
    </Box>
  );
};

export default ChatbotPage;