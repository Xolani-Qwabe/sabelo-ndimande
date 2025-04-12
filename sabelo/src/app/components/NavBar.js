"use client";
import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
} from "@mui/material";
import Image from "next/image";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useThemeContext } from "../ThemeContext";
import { useTheme } from "@mui/material/styles";

const navItems = [
  {
    label: "About",
    submenu: ["Who I Am", "Vision", "Mission"],
  },
  {
    label: "Programs",
    submenu: ["Mentorship", "Bootcamps", "Scholarships"],
  },
  {
    label: "Events",
    submenu: ["Workshops", "Talks", "Hackathons"],
  },
  {
    label: "Coaching",
    submenu: ["1-on-1", "Team Training"],
  },
  {
    label: "Blog",
    submenu: ["Articles", "Interviews"],
  },
  {
    label: "Shop",
    submenu: ["Books", "Merch"],
  },
];

export default function Navbar() {
  const { mode, toggleMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:1106px)");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEls, setAnchorEls] = useState({});
  const [mobileDropdowns, setMobileDropdowns] = useState({});

  const handleMenuClick = (event, label) => {
    setAnchorEls((prev) => ({ ...prev, [label]: event.currentTarget }));
  };

  const handleMenuClose = (label) => {
    setAnchorEls((prev) => ({ ...prev, [label]: null }));
  };

  const toggleMobileDropdown = (label) => {
    setMobileDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const logoSrc = mode === "dark" ? "/sigWhite.png" : "/sigBlack.png";

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent",
          color: "primary.contrastText",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: { xs: "100%", md: "80%" },
            margin: "0 auto",
          }}
        >
          {/* Logo with Link */}
          <Link href="/" passHref>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <Image
                src={logoSrc}
                alt="Logo"
                width={120}
                height={50}
                style={{ marginRight: 16, height: "auto" }}
                priority
              />
            </Box>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItems.map(({ label, submenu }) => (
                <Box key={label}>
                  <Button
                    onClick={(e) => handleMenuClick(e, label)}
                    sx={{ color: "inherit" }}
                    endIcon={anchorEls[label] ? <ExpandLess /> : <ExpandMore />}
                  >
                    {label}
                  </Button>
                  <Menu
                    anchorEl={anchorEls[label]}
                    open={Boolean(anchorEls[label])}
                    onClose={() => handleMenuClose(label)}
                 
                  >
                    {submenu.map((item) => (
                      <MenuItem key={item} onClick={() => handleMenuClose(label)}>
                        {item}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ))}

              <Link href="/book" passHref>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "primary.contrastText",
                    color: "primary.contrastText",
                    borderRadius: "24px",
                    py: 1.2,
                    px: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      borderColor: "primary.contrastText",
                      color: "#fff",
                    },
                  }}
                >
                  Book Me
                </Button>
              </Link>

              <IconButton onClick={toggleMode} color="inherit">
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          )}

          {/* Mobile Nav Toggle */}
          {isMobile && (
            <Box>
              <IconButton onClick={() => setMobileOpen(!mobileOpen)} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            bgcolor: "background.default",
            color: "text.primary",
          },
        }}
      >
        <List>
          {navItems.map(({ label, submenu }) => (
            <Box key={label}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggleMobileDropdown(label)}>
                  <ListItemText primary={label} />
                  {mobileDropdowns[label] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={mobileDropdowns[label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {submenu.map((item) => (
                    <ListItem key={item} disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
          <ListItem>
            <Link href="/book" passHref>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "primary.contrastText",
                  color: "primary.contrastText",
                  borderRadius: "24px",
                  py: 1.2,
                  px: 2,
                  fontWeight: "bold",
                  textTransform: "none",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    borderColor: "primary.contrastText",
                    color: "#fff",
                    border:'none'
                  },
                }}
              >
                Book Me
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
