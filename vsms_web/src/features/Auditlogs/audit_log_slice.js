import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dataList:[],
  msg: ''
};


export const loadAuditLogData = createAsyncThunk("dashboard/auditlogs", (data) => {
  let req = { type: "get_audit_logs", data: data};
  return socket.post(req);
});
 
const auditLogSlice = createSlice({
  name: "AuditLog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadAuditLogData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAuditLogData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data.audit_log; 
    });

    builder.addCase(loadAuditLogData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default auditLogSlice.reducer;
