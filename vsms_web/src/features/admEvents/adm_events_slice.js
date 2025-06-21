import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  uploading:"idle",
  list: [], 
  eventData:{},
  msg: "",
};

export const loadEventSetup = createAsyncThunk(
  "admeventSetup/loadEvent",
  () => {
    let req = { type: "get_event_list", data: {} };
    return socket.post(req);
  }
);

export const loadEventData = createAsyncThunk(
  "admeventSetup/loadEventInfo",
  (data) => {
    let req = { type: "get_event_detail", data: data }; 
    return socket.post(req);
  }
);
  
export const updateEventSetup = createAsyncThunk(
  "admeventSetup/updateEvent",
  (data) => {
    let req = { type: "update_event", data: data };
    return socket.post(req);
  }
);

export const saveEventSetup = createAsyncThunk(
  "admeventSetup/saveEvent",
  (data) => {
    let req = { type: "save_event", data: data };
    return socket.post(req);
  }
);

export const deleteEventSetup = createAsyncThunk(
  "admeventSetup/deleteEvent",
  (data) => {
    let req = { type: "delete_event", data: data };
    return socket.post(req);
  }
);

export const uploadEventFile= createAsyncThunk("admeventSetup/uploadFile", (data) => {   
  return socket.upload(data);
});


const eventSetupSlice = createSlice({
  name: "admeventSetup",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (  state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
      if (  state.uploading != "idle") {
        state.uploading = "idle";
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

    builder.addCase(loadEventData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadEventData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.eventData = action.payload.data.event_detail;
    });

    builder.addCase(loadEventData.rejected, (state, action) => {
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
    builder.addCase(uploadEventFile.pending, (state) => {
      state.uploading = "pending";
    });

    builder.addCase(uploadEventFile.fulfilled, (state, action) => {
      state.uploading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(uploadEventFile.rejected, (state, action) => {
      state.uploading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default eventSetupSlice.reducer;
export const { initLoader } = eventSetupSlice.actions;
