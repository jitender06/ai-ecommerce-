import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch available categories
export const fetchCategories = createAsyncThunk(
  'recommendations/fetchCategories',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get('http://localhost:5000/api/products/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch categories' });
    }
  }
);

// Fetch recommended products for a category
export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (category, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
        params: { category, limit: 5 }, // Fetch 5 products per category
      });
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch recommendations' });
    }
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: {
    categories: [],
    recommendations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'error fetching';
      })
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'error fetching';
      });
  },
});

export default recommendationsSlice.reducer;