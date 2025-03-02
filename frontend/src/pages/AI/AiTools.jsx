import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Stack,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import {
  fetchCategories,
  fetchRecommendations,
} from "../../store/recommendationsSlice";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";
import { useNavigate } from "react-router-dom";
import AboutUsSection from "../../components/AboutUsSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";

function AiTools() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, recommendations, status, error } = useSelector(
    (state) => state.recommendations
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { token } = useSelector((state) => state.auth);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of page
  }, []); // Empty dependency array ensures it runs only on mount

  // Fetch catokentegories and default to "fragrance" on mount
  useEffect(() => {
    // if (token) {
      dispatch(fetchCategories()).then(() => {
        // Check if "fragrance" exists in categories, then fetch its products
        const hasFragrance = categories.includes("fragrances");
        if (hasFragrance) {
          dispatch(fetchRecommendations("fragrances"));
        }
      });
    // }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchRecommendations("fragrances"));
  }, []);

  // Handle category button click
  const handleCategoryClick = (category) => {
    // if (!token) {
    //   navigate("/login");
    //   return;
    // }
    dispatch(fetchRecommendations(category));
  };

  // Cart and Wishlist handlers
  const handleAddToCart = (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleToggleWishlist = (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (isInWishlist(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const isInCart = (productId) =>
    cartItems && cartItems.some((item) => item.productId._id === productId);
  const isInWishlist = (productId) =>
    wishlistItems && wishlistItems.some((item) => item._id === productId);

  // Animation variants
  const buttonVariants = {
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const backgroundVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: { duration: 15, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <>
      <Header />
      <Stack
        spacing={6}
        py={10}
        px={4}
        justifyContent="center"
        alignItems="center"
        className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 min-h-screen relative overflow-hidden"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          variants={backgroundVariants}
          animate="animate"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Main Content */}
        <Stack spacing={6} className="max-w-5xl w-full z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              className="text-gray-900 dark:text-white font-extrabold text-center mb-4"
              sx={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)" }}
            >
              AI Recommended Fashion
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300 text-center mb-8">
              Explore curated picks powered by AI
            </Typography>
          </motion.div>

          {/* Category Buttons */}
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ gap: { xs: 2, sm: 3 } }}
          >
            {categories.map((category) => (
              <motion.div
                key={category}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="contained"
                  onClick={() => handleCategoryClick(category)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg text-lg"
                  sx={{ textTransform: "capitalize", minWidth: "150px" }}
                >
                  {category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Button>
              </motion.div>
            ))}
          </Stack>

          {/* Recommended Products */}
          <Stack spacing={4}>
            {status === "loading" && (
              <Typography className="text-gray-600 dark:text-gray-400 text-center">
                Loading AI recommendations...
              </Typography>
            )}
            {status === "failed" && (
              <Typography className="text-red-600 text-center">
                {error || "Failed to fetch recommendations"}
              </Typography>
            )}
            {status === "idle" && (
              <Typography className="text-gray-600 dark:text-gray-400 text-center">
                Click a category to see AI recommendations
              </Typography>
            )}
            {status === "succeeded" && recommendations.length === 0 && (
              <Typography className="text-gray-600 dark:text-gray-400 text-center">
                No items found for this category
              </Typography>
            )}
            {status === "succeeded" && recommendations.length > 0 && (
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={4}
                justifyContent="center"
              >
                {recommendations.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <Card className="w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                      <CardMedia
                        component="img"
                        height="240"
                        image={item.image}
                        alt={item.name}
                        className="object-cover cursor-pointer"
                        onClick={() => navigate(`/products/${item._id}`)}
                      />
                      <CardContent>
                        <Typography className="text-gray-900 dark:text-white font-semibold truncate">
                          {item.name}
                        </Typography>
                        <Typography className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.category
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </Typography>
                        <Typography className="text-blue-600 dark:text-blue-400 font-bold">
                        ₹{item.price}
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          mt={2}
                        >
                          {isInCart(item._id) ? (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleRemoveFromCart(item._id)}
                              sx={{ borderRadius: "20px" }}
                            >
                              Remove
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleAddToCart(item._id)}
                              className="bg-blue-600 hover:bg-blue-700 rounded-full"
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          )}
                          <IconButton
                            onClick={() => handleToggleWishlist(item._id)}
                          >
                            {isInWishlist(item._id) ? (
                              <Favorite color="error" />
                            ) : (
                              <FavoriteBorder />
                            )}
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
      <AboutUsSection />
      <Footer />
    </>
  );
}

export default AiTools;
