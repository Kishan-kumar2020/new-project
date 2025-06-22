import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import AuthProvider from "./components/AuthProvider";
import Body from "./components/Body";
import Connections from "./components/Connections";
import Feed from "./components/Feed";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/login" element={<Login />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
