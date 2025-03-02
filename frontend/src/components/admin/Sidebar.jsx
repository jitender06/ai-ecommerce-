import React from 'react';
import { motion } from 'framer-motion';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  SwapHoriz as ExchangeIcon,
  People as UsersIcon,
} from '@mui/icons-material';

const Sidebar = ({ navigate, location, is480, sidebarOpen, setSidebarOpen }) => {
  // Sidebar Navigation Items
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon className='text-white'/>, path: '/admin/dashboard' },
    { text: 'Products', icon: <ProductsIcon className='text-white'/>, path: '/admin/products' },
    { text: 'Exchange Requests', icon: <ExchangeIcon className='text-white'/>, path: '/admin/exchange-requests' },
    { text: 'Users', icon: <UsersIcon className='text-white'/>, path: '/admin/users' },
  ];

  // Animation Variants
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.5 } },
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (is480) setSidebarOpen(false); // Close sidebar on mobile after click
  };

  return (
    <Drawer
      variant={is480 ? 'temporary' : 'permanent'}
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
    >
      <motion.div
        className="h-full bg-gray-900 text-white"
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen || !is480 ? 'open' : 'closed'}
      >
        <Stack direction="row" alignItems="center" p={2} className="bg-gray-800">
          <Typography variant="h6" className="font-extrabold">FashionFusion</Typography>
        </Stack>
        <Divider className="bg-gray-700" />
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.text}
              button={true}
              onClick={() => handleNavigation(item.path)}
              className={`hover:bg-gray-800 cursor-pointer ${location.pathname === item.path ? 'bg-gray-800 font-bold' : ''}`}
            >
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </motion.div>
    </Drawer>
  );
};

export default Sidebar;