import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const connectionsFetcher = async () => {
  try {
    const res = await axios.get(`${BASE_URL}request/connections`, {
      withCredentials: true,
    });
    return res.data?.connections || [];
  } catch (err) {
    console.log(err);
    console.error(
      "Error fetching requests:",
      err.response?.data || err.message
    );
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
};
