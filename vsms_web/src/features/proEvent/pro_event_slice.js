import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  ddLoading: "idle", 
  list: [], 
  catList:[],
  detailList:[],
  eventDetails:{},
  msg: "",
};

export const loadEventList = createAsyncThunk(
  "proeventSetup/loadEvent",
  () => {
    let req = { type: "get_promoter_event_list", data: {} };
    return socket.post(req);
  }
);

export const loadEventListByCatg = createAsyncThunk(
  "proeventSetup/loadEventByCat",
  (data) => {
    let req = { type: "get_promoter_event_list_by_catg", data: data };
    return socket.post(req);
  }
);

export const loadEventListDetails= createAsyncThunk(
  "proeventSetup/loadEventDetails",
  (data) => {
    let req = { type: "get_promoter_event_detail_list", data: data };
    return socket.post(req);
  }
);
   

const eventSetupSlice = createSlice({
  name: "proeventSetup",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEventList.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadEventList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.event_list;
      state.catList = action.payload.data.category_list;
    });

    builder.addCase(loadEventList.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 
    builder.addCase(loadEventListByCatg.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadEventListByCatg.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.event_list; 
    });

    builder.addCase(loadEventListByCatg.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 

    builder.addCase(loadEventListDetails.pending, (state) => {
      state.ddLoading = "pending";
    });

    builder.addCase(loadEventListDetails.fulfilled, (state, action) => {
      state.ddLoading = "succeeded";
      state.detailList = action.payload.data?.event_detail_list ||[]; 
      state.eventDetails = action.payload.data?.event_detail || {}; 
    });

    builder.addCase(loadEventListDetails.rejected, (state, action) => {
      state.ddLoading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default eventSetupSlice.reducer;
export const { initLoader } = eventSetupSlice.actions;
