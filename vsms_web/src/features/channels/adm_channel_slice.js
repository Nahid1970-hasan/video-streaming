import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  namelist:[],
  msg: "",
};

export const loadChannelList = createAsyncThunk(
  "admchannel/loadConfig",
  () => {
    let req = { type: "get_channel_list", data: {} };
    return socket.post(req);
  }
);

export const loadChannelName = createAsyncThunk(
  "admchannel/loadChName",
  (data) => {
    let req = { type: "get_channel_name", data: data };
    return socket.post(req);
  }
);

export const updateChannelInfo = createAsyncThunk(
  "admchannel/updateConfig",
  (data) => {
    let req = { type: "update_channel", data: data };
    return socket.post(req);
  }
);
 
const admChannelSlice = createSlice({
  name: "admchannel",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadChannelList.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadChannelList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.channel_list;
    });

    builder.addCase(loadChannelList.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadChannelName.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadChannelName.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.namelist = action.payload.data.channel_name;
    });

    builder.addCase(loadChannelName.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateChannelInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateChannelInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateChannelInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
 
  },
});

export default admChannelSlice.reducer;
export const { initLoader } = admChannelSlice.actions;
