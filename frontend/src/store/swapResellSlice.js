import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listSwapItem = createAsyncThunk(
  'swapResell/listSwapItem',
  async ({ name, image }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      const response = await axios.post(
        'http://localhost:5000/api/swap-resell/list',
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      return response.data; // Expecting the new item
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSwapItems = createAsyncThunk(
  'swapResell/fetchSwapItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/swap-resell/items');
      return response.data; // Expecting an array of swap items
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const swapResellSlice = createSlice({
  name: 'swapResell',
  initialState: {
    swapItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listSwapItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listSwapItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.swapItems.push(action.payload);
      })
      .addCase(listSwapItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(fetchSwapItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSwapItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.swapItems = action.payload;
      })
      .addCase(fetchSwapItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default swapResellSlice.reducer;