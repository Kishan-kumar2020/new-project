import { createSlice } from "@reduxjs/toolkit";
import { fetchReceivedRequestsAction } from "../apiActions/receivedRequestsAction";

const initialState = {
  receivedRequests: null,
  count: 0,
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    getRequests: (state, action) => {
      state.receivedRequests = action.payload;
    },
    getReceivedRequestsCount: (state, action) => {
      state.count = state.receivedRequests?.length || 0;
    },
    removeRequests: (state) => {
      state.receivedRequests = null;
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReceivedRequestsAction.fulfilled, (state, action) => {
      state.receivedRequests = action.payload;
      state.count = action.payload?.length || 0;
    });
  },
});

export const { getRequests, getReceivedRequestsCount, removeRequests } =
  requestSlice.actions;

export default requestSlice.reducer;
