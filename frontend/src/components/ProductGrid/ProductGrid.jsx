import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import { fetchCart } from '../../store/cartSlice';
import { fetchWishlist } from '../../store/wishlistSlice';
import ProductCard from './ProductCard';
import { Stack, Typography } from '@mui/material';

export function ProductGrid() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);

  const featuredProducts = products.filter((p) => p.rating > 4.5); // Placeholder for featured
  const regularProducts = products.filter((p) => p.rating <= 4.5);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 20 }));
    if (token) {
      dispatch(fetchCart()); // Fetch initial cart state
      dispatch(fetchWishlist()); // Fetch initial wishlist state
    }
  }, [dispatch, token]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {status === 'loading' ? (
        <Typography align="center" variant="h6" color="text.primary">
          Loading...
        </Typography>
      ) : (
        <>
          <Stack mb={6}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              className="dark:text-white"
            >
              Featured Collection
            </Typography>
          </Stack>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} featured />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {regularProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ProductGrid;