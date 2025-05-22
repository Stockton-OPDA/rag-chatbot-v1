"use client";

import React, { useState } from "react";
import { 
  AppBar, Box, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import HelpModal from "./HelpModal";
import Link from "next/link";

const ChatbotHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleDrawer = () => () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const openHelp = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setIsHelpOpen(true), 300);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: 60, zIndex: 1201 }}> {/* Z-index for Drawer is 1200, so 1201 for header to be above */}
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer()}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Link href="/">
            <Box
              component="img"
              sx={{
                maxWidth: "250px",
                marginBottom: "-2px",
              }}
              src="../logo_white.png"
              alt="Logo"
            />
          </Link>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer()}
        sx={{
          "& .MuiDrawer-paper": {
            top: 60,
            height: "calc(100% - 60px)",
          },
        }}
      >
        <Box role="presentation">
          <List>
            <ListItem disablePadding sx = {{ mr: 8 }}>
              <ListItemButton component="a" href="/">
                <HomeIcon sx={{ mr: 1 }} />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx = {{ mr: 8 }}>
              <ListItemButton onClick={openHelp}>
                <HelpIcon sx={{ mr: 1 }} />
                <ListItemText primary="Help" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Help Overlay */}
      <HelpModal isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
    </Box>
  );
};

export default ChatbotHeader;