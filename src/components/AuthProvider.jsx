import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { addUser } from "../utils/slices/userSlice";
import { useRequests } from "../utils/api/hooks/useRequests";
import { BASE_URL } from "../utils/constants";

const AuthProvider = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadRequests } = useRequests();

  useEffect(() => {
    const init = async () => {
      try {
        if (!user) {
          const res = await axios.get(`${BASE_URL}auth/me`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          dispatch(addUser(res.data.user));
          await loadRequests();
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

  return children;
};

export default AuthProvider;
