import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  loading: "idle",
  updateLoading: "idle",
  list: [],
  read_only: 0,
  msg: "",
};

export const loadPromtUserRole = createAsyncThunk("umsubsuserrole/loadRole", (data) => {
  return socket.post({ type: "get_subscribers_roles", data });
});

export const updatePromtUserRole = createAsyncThunk(
  "umsubsuserrole/updateRole",
  (data, { getState }) => { 
  
    return socket.post({
      type: "update_subscribers_roles",
      data: {
        ...data,
        user_modules: getState().umsubsuserrole.list,
        read_only: getState().umsubsuserrole.read_only,
      },
    });
  }
);


const umSubsUserRoleSlice = createSlice({
  name: "umsubsuserrole",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.updateLoading != "idle") {
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
    builder.addCase(loadPromtUserRole.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(loadPromtUserRole.fulfilled, (state, action) => {
      state.read_only = action.payload.data.read_only;
      state.list = action.payload.data.user_modules;
      state.loading = "succeeded";
    });
    builder.addCase(loadPromtUserRole.rejected, (state, action) => {
      state.msg = action.error.message;
      state.loading = action.error.name;
    });
    builder.addCase(updatePromtUserRole.pending, (state) => {
      state.updateLoading = "pending";
    });
    builder.addCase(updatePromtUserRole.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });
    builder.addCase(updatePromtUserRole.rejected, (state, action) => {
      state.msg = action.error.message;
      state.updateLoading = action.error.name;
    });
  },
});

export default umSubsUserRoleSlice.reducer;
export const { selectReadOnly, selectModule, initLoader,selectAllModule } = umSubsUserRoleSlice.actions;
