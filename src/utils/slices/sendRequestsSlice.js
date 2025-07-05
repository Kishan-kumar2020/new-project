import { createSlice } from "@reduxjs/toolkit";
import { fetchSendRequestsAction } from "../apiActions/sendRequestsAction";

const initialState = {
  sendRequestsList: null,
  count: 0,
};

const sendRequestsSlice = createSlice({
  name: "sendRequests",
  initialState,
  reducers: {
    addSendRequests: (state, action) => {
      state.sendRequestsList = action.payload;
    },
    getSendRequestsCount: (state, action) => {
      state.count = state.sendRequestsList?.length || 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSendRequestsAction.fulfilled, (state, action) => {
      state.sendRequestsList = action.payload;
      state.count = action.payload?.length || 0;
    });
  },
});

export const { addSendRequests, getSendRequestsCount } =
  sendRequestsSlice.actions;

export default sendRequestsSlice.reducer;
