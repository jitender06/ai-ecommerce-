import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Stack, Typography, CircularProgress, Chip } from "@mui/material";
import Header from "../components/Header/Header";

function ExchangeProducts() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exchange requests on mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchExchangeRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/exchange/user/requests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setExchangeRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch exchange requests"
        );
        setLoading(false);
      }
    };

    fetchExchangeRequests();
    window.scrollTo(0, 0); // Scroll to top on mount
  }, [token, navigate]);

  // Status color mapping for Tailwind
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "approved":
        return "bg-green-500 text-white";
      case "approved":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Animation Variants
  const containerVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Typography className="text-red-600 dark:text-red-400">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex justify-center items-center">
        {/* Animated Background Particles */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="max-w-5xl w-full z-10"
        >
          {/* Header */}
          <Typography
            variant="h4"
            className="text-gray-900 dark:text-white font-extrabold text-center mb-6"
            sx={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)" }}
          >
            Your Exchange Requests
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Track the status of your exchange submissions
          </Typography>

          {/* Exchange Requests List */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden mt-11"
          >
            {exchangeRequests.length === 0 ? (
              <Stack justifyContent="center" alignItems="center" py={6}>
                <Typography className="text-gray-600 dark:text-gray-400">
                  No exchange requests found
                </Typography>
              </Stack>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {exchangeRequests.map((request) => (
                  <motion.div
                    key={request._id}
                    variants={itemVariants}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-4"
                  >
                    <img
                      src={`http://localhost:5000/${request.image}`}
                      alt="Exchange item"
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <Typography className="text-gray-900 dark:text-white font-semibold truncate">
                      {request.productId.name}
                    </Typography>
                    <Typography className="text-gray-600 dark:text-gray-300 text-sm truncate">
                      {request.description}
                    </Typography>
                    <Typography className="text-gray-900 dark:text-white font-bold mt-1">
                    ₹{request.amount}
                    </Typography>
                    <Typography className="text-gray-600 dark:text-gray-300 text-sm">
                      WhatsApp: {request.whatsapp}
                    </Typography>
                    <Chip
                      label={request.status}
                      className={`mt-2 font-semibold ${getStatusColor(
                        request.status
                      )}`}
                      size="small"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default ExchangeProducts;
