"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import BouncingDots from "./BouncingDots";
import PersonIcon from "@mui/icons-material/Person";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';
import Image from "next/image";

interface Message {
  role: string;
  content: string;
}

interface MessageContainerProps {
  messages: Message[];
  isLoading: boolean;
  isError: boolean;
}

/**
 * The MessageContainer component renders a chat interface that displays messages, accepts user input, and sends a POST request to the /api/v1/chat endpoint.
 * It displays the chatbot's response, handles errors, and provides a loading animation.
 * @fires setIsLoading - sets the loading state to true
 * @fires setIsError - sets the error state to false on success and true on failure
 * @fires setMessages - updates the messages array with the user's message and the chatbot's response
 */
const MessageContainer: React.FC<MessageContainerProps> = ({ messages, isLoading, isError }) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading, isError]);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        width: "100%",
        height: "100%", // Fixed height for chat
        marginTop: "70px", // Margin + 10px for header
        overflowY: "auto", // Enables scrolling inside the chat only
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 0, 0, 0.15) transparent",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
        "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.role === "user" ? "flex-end" : "left",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            {message.role !== "user" && (
              <Image 
                src="/bot.svg" 
                alt="Bot Icon" 
                width={40} 
                height={40} 
                style={{ marginRight: "10px" }} 
              />
            )}
            <Box
              sx={{
                backgroundColor:
                  message.role === "user"
                    ? theme.palette.primary.main // User messages (blue)
                    : message.role === "error"
                    ? "#ffeeee"
                    : theme.palette.grey[300], // Assistant messages (light grey)
                color:
                  message.role === "error"
                    ? "#a60000"
                    : message.role === "user"
                    ? "#fff"
                    : "#000",
                borderRadius: "15px",
                padding: "0px 16px",
                maxWidth: "75%",
                textAlign: message.role === "user" ? "right" : "left",
                border: message.role === "error" ? "1px solid #ffbbbb" : "none",
              }}
            >
              {/* Render the message content using React Markdown */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  p: ({ ...props }) => <p {...props} />,
                  strong: ({ ...props }) => <strong {...props} />,
                  em: ({ ...props }) => <em {...props} />,
                  a: ({ ...props }) => (
                    <a style={{
                      color: '#1e88e5',
                      textDecoration: 'underline',
                    }}
                    {...props} 
                    />
                  ),
                  ul: ({ ...props }) => <ul {...props} />,
                  ol: ({ ...props }) => <ol {...props} />,
                  li: ({ ...props }) => <li {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </Box>
            {message.role === "user" && (
              <PersonIcon sx={{ color: theme.palette.text.primary, alignItems: "center", width: "30px", height: "30px", marginTop: "7px", marginLeft: "10px" }} />
            )}
          </Box>
        ))}

        {/* Render error bubble if there's an error */}
        {isError && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffeeee",
                color: "#a60000",
                borderRadius: "15px",
                padding: "12px 16px",
                maxWidth: "75%",
                textAlign: "left",
                border: "1px solid #ffbbbb",
              }}
            >
              <Typography variant="body1">
                A network error occurred. If this persists, please contact the OPDA.
              </Typography>
            </Box>
          </Box>
        )}

        {/* Otherwise, if loading and no error, show the bouncing dots */}
        {!isError && isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Image 
              src="/bot.svg" 
              alt="Bot Icon" 
              width={40} 
              height={40} 
              style={{ marginRight: "10px" }} 
            />
            <Box
              sx={{
                backgroundColor: theme.palette.grey[300],
                borderRadius: "15px",
                padding: "12px 16px",
                maxWidth: "75%",
                display: "flex",
                gap: "10px",
              }}
            >
              <BouncingDots />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessageContainer;