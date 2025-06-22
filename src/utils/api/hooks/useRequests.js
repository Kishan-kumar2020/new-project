import { useDispatch } from "react-redux";
import { getRequests } from "../../slices/requestSlice";
import axios from "axios";

import { BASE_URL } from "../../constants";

export const useRequests = () => {
  const dispatch = useDispatch();

  const loadRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}request/received`, {
        withCredentials: true,
      });
      dispatch(getRequests(res.data.requests));
    } catch (err) {
      console.error(
        "Error fetching requests:",
        err.response?.data || err.message
      );
    }
  };

  return {loadRequests};
};
