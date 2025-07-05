import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const sendRequestsFetcher = async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}request/sent`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data?.requests;
  } catch (err) {
    console.log(err);
    console.error(
      "Error fetching requests:",
      err.response?.data || err.message
    );
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
};
