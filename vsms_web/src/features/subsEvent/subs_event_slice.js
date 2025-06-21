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

export const loadSubsEvents = createAsyncThunk(
  "subsEvent/loadEvents",
  () => {
    let req = { type: "get_subscriber_event_list", data: {} };
    return socket.post(req);
  }
);
 
export const saveEmailConfig = createAsyncThunk(
  "subsEvent/saveEvent",
  (data) => {
    let req = { type: "save_subscriber_event", data: data };
    return socket.post(req);
  }
);
 

const subsEventsSlice = createSlice({
  name: "subsEvent",
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
    builder.addCase(loadSubsEvents.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSubsEvents.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.event_list;
    });

    builder.addCase(loadSubsEvents.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    
    builder.addCase(saveEmailConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveEmailConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveEmailConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
 
  },
});

export default subsEventsSlice.reducer;
export const { initLoader } = subsEventsSlice.actions;
