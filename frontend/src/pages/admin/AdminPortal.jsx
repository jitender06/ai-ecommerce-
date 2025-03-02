import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Stack,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  SwapHoriz as ExchangeIcon,
  People as UsersIcon,
  Person as PersonIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "../../store/authSlice";
import axios from "axios";
import UsersTable from "../../components/admin/UsersTable";
import { Sparkles } from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";
import AdminTopBar from "../../components/admin/AdminTopBar"
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AdminPortal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    exchangeRequests: 0,
    totalUsers: 0,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    const handleResize = () => setIs480(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/dashboard");
    }
    fetchDashboardData();
    fetchUsers();
    return () => window.removeEventListener("resize", handleResize);
  }, [token, user, navigate, location.pathname]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Sidebar Navigation Items
  const navItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon className="text-white" />,
      path: "/admin/dashboard",
    },
    {
      text: "Products",
      icon: <ProductsIcon className="text-white" />,
      path: "/admin/products",
    },
    {
      text: "Exchange Requests",
      icon: <ExchangeIcon className="text-white" />,
      path: "/admin/exchange-requests",
    },
    {
      text: "Users",
      icon: <UsersIcon className="text-white" />,
      path: "/admin/users",
    },
  ];

  // Animation Variants
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.5 } },
  };

  const chartVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const textVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 100 },
    },
  };

  // Chart Data
  const barData = {
    labels: ["Products", "Exchange Requests", "Users"],
    datasets: [
      {
        label: "Count",
        data: [
          dashboardData.totalProducts,
          dashboardData.exchangeRequests,
          dashboardData.totalUsers,
        ],
        backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981"],
        borderColor: ["#2563EB", "#7C3AED", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Products", "Exchange Requests", "Users"],
    datasets: [
      {
        data: [
          dashboardData.totalProducts,
          dashboardData.exchangeRequests,
          dashboardData.totalUsers,
        ],
        backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981"],
        borderColor: ["#2563EB", "#7C3AED", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: theme === "dark" ? "#fff" : "#000" },
      },
      title: {
        display: true,
        text: "Admin Dashboard Insights",
        color: theme === "dark" ? "#fff" : "#000",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: theme === "dark" ? "#fff" : "#000" },
      },
      x: { ticks: { color: theme === "dark" ? "#fff" : "#000" } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        navigate={navigate}
        location={location}
        is480={is480}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        {/* <AppBar
          position="static"
          className="bg-white dark:bg-gray-800 shadow-md"
        >
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
                <Sparkles className="h-8 w-8 text-gray-800 dark:text-blue-400" />
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
        </AppBar> */}
        <AdminTopBar handleSidebarToggle={handleSidebarToggle} is480={is480} />
        {/* Dashboard Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-6 max-w-7xl mx-auto w-full"
        >
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-center mb-8"
          >
            <Typography
              variant="h4"
              className="text-gray-900 dark:text-white font-bold"
            >
              Dashboard
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300 mt-2">
              Your Admin Overview
            </Typography>
          </motion.div>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
            {/* Bar Chart */}
            <motion.div
              variants={chartVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex-1"
            >
              <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-80">
                <Bar data={barData} options={chartOptions} />
              </Box>
            </motion.div>
            {/* Pie Chart */}
            <motion.div
              variants={chartVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex-1"
            >
              <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-80">
                <Pie data={pieData} options={chartOptions} />
              </Box>
            </motion.div>
          </Stack>
          {/* Users Table */}
          <div className="mt-20">
            <UsersTable users={users} fetchUsers={fetchUsers} token={token} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminPortal;
