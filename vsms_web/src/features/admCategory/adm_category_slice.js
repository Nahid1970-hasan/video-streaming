import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  msg: "",
};

export const loadCategoryList = createAsyncThunk(
  "categoryConfig/loadCatList",
  () => {
    let req = { type: "get_category_list", data: {} };
    return socket.post(req);
  }
);
 

export const saveCategoryItem = createAsyncThunk(
  "categoryConfig/saveCatItem",
  (data) => {
    let req = { type: "save_category", data: data };
    return socket.post(req);
  }
);

export const deleteCategoryItem = createAsyncThunk(
  "categoryConfig/deleteCatItem",
  (data) => {
    let req = { type: "delete_category", data: data }; 
    return socket.post(req);
  }
);

const categoryConfigSlice = createSlice({
  name: "categoryConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCategoryList.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadCategoryList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.category_list;
    });

    builder.addCase(loadCategoryList.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
 
    builder.addCase(saveCategoryItem.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveCategoryItem.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveCategoryItem.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteCategoryItem.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteCategoryItem.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteCategoryItem.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default categoryConfigSlice.reducer;
export const { initLoader } = categoryConfigSlice.actions;
