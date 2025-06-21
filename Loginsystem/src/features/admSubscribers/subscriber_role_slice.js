import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  loading: "idle",
  updateLoading: "idle",
  list: [],
  read_only: 0,
  msg: "",
};

export const loadSubscriberRole = createAsyncThunk("AdmPromoterRole/loadRole", (data) => {
  return socket.post({ type: "get_subscribers_roles", data });
});

export const updateSubscriberRole = createAsyncThunk(
  "AdmPromoterRole/updateRole",
  (data, { getState }) => { 
    return socket.post({
      type: "update_subscribers_roles",
      data: {
        ...data,
        user_modules: getState().userRole.list,
        read_only: getState().userRole.read_only,
      },
    });
  }
);


const UserRoleSlice = createSlice({
  name: "BMDUserRole",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.updateLoading == "succeeded" ||
        state.updateLoading == "failed"
      ) {
        state.updateLoading = "idle";
      }
    },
    selectModule: (state, action) => {
      //action.payload = "select_2_1";
      let acitonArray = action.payload.split("_");

      state.list = state.list.map((d) =>
        d.module_id == acitonArray[1]
          ? {
              ...d,
              sub_module: d.sub_module.reduce((a, b) => {
                return b.sub_module_id == acitonArray[2]
                  ? a.concat({ ...b, selected: b.selected ? 0 : 1 })
                  : a.concat(b);
              }, []),
            }
          : d
      );
    },
    selectAllModule: (state, action) => { 
  let acitonArray = action.payload; 
  state.list = state.list.map((d) =>
     Object.assign({
      ...d,
      sub_module: d.sub_module.reduce((a, b) => {
        return  a.concat({ ...b, selected: +acitonArray});
      }, []),
    })
  );
},

    selectReadOnly: (state, action) => {
      state.read_only = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadSubscriberRole.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(loadSubscriberRole.fulfilled, (state, action) => {
      state.read_only = action.payload.data.read_only;
      state.list = action.payload.data.user_modules;
      state.loading = "succeeded";
    });
    builder.addCase(loadSubscriberRole.rejected, (state, action) => {
      state.msg = action.error.message;
      state.loading = action.error.name;
    });
    builder.addCase(updateSubscriberRole.pending, (state) => {
      state.updateLoading = "pending";
    });
    builder.addCase(updateSubscriberRole.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });
    builder.addCase(updateSubscriberRole.rejected, (state, action) => {
      state.msg = action.error.message;
      state.updateLoading = action.error.name;
    });
  },
});

export default UserRoleSlice.reducer;
export const { selectReadOnly, selectModule, initLoader,selectAllModule } =
  UserRoleSlice.actions;
