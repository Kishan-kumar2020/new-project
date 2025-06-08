import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        getRequests: (state, action) => {
            return action.payload;
        },
        removeRequests: (state, action) => {
            return null;
        },
    },
});

export const { getRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;