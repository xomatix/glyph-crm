import React, { lazy, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
const AccountPopup = lazy(() => import("../AccountPopup/AccountPopup"));
import service from "../../../glService/glService";
import "./Navbar.css";

function Navbar() {
  const [userRoles, setUserRoles] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadRoles() {
      const result = await getMenuPermissions();
      setUserRoles(result);
    }
    loadRoles();
  }, []);

  // Navigation links as array for easier mapping
  const navLinks = [
    {
      label: "Home",
      to: "/",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      show: true,
    },
    {
      label: "Users",
      to: "/users",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      show: userRoles.includes("admin"),
    },
    {
      label: "Events",
      to: "/events",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      show: true,
    },
    {
      label: "Statuses",
      to: "/statuses",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      ),
      show: userRoles.includes("developer"),
    },
    {
      label: "Customers",
      to: "/customers",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      show: true,
    },
    {
      label: "Badges",
      to: "/badges",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      ),
      show: userRoles.includes("admin"),
    },
    {
      label: "Selectors",
      to: "/selectors",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      show: userRoles.includes("developer"),
    },
    {
      label: "Calendar",
      to: "/calendar",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      show: true,
    },
    {
      label: "AI Context",
      to: "/ai-context",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      show: userRoles.includes("developer"),
    },
    {
      label: "Types",
      to: "/types",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      show: userRoles.includes("admin"),
    },
    {
      label: "Permissions",
      to: "/permissions",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4l3 3"></path>
        </svg>
      ),
      show: userRoles.includes("admin"),
    },
  ];

  return (
    <AppBar
      id="gl-navbar"
      position="static"
      sx={{ background: "#1e293b" }}
      elevation={1}
    >
      <Toolbar>
        <Box sx={{ display: { xs: "block", md: "none" }, mr: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            size="large"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          glyph CRM
        </Typography>
        {/* Desktop nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {navLinks
            .filter((link) => link.show)
            .map((link) => (
              <Button
                key={link.label}
                color="inherit"
                component={Link}
                to={link.to}
                startIcon={link.icon}
              >
                {link.label}
              </Button>
            ))}
        </Box>
        {/* Account always visible */}
        <Box sx={{ ml: 1 }}>
          <AccountPopup />
        </Box>
      </Toolbar>
      {/* Drawer for mobile */}
      <Drawer
        id="gl-navbar"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { background: "#1e293b", color: "#fff", width: 240 },
        }}
      >
        <List>
          {navLinks
            .filter((link) => link.show)
            .map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.to}
                  onClick={() => setDrawerOpen(false)}
                >
                  <div className="m-drawer-navbar-item">
                    {link.icon}
                    <ListItemText primary={link.label} />
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

async function getMenuPermissions() {
  const result = await service.select("crm", "glMenuPermissions", {});
  return result.map((o) => o.name);
}

export default Navbar;
