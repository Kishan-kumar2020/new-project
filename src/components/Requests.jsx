import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useRequests } from "../utils/api/hooks/useRequests";

const Requests = () => {
  const { loadRequests } = useRequests();
  const requestsRecieved = useSelector((state) => state.requests);

  const handleRequest = async (status, requestedUserId) => {
    const requestStatus = status === "accept" ? "accepted" : "rejected";
    try {
      const res = await axios.post(
        `${BASE_URL}request/review/${requestedUserId}`,
        { status: requestStatus },
        { withCredentials: true }
      );
      console.log(res.data);
      loadRequests();
    } catch (err) {
      console.error(
        "Error updating request:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  if (!requestsRecieved || requestsRecieved.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No more pending requests.
      </div>
    );
  }

  return requestsRecieved.map((request) => {
    const requestId = request._id;
    const { _id, name, about, photoURL } = request?.fromUserId;
    return (
      <div
        key={requestId}
        className="max-w-md mx-auto bg-base-200 shadow-md rounded-lg p-4 flex items-start gap-4"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <img
            // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            src={photoURL}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{about}</p>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={() => handleRequest("accept", requestId)}
              className="bg-green-600 text-white text-sm px-4 py-2 mx-4 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              Accept
            </button>
            <button
              onClick={() => handleRequest("reject", requestId)}
              className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition duration-200 cursor-pointer"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default Requests;
