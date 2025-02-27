import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSearchResults = createAsyncThunk(
  'products/fetchSearchResults',
  async (search, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { search, page: 1, limit: 5 },
      });
      return response.data.products; // Return only the products array
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    searchResults: [], // New state for search dropdown
    total: 0,
    page: 1,
    pages: 1,
    categories: [],
    status: 'idle',
    searchStatus: 'idle', // Separate status for search
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { clearSearchResults } = productsSlice.actions;
export default productsSlice.reducer;