import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { blogType } from "../types/blog";
import { HandleControls } from "../types/common";

export const blogList = createAsyncThunk<blogType[], HandleControls>(
  "blogList",
  async (handleControls) => {
    const response = await axiosInstance.post(`blog/list`, handleControls);
    return response.data.data;
  }
);

type BlogState = {
  data: blogType[];
  error: string | null;
  loading: boolean;
};

const initialState: BlogState = {
  data: [],
  error: null,
  loading: false,
};

const blogCreateSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(blogList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        blogList.fulfilled,
        (state, action: PayloadAction<blogType[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(blogList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default blogCreateSlice.reducer;
