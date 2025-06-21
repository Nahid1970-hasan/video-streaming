import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  user: {},
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadAdmProfile = createAsyncThunk("admprofile/loadProfile", (data) => {
  return socket.post({ type: "get_user_profile_adm_self", data });
});

export const updateAdmProfile = createAsyncThunk("admprofile/updateProfile", (data) => {
  return socket.post({ type: "update_user_profile_adm_self", data });
});

const admProfileSlice = createSlice({
  initialState,
  name: "admprofile",
  reducers: {
    initLoader: (state) => { 
      if (state.updateLoading != "idle") { 
        state.updateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdmProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadAdmProfile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.data;
    });
    builder.addCase(loadAdmProfile.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateAdmProfile.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateAdmProfile.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateAdmProfile.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default admProfileSlice.reducer;
export const { initLoader } = admProfileSlice.actions;
