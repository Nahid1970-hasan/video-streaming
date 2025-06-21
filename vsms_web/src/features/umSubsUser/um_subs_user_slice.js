import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  msg: "",
};

export const loadSubsUserConfig = createAsyncThunk(
  "subsUserConfig/loadConfig",
  () => {
    let req = { type: "get_all_subscribers_profile", data: {} };
    return socket.post(req);
  }
);

export const updateSubsUserConfig = createAsyncThunk(
  "subsUserConfig/updateConfig",
  (data) => {
    let req = { type: "update_subscribers_profile", data: data };
    return socket.post(req);
  }
);

export const saveSubsUserConfig = createAsyncThunk(
  "subsUserConfig/saveConfig",
  (data) => {
    let req = { type: "save_subscribers_profile", data: data };
    return socket.post(req);
  }
);

export const deleteSubsUserConfig = createAsyncThunk(
  "subsUserConfig/deleteConfig",
  (data) => {
    let req = { type: "delete_subscribers_profile", data: data };
    return socket.post(req);
  }
);

const SubsUserConfigSlice = createSlice({
  name: "subsUserConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (  state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSubsUserConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSubsUserConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.subscribers;
    });

    builder.addCase(loadSubsUserConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSubsUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateSubsUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;

     
    });

    builder.addCase(updateSubsUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveSubsUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveSubsUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveSubsUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteSubsUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteSubsUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteSubsUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default SubsUserConfigSlice.reducer;
export const { initLoader } = SubsUserConfigSlice.actions;
