import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../store/productsSlice";
import { addToCart, removeFromCart, fetchCart } from "../store/cartSlice";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../store/wishlistSlice";
import {
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Slider,
  Rating,
  IconButton,
  Pagination,
} from "@mui/material";
import { Assistant, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total, page, pages, categories, status } = useSelector(
    (state) => state.products
  );
  const { token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(filters));
    if (token) {
      dispatch(fetchCart());
      dispatch(fetchWishlist()); // Fetch wishlist on mount
    }
  }, [dispatch, filters, token]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
      page: 1,
    }));
  };

  const handlePageChange = (event, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };

  const handleAddToCart = (productId) => {
    if (!token) {
      alert("Please log in to add items to your cart!");
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
      alert("Please log in to add items to your wishlist!");
      navigate("/login");
      return;
    }
    if (isInWishlist(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const isInCart = (productId) => {
    return (
      cartItems && cartItems.some((item) => item.productId._id === productId)
    );
  };

  const isInWishlist = (productId) => {
    return (
      wishlistItems && wishlistItems.some((item) => item._id === productId)
    );
  };

  return (
    <>
      <Header />
      <Stack
        spacing={4}
        p={4}
        pt={14}
        bgcolor="background.default"
        color="text.primary"
        minHeight="100vh"
        className="dark:bg-gray-900 dark:text-white items-center"
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Fashion & More
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ maxWidth: "1200px", mx: "auto" }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full dark:text-white"
        >
          <FormControl
            fullWidth
            sx={{ minWidth: 200 }}
            className="bg-white dark:h-14"
          >
            <InputLabel>Category</InputLabel>
            <Select
              className="dark:text-white"
              value={filters.category}
              label="Category"
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Search Products"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            variant="outlined"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:h-14"
          />

          <Box width={300}>
            <Typography gutterBottom className="dark:text-white">
              Price Range
            </Typography>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
            />
          </Box>
        </Stack>

        {status === "loading" ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              gap={3}
              sx={{ maxWidth: "1200px", mx: "auto" }}
            >
              {products.map((product) => (
                <Card
                  key={product._id}
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  }}
                  sx={{
                    width: 280,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                  }}
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="dark:bg-slate-700 dark:text-white"
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      product.image.startsWith("/uploads/")
                        ? `http://localhost:5000${product.image}`
                        : product.image
                    }
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" noWrap>
                        {product.name}
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(product._id);
                        }}
                        sx={{ p: 0 }}
                      >
                        {isInWishlist(product._id) ? (
                          <Favorite color="error" />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {product.category
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{product.price}
                    </Typography>
                    <Rating value={product.rating} readOnly precision={0.5} />
                    {isInCart(product._id) ? (
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 1 }}
                        component={motion.button}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromCart(product._id);
                        }}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 1 }}
                        component={motion.button}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product._id);
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {pages > 1 && (
              <Pagination
                count={pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ mt: 4, display: "flex", justifyContent: "center" }}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            )}
          </>
        )}
      </Stack>
      <Footer />
      <Link to="/ai-tools">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-xl flex items-center justify-center overflow-hidden transition-all duration-300"
        >
          {/* Animated Sparkle Effect */}
          <div className="absolute inset-0 bg-white opacity-10 blur-md animate-pulse"></div>

          {/* Glowing Sparks Around Button */}
          <div className="absolute -inset-3 rounded-full bg-transparent before:absolute before:content-[''] before:w-10 before:h-10 before:bg-white before:rounded-full before:blur-lg before:opacity-50 before:animate-ping after:absolute after:content-[''] after:w-5 after:h-5 after:bg-white after:rounded-full after:blur-md after:opacity-30 after:animate-ping"></div>

          {/* AI Bot Icon */}
          <Bot size={58} className="relative z-10" />

          {/* Extra floating sparkles */}
          <div className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-bounce left-3 top-3"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full opacity-40 animate-bounce right-3 bottom-3"></div>
          <div className="absolute w-2.5 h-2.5 bg-white rounded-full opacity-30 animate-bounce top-5 right-5"></div>
        </motion.button>
      </Link>
    </>
  );
}

export default Products;
