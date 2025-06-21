import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  lgoutloading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  login: !!localStorage.getItem("session_key") ? true : false,
  fullname: localStorage.getItem("fullname") || "",
  usercode: localStorage.getItem("usercode") || "",
  user_type: localStorage.getItem("user_type") || "",
  read_only: JSON.parse(localStorage.read_only??0),
};

export const getLogin = createAsyncThunk("user/login", (body) => {
  let req = { type: "login", data: body }; 
  return socket.post(req);
});

export const getLogout = createAsyncThunk("user/logout", () => { 
  let req = { type: "logout", data: {} }; 
  return socket.post(req);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.login = false;
      localStorage.removeItem("session_key");
      localStorage.removeItem("user_id");
      localStorage.removeItem("menu");
    }, 
    initLoader: (state) => {
      if (
          state.loading != "idle"
      ) {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = action.payload.tag == "success";
      state.msg = action.payload.data.msg;
      state.fullname = action.payload.data?.fullname||"Users";
      state.read_only = +action.payload.data.read_only; 
      state.usercode = action.payload.data?.usercode ||"";
      state.user_type = action.payload.data?.user_type ||"";
      localStorage.setItem("session_key", action.payload.data?.session_key);
      localStorage.setItem("user_id", action.payload.data?.user_id);
      localStorage.setItem("user_type", action.payload.data?.user_type); 
      localStorage.setItem("fullname", action.payload.data?.fullname||"Users");
      localStorage.setItem("read_only", +action.payload.data.read_only);
      localStorage.setItem("usercode", action.payload.data?.usercode ||"");
      localStorage.setItem("menu", JSON.stringify(action.payload.data.modules));
    });

    builder.addCase(getLogin.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = false;
      state.msg = action.error.message;
    });

    builder.addCase(getLogout.pending, (state, action) => {
      state.lgoutloading = "pending";
    });

    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.lgoutloading = "succeeded";
      state.login = false;
      state.msg = action.payload.data.msg;
      localStorage.clear();
      localStorage.setItem("i18nextLng", 'bn');
    });

    builder.addCase(getLogout.rejected, (state, action) => {
      state.lgoutloading = action.error.name;
      state.login = true;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = userSlice.actions;
export default userSlice.reducer;
