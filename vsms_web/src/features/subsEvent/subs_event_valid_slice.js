import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  evtDetails: {},
  msg: "",
};
  
export const validSubsEvent = createAsyncThunk(
  "subsValidEvent/saveEvent",
  (data) => {
    let req = { type: "validate_subscriber_event", data: data };
    return socket.post(req);
  }
);
 
export const validateSubsEvent = createAsyncThunk(
    "subsValidEvent/saveEventStatus",
    (data) => {
      let req = { type: "subscriber_payment_success", data: data };
      return socket.post(req);
    }
  );

const subsEventsValidSlice = createSlice({
  name: "subsValidEvent",
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
    builder.addCase(validSubsEvent.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(validSubsEvent.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.evtDetails = action.payload.data?.event||{};
    });

    builder.addCase(validSubsEvent.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(validateSubsEvent.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
    builder.addCase(validateSubsEvent.fulfilled, (state, action) => {
    state.addUpdateLoading = "succeeded";
    state.msg = action.payload.data.msg;
    });
  
    builder.addCase(validateSubsEvent.rejected, (state, action) => {
    state.addUpdateLoading = action.error.name;
    state.msg = action.error.message;
    });
 
 
  },
});

export default subsEventsValidSlice.reducer;
export const { initLoader } = subsEventsValidSlice.actions;
