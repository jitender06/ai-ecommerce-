import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { addToCart, removeFromCart, fetchCart } from "../store/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../store/wishlistSlice";
import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  IconButton,
  Pagination,
} from "@mui/material";
import { motion } from "framer-motion";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Header from "../components/Header/Header";

function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total, page, pages, status } = useSelector(
    (state) => state.products
  );
  const { token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchProducts({ category, page: 1 }));
    if (token) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, category, token]);

  const handlePageChange = (event, value) => {
    dispatch(fetchProducts({ category, page: value }));
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
        bgcolor="background.default"
        color="text.primary"
        minHeight="100vh"
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
          {category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Typography>

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
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
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
                      ${product.price}
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
    </>
  );
}

export default CategoryPage;
