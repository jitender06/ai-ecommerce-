import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, fetchCart, removeFromCart } from "../../store/cartSlice";
import { Stack, Typography, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export function CartSidebar() {
  const dispatch = useDispatch();
  const { isOpen, cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };
  useEffect(() => {
    if (token && isOpen) {
      dispatch(fetchCart());
    }
  }, [dispatch, token, isOpen]);

  const total = cartItems.reduce(
    (sum, item) => sum + item?.productId?.price * item?.quantity,
    0
  );

  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: { xs: "100%", sm: "24rem" },
        height: "100%",
        bgcolor: "background.paper",
        boxShadow: 6,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 50,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        borderBottom={1}
        borderColor="divider"
      >
        <Typography variant="h6" fontWeight="bold">
          Shopping Cart
        </Typography>
        <IconButton onClick={() => dispatch(toggleCart())} color="inherit">
          <X size={24} />
        </IconButton>
      </Stack>

      <Stack flex={1} overflow="auto" p={2}>
        {cartItems.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            Your cart is empty
          </Typography>
        ) : (
          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Stack
                key={item.productId._id}
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <img
                  src={item?.productId?.image}
                  alt={item?.productId?.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <Stack flex={1}>
                  <Typography variant="body1">
                    {item?.productId?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{item?.productId?.price} x {item?.quantity}
                  </Typography>
                </Stack>
                <IconButton
                  onClick={() => dispatch(removeFromCart(item?.productId._id))}
                  color="inherit"
                >
                  <X size={20} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      <Stack p={2} borderTop={1} borderColor="divider">
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography fontWeight="medium">Subtotal</Typography>
          <Typography fontWeight="medium">₹{total.toFixed(2)}</Typography>
        </Stack>
        <Button variant="contained" fullWidth onClick={handleCheckout}>
          Checkout
        </Button>
      </Stack>
    </Stack>
  );
}
