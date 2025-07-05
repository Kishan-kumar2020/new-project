import { createSlice } from "@reduxjs/toolkit";
import { fetchConnectionsAction } from "../apiActions/connectionsAction";

const initialState = {
  connectionsList: [],
  count: 0,
};

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      state.connectionsList = action.payload;
    },
    getConnectionsCount: (state) => {
      state.count = state.connectionsList?.length || 0;
    },
    removeConnections: (state, action) => {
      state.connectionsList = [];
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnectionsAction.fulfilled, (state, action) => {
      state.connectionsList = action.payload;
      state.count = action.payload?.length || 0;
    });
  },
});

export const { addConnections, getConnectionsCount, removeConnections } =
  connectionSlice.actions;

export default connectionSlice.reducer;
