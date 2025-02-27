import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Card, CardActionArea, Box } from '@mui/material';
import { motion } from 'framer-motion';

// Updated category data with Electronics and Sunglasses
const categories = [
  { name: 'mens-shirts', displayName: "Men's", image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80' },
  { name: 'womens-dresses', displayName: "Women's", image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80' },
  { name: 'mens-shoes', displayName: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80' },
  { name: 'mobile-accessories', displayName: 'Electronics', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' }, // Electronics
  { name: 'sunglasses', displayName: 'Sunglasses', image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=800&q=80' },
];

function CategorySection() {
  const navigate = useNavigate();

  return (
    <Stack spacing={4} py={8} bgcolor="background.default">
      <Typography
        variant="h3"
        align="center"
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ color: 'text.primary', fontWeight: 'bold' }}
      >
        Shop by Category
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', mx: 'auto' }}
      >
        {categories.map((category) => (
          <Card
            key={category.name}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: categories.indexOf(category) * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            sx={{
              width: { xs: 200, sm: 250 },
              height: 250,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <CardActionArea
              onClick={() => navigate(`/category/${category.name}`)}
              sx={{ height: '100%' }}
            >
              <Box
                sx={{
                  height: '100%',
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                    opacity: 0.8,
                  },
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 0,
                  right: 0,
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  zIndex: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {category.displayName}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}

export default CategorySection;