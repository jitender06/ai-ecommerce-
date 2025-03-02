import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadTryOnPhoto = createAsyncThunk(
  'tryOn/uploadTryOnPhoto',
  async ({ photo, productId }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('productId', productId);
      const response = await axios.post(
        'http://localhost:5000/api/ai/try-on',
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      return response.data.imageUrl; // Expecting URL of the try-on result
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tryOnSlice = createSlice({
  name: 'tryOn',
  initialState: {
    tryOnPhoto: null,
    tryOnResult: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadTryOnPhoto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadTryOnPhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tryOnResult = action.payload;
      })
      .addCase(uploadTryOnPhoto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default tryOnSlice.reducer;