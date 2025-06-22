import { useDispatch } from "react-redux";
import { addConnections } from "../../slices/connectionSlice";
import axios from "axios";

import { BASE_URL } from "../../constants";

export const useConnections = () => {
  const dispatch = useDispatch();
  
  const loadConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}request/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.connections || []));
    } catch (err) {
      console.log(err);
      console.error(
        "Error fetching requests:",
        err.response?.data || err.message
      );
    }
  };

  return { loadConnections };
};
