import { createAsyncThunk } from "@reduxjs/toolkit";
import { receivedRequestsFetcher } from "../../api/receivedRequests/fetcher";

export const fetchReceivedRequestsAction = createAsyncThunk(
  "receivedRequests/fetchReceivedRequests",
  receivedRequestsFetcher
);
