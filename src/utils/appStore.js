import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import requestReducer from './slices/requestSlice';
import connectionsReducer from './slices/connectionSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        requests: requestReducer,
        connections: connectionsReducer,
    },
});

export default appStore;