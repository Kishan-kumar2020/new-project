import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import requestReducer from "./slices/requestSlice";
import connectionsReducer from "./slices/connectionSlice";

const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  requests: requestReducer,
  connections: connectionsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return appReducer(state, action);
};

const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
