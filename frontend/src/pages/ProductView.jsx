import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Stack,
  Typography,
  CardMedia,
  Button,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormHelperText,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  SwapHoriz,
} from "@mui/icons-material";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import Header from "../components/Header/Header";

function ProductView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { token } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exchangeOpen, setExchangeOpen] = useState(false);
  const [exchangeData, setExchangeData] = useState({
    image: null,
    description: "",
    amount: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0); // Scroll to top on mount
  }, [id]);

  // Validation function for exchange fields
  const validateExchangeData = () => {
    const newErrors = {};
    if (!exchangeData.image) newErrors.image = "Image is required";
    if (!exchangeData.description.trim())
      newErrors.description = "Description is required";
    if (
      !exchangeData.amount ||
      isNaN(exchangeData.amount) ||
      exchangeData.amount <= 0
    ) {
      newErrors.amount = "Amount must be a positive number";
    }
    if (!exchangeData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(exchangeData.whatsapp)) {
      newErrors.whatsapp = "Enter a valid phone number (e.g., +1234567890)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (isInCart(product._id)) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
    }
  };

  // Handle Add to Wishlist
  const handleToggleWishlist = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (isInWishlist(product._id)) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const isInCart = (productId) =>
    cartItems && cartItems.some((item) => item.productId._id === productId);
  const isInWishlist = (productId) =>
    wishlistItems && wishlistItems.some((item) => item._id === productId);

  // Handle Exchange Submission
  const handleExchangeSubmit = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!validateExchangeData()) return; // Stop if validation fails

    const formData = new FormData();
    formData.append("productId", id);
    formData.append("image", exchangeData.image);
    formData.append("description", exchangeData.description);
    formData.append("amount", exchangeData.amount);
    formData.append("whatsapp", exchangeData.whatsapp);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/exchange/request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setExchangeOpen(false);
      setExchangeData({
        image: null,
        description: "",
        amount: "",
        whatsapp: "",
      });
      setErrors({});
      alert("Exchange request submitted successfully for admin review!");
    } catch (error) {
      console.error("Error submitting exchange:", error);
      alert("Failed to submit exchange request");
    }
  };

  // Animation Variants
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const popupVariants = {
    initial: { opacity: 0, y: -100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  if (loading)
    return (
      <Typography align="center" className="text-gray-600 dark:text-gray-400">
        Loading...
      </Typography>
    );
  if (!product)
    return (
      <Typography align="center" className="text-red-600">
        Product not found
      </Typography>
    );

  return (
    <>
      <Header />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        p={6}
        bgcolor="background.default"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden"
      >
        {/* Background Animation */}
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

        {/* Product Image */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <CardMedia
            component="img"
            image={product.image.startsWith("/uploads/") ? `http://localhost:5000${product.image}` : product.image}
            alt={product.name}
            sx={{
              width: { xs: "100%", md: 450 },
              height: 450,
              objectFit: "cover",
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          />
        </motion.div>

        {/* Product Details */}
        <Stack spacing={3} maxWidth={500} className="z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              className="text-gray-900 dark:text-white font-bold"
            >
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-300 mt-2"
            >
              {product.description}
            </Typography>
            <Typography
              variant="h4"
              className="text-blue-600 dark:text-blue-400 font-semibold mt-2"
            >
               ₹{product.price}
            </Typography>
            <Rating
              value={product.rating}
              readOnly
              precision={0.5}
              sx={{ mt: 1 }}
            />
            <Typography className="text-gray-600 dark:text-gray-400">
              Category:{" "}
              {product.category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-400">
              Stock: {product.stock}
            </Typography>
          </motion.div>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={2}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="contained"
                onClick={handleAddToCart}
                className={`font-semibold py-3 px-6 rounded-full shadow-md ${
                  isInCart(product._id)
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
              >
                {isInCart(product._id) ? (
                  "Remove from Cart"
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <IconButton
                onClick={handleToggleWishlist}
                className="bg-white dark:bg-gray-800 shadow-md rounded-full"
              >
                {isInWishlist(product._id) ? (
                  <Favorite color="error" sx={{ fontSize: 30 }} />
                ) : (
                  <FavoriteBorder sx={{ fontSize: 30 }} />
                )}
              </IconButton>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="outlined"
                onClick={() => setExchangeOpen(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 font-semibold py-3 px-6 rounded-full shadow-md"
              >
                <SwapHoriz className="h-5 w-5 mr-2" /> Exchange
              </Button>
            </motion.div>
          </Stack>
        </Stack>

        {/* Exchange Popup */}
        <Dialog
          open={exchangeOpen}
          onClose={() => setExchangeOpen(false)}
          PaperProps={{
            className:
              "bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full",
          }}
        >
          {/* <motion.div variants={popupVariants} initial="initial" animate="animate"> */}
          <DialogTitle>
            <Typography
              variant="h5"
              className="text-gray-900 dark:text-white font-bold text-center"
            >
              Exchange Product
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} mt={2}>
              <TextField
                type="file"
                onChange={(e) =>
                  setExchangeData({ ...exchangeData, image: e.target.files[0] })
                }
                inputProps={{ accept: "image/*" }}
                label="Upload Image"
                variant="standard"
                fullWidth
                error={!!errors.image}
                helperText={errors.image}
              />
              <TextField
                label="Description"
                value={exchangeData.description}
                onChange={(e) =>
                  setExchangeData({
                    ...exchangeData,
                    description: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description}
              />
              <TextField
                label="Amount (Sell/Exchange Value)"
                type="number"
                value={exchangeData.amount}
                onChange={(e) =>
                  setExchangeData({ ...exchangeData, amount: e.target.value })
                }
                variant="outlined"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount}
              />
              <TextField
                label="WhatsApp Number"
                value={exchangeData.whatsapp}
                onChange={(e) =>
                  setExchangeData({ ...exchangeData, whatsapp: e.target.value })
                }
                variant="outlined"
                fullWidth
                error={!!errors.whatsapp}
                helperText={errors.whatsapp}
              />
              <Typography className="text-gray-600 dark:text-gray-300">
                Amount to Pay After Exchange: ₹
                {Math.max(
                  0,
                  product.price - (Number(exchangeData.amount) || 0)
                ).toFixed(2)}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setExchangeOpen(false)}
              className="text-gray-600 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExchangeSubmit}
              variant="contained"
              disabled={
                Object.keys(errors).length > 0 ||
                !exchangeData.image ||
                !exchangeData.description ||
                !exchangeData.amount ||
                !exchangeData.whatsapp
              }
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Request
            </Button>
          </DialogActions>
          {/* </motion.div> */}
        </Dialog>
      </Stack>
    </>
  );
}

export default ProductView;
