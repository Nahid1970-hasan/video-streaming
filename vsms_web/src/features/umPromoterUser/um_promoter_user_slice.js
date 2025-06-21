import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  msg: "",
};

export const loadPromtUserConfig = createAsyncThunk(
  "promtUserConfig/loadConfig",
  () => {
    let req = { type: "get_all_promoters_profile", data: {} };
    return socket.post(req);
  }
);

export const updatePromtUserConfig = createAsyncThunk(
  "promtUserConfig/updateConfig",
  (data) => {
    let req = { type: "update_promoters_profile", data: data };
    return socket.post(req);
  }
);

export const savePromtUserConfig = createAsyncThunk(
  "promtUserConfig/saveConfig",
  (data) => {
    let req = { type: "save_promoters_profile", data: data };
    return socket.post(req);
  }
);

export const deletePromtUserConfig = createAsyncThunk(
  "promtUserConfig/deleteConfig",
  (data) => {
    let req = { type: "delete_promoters_profile", data: data };
    return socket.post(req);
  }
);

const PromtUserConfigSlice = createSlice({
  name: "promtUserConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (  state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPromtUserConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPromtUserConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.promoters;
    });

    builder.addCase(loadPromtUserConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updatePromtUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updatePromtUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;

     
    });

    builder.addCase(updatePromtUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(savePromtUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(savePromtUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(savePromtUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deletePromtUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deletePromtUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deletePromtUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default PromtUserConfigSlice.reducer;
export const { initLoader } = PromtUserConfigSlice.actions;
