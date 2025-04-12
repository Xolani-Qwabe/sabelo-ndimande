"use client";
import Link from "next/link";
import { useState, useRef } from "react";
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
  const isMobile = useMediaQuery("(max-width:1306px)");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEls, setAnchorEls] = useState({});
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const hoverTimeoutRef = useRef(null);
  const currentOpenMenu = useRef(null);

  const handleMenuOpen = (label, event) => {
    if (currentOpenMenu.current && currentOpenMenu.current !== label) {
      setAnchorEls(prev => ({ ...prev, [currentOpenMenu.current]: null }));
    }
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    currentOpenMenu.current = label;
    setAnchorEls(prev => ({ ...prev, [label]: event.currentTarget }));
  };

  const handleMenuClose = (label) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setAnchorEls(prev => ({ ...prev, [label]: null }));
      if (currentOpenMenu.current === label) {
        currentOpenMenu.current = null;
      }
    }, 100);
  };

  const toggleMobileMenu = (label) => {
    setMobileDropdowns(prev => ({ 
      ...Object.fromEntries(Object.keys(prev).map(key => [key, false])),
      [label]: !prev[label] 
    }));
  };

  const dropdownGlassStyles = {
    backgroundColor: mode === 'dark' ? 'rgba(32, 29, 33, 0.95)' : 'rgba(208, 200, 195, 0.95)',
    backdropFilter: 'blur(24px)',
    border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  };

  const hoverBg = mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const logoSrc = mode === "dark" ? "/sigWhite.png" : "/sigBlack.png";

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "transparent", color: "primary.contrastText", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-around", width: { xs: "100%", md: "80%" }, margin: "0 auto" }}>
          <Link href="/" passHref>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <Image src={logoSrc} alt="Logo" width={120} height={50} style={{ marginRight: 16, height: "auto" }} priority />
            </Box>
          </Link>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItems.map(({ label, submenu }) => (
                <Box 
                  key={label}
                  onMouseEnter={(e) => handleMenuOpen(label, e)}
                  onMouseLeave={() => handleMenuClose(label)}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    sx={{ color: "inherit" }}
                    endIcon={anchorEls[label] ? <ExpandLess /> : <ExpandMore />}
                  >
                    {label}
                  </Button>
                  <Menu
                    anchorEl={anchorEls[label]}
                    open={Boolean(anchorEls[label])}
                    onClose={() => handleMenuClose(label)}
                    PaperProps={{ sx: dropdownGlassStyles }}
                    MenuListProps={{ 
                      onMouseEnter: () => {
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current);
                          hoverTimeoutRef.current = null;
                        }
                      },
                      onMouseLeave: () => handleMenuClose(label),
                    }}
                    transitionDuration={0}
                    disableAutoFocusItem
                    sx={{ 
                      pointerEvents: 'none',
                      '& .MuiPaper-root': {
                        pointerEvents: 'auto'
                      }
                    }}
                  >
                    {submenu.map((item) => (
                      <MenuItem 
                        key={item} 
                        onClick={() => handleMenuClose(label)}
                        sx={{ '&:hover': { backgroundColor: hoverBg } }}
                      >
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

          {isMobile && (
            <IconButton onClick={() => setMobileOpen(!mobileOpen)} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 260, ...dropdownGlassStyles } }}
      >
        <List>
          {navItems.map(({ label, submenu }) => (
            <Box key={label}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggleMobileMenu(label)}>
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