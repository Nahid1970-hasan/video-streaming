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

export const loadAdmPromoter = createAsyncThunk(
  "admPromoter/loadConfig",
  () => {
    let req = { type: "get_all_promoters_profile", data: {} };
    return socket.post(req);
  }
);

export const updateAdmPromoter = createAsyncThunk(
  "admPromoter/updateConfig",
  (data) => {
    let req = { type: "update_promoters_profile", data: data };
    return socket.post(req);
  }
);

export const saveAdmPromoter = createAsyncThunk(
  "admPromoter/saveConfig",
  (data) => {
    let req = { type: "save_promoters_profile", data: data };
    return socket.post(req);
  }
);

export const deleteAdmPromoter = createAsyncThunk(
  "admPromoter/deleteConfig",
  (data) => {
    let req = { type: "delete_promoters_profile", data: data };
    return socket.post(req);
  }
);

const admPromoterSlice = createSlice({
  name: "admPromoter",
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
    builder.addCase(loadAdmPromoter.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdmPromoter.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.promoters;
    });

    builder.addCase(loadAdmPromoter.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateAdmPromoter.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateAdmPromoter.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;

     
    });

    builder.addCase(updateAdmPromoter.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveAdmPromoter.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdmPromoter.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveAdmPromoter.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdmPromoter.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteAdmPromoter.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteAdmPromoter.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default admPromoterSlice.reducer;
export const { initLoader } = admPromoterSlice.actions;
