import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TablePagination,
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import Sidebar from "../../components/admin/Sidebar";
import AdminTopBar from "../../components/admin/AdminTopBar"

function ManageProducts() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null, // Changed to null for file input
    category: '',
    stock: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    const handleResize = () => setIs480(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    fetchProducts();
    return () => window.removeEventListener('resize', handleResize);
  }, [token, user, navigate, page, rowsPerPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: rowsPerPage, page: page + 1 },
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddEditProduct = async () => {
    const url = isEditMode
      ? `${import.meta.env.VITE_API_BASE_URL}/api/products/${selectedProduct._id}`
      : `${import.meta.env.VITE_API_BASE_URL}/api/products`;
    const method = isEditMode ? 'put' : 'post';

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (formData.image && formData.image instanceof File) {
      data.append('image', formData.image); // Only append if it's a file
    } else if (isEditMode) {
      data.append('image', formData.image); // Keep existing URL if no new file
    }
    data.append('category', formData.category);
    data.append('stock', formData.stock);

    try {
      await axios({
        method,
        url,
        data,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setOpenDialog(false);
      setFormData({ name: '', description: '', price: '', image: null, category: '', stock: '' });
      setIsEditMode(false);
      fetchProducts();
      alert(`Product ${isEditMode ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error.response?.data || error);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} product: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const openAddDialog = () => {
    setSelectedProduct(null);
    setFormData({ name: '', description: '', price: '', image: null, category: '', stock: '' });
    setIsEditMode(false);
    setOpenDialog(true);
  };

  const openEditDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image, // Keep as URL string unless new file uploaded
      category: product.category,
      stock: product.stock,
    });
    setIsEditMode(true);
    setOpenDialog(true);
  };

  const openViewDialogfn = (product) => {
    setSelectedProduct(product);
    setOpenViewDialog(true);
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        navigate={navigate}
        location={location}
        is480={is480}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <AdminTopBar handleSidebarToggle={handleSidebarToggle} is480={is480} />

        {/* Products Content */}
        <div className="p-6 max-w-7xl mx-auto w-full">
          <Typography variant="h4" className="text-gray-900 dark:text-white font-bold mb-6 text-center">
            Manage Products
          </Typography>
          <Stack direction="row" justifyContent="flex-end" mb={4}>
            <Button
              variant="contained"
              onClick={openAddDialog}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 shadow-md"
            >
              Add Product
            </Button>
          </Stack>
          <TableContainer component={Paper} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50 dark:bg-gray-700">
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">Name</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">Price</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">Category</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">Stock</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4 text-center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 dark:text-gray-400 py-6">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow
                      key={product._id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <TableCell className="text-gray-900 dark:text-white py-3 px-4">{product.name}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">₹{product.price}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                        {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">{product.stock}</TableCell>
                      <TableCell className="py-3 px-4 text-center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton
                            onClick={() => openViewDialogfn(product)}
                            className="text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-400"
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => openEditDialog(product)}
                            className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400"
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(product._id)}
                            className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalProducts}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </TableContainer>

          {/* Add/Edit Product Dialog */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle className="text-gray-900 dark:text-white font-semibold text-center bg-white dark:bg-gray-800 py-3">
              {isEditMode ? 'Edit Product' : 'Add Product'}
            </DialogTitle>
            <DialogContent className="bg-white dark:bg-gray-800 p-6">
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  fullWidth
                  variant="outlined"
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                  InputProps={{ className: "text-gray-900 dark:text-white" }}
                />
                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                  InputProps={{ className: "text-gray-900 dark:text-white" }}
                />
                <TextField
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  fullWidth
                  variant="outlined"
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                  InputProps={{ className: "text-gray-900 dark:text-white" }}
                />
                <TextField
                  label="Image"
                  type="file"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  fullWidth
                  variant="outlined"
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                  InputProps={{ className: "text-gray-900 dark:text-white" }}
                  inputProps={{ accept: 'image/*' }}
                />
                {isEditMode && formData.image && typeof formData.image === 'string' && (
                  <Typography className="text-gray-600 dark:text-gray-300">
                    Current Image: <a href={formData.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{formData.image}</a>
                  </Typography>
                )}
                <TextField
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  fullWidth
                  variant="outlined"
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                  InputProps={{ className: "text-gray-900 dark:text-white" }}
                />
                <TextField
                  label="Stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  fullWidth
                  variant="outlined"
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                  InputProps={{ className: "text-gray-900 dark:text-white" }}
                />
              </Stack>
            </DialogContent>
            <DialogActions className="bg-white dark:bg-gray-800 p-4">
              <Button onClick={() => setOpenDialog(false)} className="text-gray-600 dark:text-gray-300">
                Cancel
              </Button>
              <Button
                onClick={handleAddEditProduct}
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              >
                {isEditMode ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* View Product Dialog */}
          <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle className="text-gray-900 dark:text-white font-semibold text-center bg-white dark:bg-gray-800 py-3">
              Product Details
            </DialogTitle>
            <DialogContent className="bg-white dark:bg-gray-800 p-6">
              {selectedProduct && (
                <Stack spacing={2}>
                  <Typography className="text-gray-900 dark:text-white"><strong>Name:</strong> {selectedProduct.name}</Typography>
                  <Typography className="text-gray-600 dark:text-gray-300"><strong>Description:</strong> {selectedProduct.description}</Typography>
                  <Typography className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> ₹{selectedProduct.price}</Typography>
                  <Stack direction="column" spacing={1}>
                    <Typography className="text-gray-900 dark:text-white"><strong>Image:</strong></Typography>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full max-w-xs h-auto rounded-lg shadow-md"
                    />
                  </Stack>
                  <Typography className="text-gray-600 dark:text-gray-300">
                    <strong>Category:</strong> {selectedProduct.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Typography>
                  <Typography className="text-gray-600 dark:text-gray-300"><strong>Stock:</strong> {selectedProduct.stock}</Typography>
                </Stack>
              )}
            </DialogContent>
            <DialogActions className="bg-white dark:bg-gray-800 p-4">
              <Button onClick={() => setOpenViewDialog(false)} className="text-gray-600 dark:text-gray-300">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;