import { createSlice } from "@reduxjs/toolkit";

const userInitialState = null;

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;