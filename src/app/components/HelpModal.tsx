"use client";

import React from "react";
import { Modal, Paper, IconButton, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface HelpModalProps {
  isHelpOpen: boolean;
  setIsHelpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal: React.FC<HelpModalProps> = ({ isHelpOpen, setIsHelpOpen }) => {
  return (
    <Modal
      open={isHelpOpen}
      onClose={() => setIsHelpOpen(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <Paper sx={{ width: "90%", maxWidth: "600px", p: 4, position: "relative", borderRadius: 2, boxShadow: 3 }}>
        <IconButton
          onClick={() => setIsHelpOpen(false)}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Help & Support</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Welcome to the OPDA chatbot help section. Below, you will find guidance on how to effectively use the chatbot and troubleshooting steps for common issues.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 600 }}>Using the Chatbot</Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          To ensure a seamless experience, please follow these best practices:
        </Typography>

        {/* Replace List with Indented Typography */}
        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
          - Type your question clearly in the chat window and press Enter.
        </Typography>
        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
          - Use precise language for the best possible response.
        </Typography>
        <Typography variant="body2" sx={{ pl: 2, mb: 3 }}>
          - If the chatbot does not understand your question, try rephrasing it.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>Troubleshooting</Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          If you encounter issues while using the chatbot, consider the following solutions:
        </Typography>

        {/* Replace List with Indented Typography */}
        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
          - If responses seem incorrect, try rewording your question for clarity.
        </Typography>
        <Typography variant="body2" sx={{ pl: 2, mb: 1 }}>
          - If the chatbot is unresponsive or experiencing network errors, refresh the page and try again.
        </Typography>
        <Typography variant="body2" sx={{ pl: 2, mb: 3 }}>
          - Ensure you have a stable internet connection for optimal performance.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 600, mt: 3 }}>Contact Support</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          If you are experiencing a different type of error or want to submit additional documents, please contact our support team:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
          📧 Email:{" "}
          <a href="mailto:OPDA@stocktonca.gov" style={{ color: "#1976D2", textDecoration: "none" }}>
            OPDA@stocktonca.gov
          </a>
        </Typography>
      </Paper>
    </Modal>
  );
};

export default HelpModal;