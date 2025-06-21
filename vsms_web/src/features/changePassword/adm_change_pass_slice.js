import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
};

export const admChangePassword = createAsyncThunk(
  "admchangePassword/updatePassword",
  (data) => {
    let req = { type: "change_password", data: data };
    return socket.post(req);
  }
);

const admChangePasswordSlice = createSlice({
  name: "admchangePassword",
  initialState,
  reducers: {
    initLoader: (state) => {
        if ( state.loading != "idle" ) {
            state.loading = "idle";
        }
    
    },
  },
  extraReducers: (builder) => {
    builder.addCase(admChangePassword.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(admChangePassword.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(admChangePassword.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default admChangePasswordSlice.reducer;
export const { initLoader } = admChangePasswordSlice.actions;
