import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestsFetcher } from "../../api/sendRequests/fetcher";

export const fetchSendRequestsAction = createAsyncThunk('sendRequests/fetchSendRequests', sendRequestsFetcher);