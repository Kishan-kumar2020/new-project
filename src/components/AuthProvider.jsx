import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { addUser } from "../utils/slices/userSlice";
import { useRequests } from "../utils/api/hooks/useRequests";
import { useConnections } from "../utils/api/hooks/useConnections";
import { BASE_URL } from "../utils/constants";

const AuthProvider = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadRequests } = useRequests();
  const { loadConnections } = useConnections();

  useEffect(() => {
    const init = async () => {
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
  }, []);

  useEffect(() => {
    const fetchUserRelatedData = async () => {
      if (user && user._id) {
        await loadRequests();
        await loadConnections();
      }
    };

    fetchUserRelatedData();
  }, [user, loadRequests, loadConnections]);

  return children;
};

export default AuthProvider;
