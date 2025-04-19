import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Heart,
  Sparkles,
  Sun,
  Moon,
  Package,
  User,
  LogOut,
  Bot,
  MessageCircle,
  ArrowLeftRight,
  ScanFace,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../store/cartSlice";
import {
  toggleWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../store/wishlistSlice";
import {
  fetchProducts,
  fetchSearchResults,
  clearSearchResults,
} from "../../store/productsSlice";
import { logout } from "../../store/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartSidebar } from "../Cart/CartSidebar";
import {
  Drawer,
  Stack,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { X } from "lucide-react";
import { motion } from "framer-motion";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems, isOpen: isWishlistOpen } = useSelector(
    (state) => state.wishlist
  );
  const { searchResults, searchStatus } = useSelector(
    (state) => state.products
  );
  const { token } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleWishlistToggle = () => {
    if (token) {
      dispatch(fetchWishlist());
    }
    dispatch(toggleWishlist());
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
      setIsDropdownOpen(true);
    } else {
      dispatch(clearSearchResults());
      setIsDropdownOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(fetchProducts({ search: searchQuery, page: 1, limit: 20 }));
      navigate("/products");
      setSearchQuery("");
      setIsDropdownOpen(false);
    }
  };

  const handleProductClick = (productId) => {
    setSearchQuery("");
    setIsDropdownOpen(false);
    navigate(`/products/${productId}`);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleUserMenuClose();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to={"/"}>
              <div className="flex items-center">
                <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  FashionFusion
                </span>
              </div>
            </Link>
            <div className="flex-1 max-w-xl mx-8 relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <Search className="h-5 w-5 text-gray-400 hover:text-blue-500" />
                </button>
              </form>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10 max-h-72 overflow-y-auto">
                  {searchStatus === "loading" ? (
                    <p className="p-2 text-gray-500 dark:text-gray-400">
                      Loading...
                    </p>
                  ) : searchResults.length === 0 ? (
                    <p className="p-2 text-gray-500 dark:text-gray-400">
                      No results found
                    </p>
                  ) : (
                    searchResults.map((product) => (
                      <div
                        key={product._id}
                        onClick={() => handleProductClick(product._id)}
                        className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded mr-2"
                        />
                        <div>
                          <p className="text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {theme === "dark" ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={() => navigate("/packing-assistant")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("/exchange-product")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
              >
                <ArrowLeftRight className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("/ai-tools")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
              >
                <Bot className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("/products")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
              >
                <Package className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("/virtual-try-on")}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
              >
                <ScanFace className="h-6 w-6" />
              </button>

              <button
                onClick={handleWishlistToggle}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
              >
                <Heart className="h-6 w-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => dispatch(toggleCart())}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              {token ? (
                <>
                  <button
                    onClick={handleUserMenuOpen}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      className:
                        "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg",
                    }}
                  >
                    {" "}
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        navigate("/packing-assistant");
                      }}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Chat with Packing Assistant
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        dispatch(toggleCart());
                      }}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      View Cart
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        handleWishlistToggle();
                      }}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      View Favorites
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div className="flex space-x-4">
                  <NavLink to="/login">
                    <span>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                        Sign In
                      </button>
                    </span>
                  </NavLink>
                  <NavLink to="/register">
                    <span>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Sign Up
                      </button>
                    </span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <CartSidebar />

      {/* Wishlist Drawer */}
      <Drawer
        anchor="right"
        open={isWishlistOpen}
        onClose={() => dispatch(toggleWishlist())}
        sx={{ zIndex: 1300 }}
      >
        <Stack
          sx={{
            width: { xs: "100%", sm: "24rem" },
            height: "100%",
            bgcolor: "background.paper",
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
              Wishlist
            </Typography>
            <IconButton
              onClick={() => dispatch(toggleWishlist())}
              color="inherit"
            >
              <X size={24} />
            </IconButton>
          </Stack>

          <Stack flex={1} overflow="auto" p={2}>
            {wishlistItems.length === 0 ? (
              <Typography textAlign="center" color="text.secondary">
                Your wishlist is empty
              </Typography>
            ) : (
              <Stack spacing={2}>
                {wishlistItems.map((item) => (
                  <Stack
                    key={item._id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <Stack flex={1}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price}
                      </Typography>
                    </Stack>
                    <IconButton
                      onClick={() => dispatch(removeFromWishlist(item._id))}
                      color="inherit"
                    >
                      <X size={20} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}

export default Header;
