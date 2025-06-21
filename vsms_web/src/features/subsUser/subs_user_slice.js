import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  livelist: [],
  upclist:[],
  othlist:[],
  msg: "",
};
  
export const loadSubsUserEvents = createAsyncThunk(
  "subsUsers/loadSubsEventList",
  () => {
    let req = { type: "get_subscriber_event_detail_list", data: {} };
    return socket.post(req);
  }
);
  

const subsUserSlice = createSlice({
  name: "subsUsers",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "succeeded"  ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSubsUserEvents.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSubsUserEvents.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.livelist = action.payload.data?.sub_event_live||[];
      state.upclist = action.payload.data?.sub_event_upcoming||[]; 
      state.othlist = action.payload.data?.other_event_list||[];
    });

    builder.addCase(loadSubsUserEvents.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
 
  },
});

export default subsUserSlice.reducer;
export const { initLoader } = subsUserSlice.actions;
