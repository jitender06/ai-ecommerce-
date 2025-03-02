import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "../../store/authSlice";
import { Sparkles } from "lucide-react";

const AdminTopBar = ({ handleSidebarToggle, is480 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" className="bg-white dark:bg-gray-800 shadow-md">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleSidebarToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
          className="text-gray-900 dark:text-white"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className="flex-1 text-gray-900 dark:text-white font-semibold"
        >
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-white dark:text-blue-400" />
            <span className="ml-2 text-xl font-bold text-white">
              FashionFusion
            </span>
          </div>
        </Typography>
        <IconButton
          onClick={toggleTheme}
          className="text-gray-900 dark:text-white"
        >
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <IconButton
          onClick={handleProfileMenuOpen}
          className="text-gray-900 dark:text-white"
        >
          <Avatar>{user?.name?.charAt(0) || "A"}</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            className: "bg-white dark:bg-gray-800 shadow-lg rounded-md",
          }}
        >
          <MenuItem
            onClick={handleLogout}
            className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogoutIcon className="mr-2" /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopBar;
