"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageContainer from "./MessageContainer";

/**
 * The Chatbot component renders a chat interface that displays messages (MessageContainer), accepts user input, and sends a POST request to the /api/v1/chat endpoint.
 * It displays the chatbot's response, handles errors, and provides a loading animation.
 * @fires setIsLoading - sets the loading state to true
 * @fires setIsError - sets the error state to false on success and true on failure
 * @fires setMessages - updates the messages array with the user's message and the chatbot's response
 */
const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState<boolean>(false);

  /**
   * Sends a message to the chatbot, updates the state with the response, and handles errors.
   * @fires setIsLoading - sets the loading state to true
   * @fires setIsError - sets the error state to false on success and true on failure
   * @fires setMessages - updates the messages array with the user's message and the chatbot's response
   */
  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!hasSentFirstMessage) {
      setHasSentFirstMessage(true);
    }

    // Reset the error field on new call, store message, clear input field, and show the loading indicator
    setIsError(false);
    setMessages((prev) => [...prev, { content: input, role: "user" }]);
    setInput("");
    setIsLoading(true);

    // Get the last 7 messages from history
    const chatHistory = [...messages, { content: input, role: "user" }];
    const lastMessages = chatHistory.slice(-7); // Last 7 messages

    try {
      const response = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
         },
        body: JSON.stringify({ 
          messages: lastMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}, ${response.statusText}`);
      }

      const data = await response.json();
      console.log(JSON.stringify(data.response));
      setMessages((prev) => [...prev, { content: data.response, role: "assistant" }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setIsError(true);
      // Remove the user's message from the messages array
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    (<Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: messages.length === 0 ? "center" : "flex-start",
        px: 2,
      }}
    >
    {messages.length === 0 && !hasSentFirstMessage && <Box
      component="img"
      sx={{
        maxWidth: "250px", 
      }}
      src="..\cover_photo.svg"
    />}
      {messages.length === 0 && !hasSentFirstMessage && (
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" color="textPrimary" sx={{ mb: 2 }}>
            Welcome to the OPDA Chatbot!
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            I can assist you with city policies, employee procedures, and more.
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Have suggestions? Contact us at{" "}
            <Link href="mailto:opda@stocktonca.gov" color="primary" underline="hover">
              opda@stocktonca.gov
            </Link>
          </Typography>
        </Box>
      )}
      {/* Display messages including errors */}
      {hasSentFirstMessage && <MessageContainer messages={messages} isLoading={isLoading} isError={isError} />}
      <Box
        sx={{
          bottom: 0,
          width: "50%",
          background: "#fff",
          p: '0.1em',
          borderRadius: 2,
          mb: hasSentFirstMessage ? "50px" : 0,
          minHeight: "20px",
        }}
      >
        {/* Input field */}
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Type your question here..."
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement | HTMLTextAreaElement>) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />
        {/* <Typography
          variant="caption"
          color="#9e9e9e"
          sx={{ textAlign: "center", display: "block", mt: 1 }}
        >
          Note: The OPDA chatbot can make mistakes. Please fact-check any information provided.
        </Typography> */}
      <Typography variant="caption" color="#9e9e9e" sx={{ textAlign: 'center', display: "block", mt: 1 }}>
        Please note that this application is currently in <span style={{ color: '#d32f2f', fontStyle: 'italic' }}>beta development.</span> 
        <br />
        While we are working hard to improve its performance and features, you may encounter occasional errors or unexpected behavior.
      </Typography>
      </Box>
    </Box>)
  );
};

export default Chatbot;