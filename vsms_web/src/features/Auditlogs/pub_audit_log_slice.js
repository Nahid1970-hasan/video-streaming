import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dataList:[],
  msg: ''
};


export const loadPubAuditLogData = createAsyncThunk("dashboard/auditlogs", (data) => {
  let req = { type: "get_audit_logs_public", data: data};
  return socket.post(req);
});
 
const auditLogSlice = createSlice({
  name: "AuditLog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadPubAuditLogData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubAuditLogData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data.audit_log; 
    });

    builder.addCase(loadPubAuditLogData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default auditLogSlice.reducer;
