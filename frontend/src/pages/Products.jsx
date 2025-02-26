import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../store/productsSlice';
import { addToCart, removeFromCart, fetchCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist, fetchWishlist } from '../store/wishlistSlice';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import { Assistant, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total, page, pages, categories, status } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
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
    setFilters((prev) => ({ ...prev, minPrice: newValue[0], maxPrice: newValue[1], page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };

  const handleAddToCart = (productId) => {
    if (!token) {
      alert('Please log in to add items to your cart!');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleToggleWishlist = (productId) => {
    if (!token) {
      alert('Please log in to add items to your wishlist!');
      navigate('/login');
      return;
    }
    if (isInWishlist(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const isInCart = (productId) => {
    return cartItems && cartItems.some((item) => item.productId._id === productId);
  };

  const isInWishlist = (productId) => {
    return wishlistItems && wishlistItems.some((item) => item._id === productId);
  };

  return (
    <Stack spacing={4} p={4} bgcolor="background.default" color="text.primary" minHeight="100vh">
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
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ maxWidth: '1200px', mx: 'auto' }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Search Products"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          variant="outlined"
          component={motion.div}
          whileHover={{ scale: 1.02 }}
        />

        <Box width={300}>
          <Typography gutterBottom>Price Range</Typography>
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

      {status === 'loading' ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={3}
            sx={{ maxWidth: '1200px', mx: 'auto' }}
          >
            {products.map((product) => (
              <Card
                key={product._id}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
                sx={{ width: 280, borderRadius: 2, bgcolor: 'background.paper' }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
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
                    {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
              sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          )}
        </>
      )}

      <IconButton
        component={motion.button}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: 'primary.main',
          color: 'white',
          p: 2,
          zIndex: 1000,
        }}
        onClick={() => alert('AI Assistant coming soon!')}
      >
        <Assistant fontSize="large" />
      </IconButton>
    </Stack>
  );
}

export default Products;