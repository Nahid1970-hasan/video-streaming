import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  msg: "",
};

export const loadAdmUserConfig = createAsyncThunk(
  "admUserConfig/loadConfig",
  () => {
    let req = { type: "get_all_users_profile", data: {} };
    return socket.post(req);
  }
);

export const updateUserConfig = createAsyncThunk(
  "admUserConfig/updateConfig",
  (data) => {
    let req = { type: "update_users_profile", data: data };
    return socket.post(req);
  }
);

export const saveAdmUserConfig = createAsyncThunk(
  "admUserConfig/saveConfig",
  (data) => {
    let req = { type: "save_users_profile", data: data };
    return socket.post(req);
  }
);

export const deleteAdmUserConfig = createAsyncThunk(
  "admUserConfig/deleteConfig",
  (data) => {
    let req = { type: "delete_users_profile", data: data };
    return socket.post(req);
  }
);

const AdmUserConfigSlice = createSlice({
  name: "bmdUserConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.addUpdateLoading == "succeeded" ||
        state.addUpdateLoading == "failed"
      ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdmUserConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdmUserConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.users;
    });

    builder.addCase(loadAdmUserConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;

     
    });

    builder.addCase(updateUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveAdmUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdmUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveAdmUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdmUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteAdmUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteAdmUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default AdmUserConfigSlice.reducer;
export const { initLoader } = AdmUserConfigSlice.actions;
