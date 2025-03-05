import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import Header from './Header/Header';

function Checkout() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCartItems();
  }, [token, navigate]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Set initial quantity to 1 for all items
      const items = response.data.map(item => ({
        ...item,
        quantity: 1, // Override backend quantity to 1
      }));
      setCartItems(items || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setCartItems([]);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    const currentItem = cartItems.find(item => item.productId._id === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    const updatedQuantity = Math.max(1, newQuantity);

    if (updatedQuantity === currentQuantity) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/add`,
        { productId, quantity: updatedQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId._id === productId ? { ...item, quantity: updatedQuantity } : item
        )
      ); // Update frontend state directly to avoid refetch delay
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
      fetchCartItems(); // Refetch on error to sync with backend
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    const orderMessage = cartItems.map(item => {
      return `${item.productId.name} - Quantity: ${item.quantity} - Price:  ₹${(item.productId.price * item.quantity).toFixed(2)}`;
    }).join('\n');
    const total = calculateTotal();
    const whatsappMessage = `New Order:\n${orderMessage}\n\nTotal:  ₹${total}\n\nFrom: ${user.name}, (${user.email})`;
    const whatsappNumber = '6239318097';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex flex-col items-center p-6">
        <Typography variant="h4" className="text-gray-900 dark:text-white font-extrabold mb-8 text-center">
          Checkout
        </Typography>
        {cartItems.length === 0 ? (
          <Typography className="text-gray-500 dark:text-gray-400 text-center">
            Your cart is empty
          </Typography>
        ) : (
          <Stack spacing={4} className="w-full max-w-4xl mt-14">
            {cartItems.map((item) => (
              <Card
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex items-center"
              >
                <CardMedia
                  component="img"
                  image={item.productId.image}
                  alt={item.productId.name}
                  style={{objectFit:"contain", width:"200px"}}
                  className="sm:h-28 object-contain rounded-l-xl w-64"
                />
                <CardContent className="flex-1 p-4">
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h6" className="text-gray-900 dark:text-white font-semibold">
                      {item.productId.name}
                    </Typography>
                    <Typography className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {item.productId.description}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                      <Typography className="text-gray-600 dark:text-gray-300">Qty:</Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                        className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        type="number"
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        sx={{ width: '60px', '& .MuiOutlinedInput-root': { borderRadius: '9999px' } }}
                        variant="outlined"
                        size="small"
                        onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value) || 1)}
                      />
                      <IconButton
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                        className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        <Add fontSize="small" />
                      </IconButton>
                      <Typography className="text-blue-600 dark:text-blue-400 font-bold ml-4">
                      ₹{(item.productId.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mt={6} className="w-full">
              <Typography variant="h6" className="text-gray-900 dark:text-white font-semibold mb-4 sm:mb-0">
                Total:  ₹{calculateTotal()}
              </Typography>
              <Button
                variant="contained"
                onClick={handleCheckout}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 shadow-md"
              >
                Confirm Order
              </Button>
            </Stack>
          </Stack>
        )}
      </div>
    </>
  );
}

export default Checkout;