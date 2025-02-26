import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Stack, Typography, CardMedia, Button, Rating } from '@mui/material';
import { motion } from 'framer-motion';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (!product) return <Typography align="center">Product not found</Typography>;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={4}
      p={4}
      bgcolor="background.default"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <CardMedia
        component={motion.img}
        image={product.image}
        alt={product.name}
        sx={{ width: { xs: '100%', md: 400 }, height: 400, objectFit: 'cover', borderRadius: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <Stack spacing={2} maxWidth={500}>
        <Typography variant="h4" component={motion.div} initial={{ y: -20 }} animate={{ y: 0 }}>
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h5" color="primary">
          ${product.price}
        </Typography>
        <Rating value={product.rating} readOnly precision={0.5} />
        <Typography variant="body2" color="text.secondary">
          Category: {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Typography>
        <Typography variant="body2">Stock: {product.stock}</Typography>
        <Button
          variant="contained"
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert('Add to Cart coming soon!')}
        >
          Add to Cart
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProductView;