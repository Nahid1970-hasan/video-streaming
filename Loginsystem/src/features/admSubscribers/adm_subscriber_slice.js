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

export const loadSubscriberConfig = createAsyncThunk(
  "admSubscriber/loadConfig",
  () => {
    let req = { type: "get_all_subscribers_profile", data: {} };
    return socket.post(req);
  }
);

export const updateSubscriberConfig = createAsyncThunk(
  "admSubscriber/updateConfig",
  (data) => {
    let req = { type: "update_subscribers_profile", data: data };
    return socket.post(req);
  }
);

export const saveSubscriberConfig = createAsyncThunk(
  "admSubscriber/saveConfig",
  (data) => {
    let req = { type: "save_subscribers_profile", data: data };
    return socket.post(req);
  }
);

export const deleteSubscriberConfig = createAsyncThunk(
  "admSubscriber/deleteConfig",
  (data) => {
    let req = { type: "delete_subscribers_profile", data: data };
    return socket.post(req);
  }
);

const SubscriberSlice = createSlice({
  name: "admSubscriber",
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
    builder.addCase(loadSubscriberConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSubscriberConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.subscribers;
    });

    builder.addCase(loadSubscriberConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSubscriberConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateSubscriberConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;

     
    });

    builder.addCase(updateSubscriberConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveSubscriberConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveSubscriberConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveSubscriberConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteSubscriberConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteSubscriberConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteSubscriberConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default SubscriberSlice.reducer;
export const { initLoader } = SubscriberSlice.actions;
