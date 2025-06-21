import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  eventlist:[],
  channellist:[],
  msg: "",
};

export const loadEventSetup = createAsyncThunk(
  "eventSetup/loadConfig",
  () => {
    let req = { type: "get_event_list", data: {} };
    return socket.post(req);
  }
);
export const loadEventCatagory = createAsyncThunk(
  "eventSetup/loadevent",
  () => {
    let req = { type: "get_category_list", data: {} };
    return socket.post(req);
  }
);
export const loadChannel = createAsyncThunk(
  "eventSetup/loadChannel",
  (data) => {
    let req = { type: "get_channel_name", data: data };
    return socket.post(req);
  }
);

export const updateEventSetup = createAsyncThunk(
  "eventSetup/updateConfig",
  (data) => {
    let req = { type: "update_event", data: data };
    return socket.post(req);
  }
);

export const saveEventSetup = createAsyncThunk(
  "eventSetup/saveConfig",
  (data) => {
    let req = { type: "save_event", data: data };
    return socket.post(req);
  }
);

export const deleteEventSetup = createAsyncThunk(
  "eventSetup/deleteConfig",
  (data) => {
    let req = { type: "delete_event", data: data };
    return socket.post(req);
  }
);

const eventSetupSlice = createSlice({
  name: "eventSetup",
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
    builder.addCase(loadEventSetup.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadEventSetup.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.event_list;
    });

    builder.addCase(loadEventSetup.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadEventCatagory.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadEventCatagory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.eventlist = action.payload.data.category_list;
    });

    builder.addCase(loadEventCatagory.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadChannel.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadChannel.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.channellist = action.payload.data.channel_name;
    });

    builder.addCase(loadChannel.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateEventSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateEventSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateEventSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveEventSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveEventSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveEventSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteEventSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteEventSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteEventSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default eventSetupSlice.reducer;
export const { initLoader } = eventSetupSlice.actions;
