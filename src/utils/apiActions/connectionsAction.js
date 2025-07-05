import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectionsFetcher } from "../../api/connections/fetcher";

export const fetchConnectionsAction = createAsyncThunk(
  "connections/fetchConnections",
  connectionsFetcher
);
