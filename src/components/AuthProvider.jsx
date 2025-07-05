import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { addUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/constants";
import { PROTECTED_ROUTES } from "../utils/constants";
import { useSendRequests } from "../utils/apiHooks/useSendRequests";
import { useReceivedRequests } from "../utils/apiHooks/useReceivedRequests";
import { useConnections } from "../utils/apiHooks/useConnections";

const AuthProvider = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = useRef(false);

  const { fetch: fetchSendRequests } = useSendRequests();
  const { fetch: fetchReceivedRequests } = useReceivedRequests();
  const { fetch: fetchConnections } = useConnections();

  useEffect(() => {
    const path = location.pathname;

    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      path.startsWith(route)
    );
    if (hasInitialized.current || !isProtectedRoute) return;
    const init = async () => {
      hasInitialized.current = true;
      try {
        if (!user) {
          const res = await axios.get(`${BASE_URL}auth/me`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          dispatch(addUser(res.data.user));
        }
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    init();
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      fetchSendRequests();
      fetchReceivedRequests();
      fetchConnections();
    }
  }, [user, fetchSendRequests, fetchReceivedRequests, fetchConnections]);

  return children;
};

export default AuthProvider;
