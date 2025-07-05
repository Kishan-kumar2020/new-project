import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useReceivedRequests } from "../utils/apiHooks/useReceivedRequests";

const Requests = () => {
  const { fetch } = useReceivedRequests();
  const requestsRecievedList = useSelector(
    (state) => state.requests.receivedRequests
  );

  const handleRequest = async (status, requestedUserId) => {
    const requestStatus = status === "accept" ? "accepted" : "rejected";
    try {
      const res = await axios.post(
        `${BASE_URL}request/review/${requestedUserId}`,
        { status: requestStatus },
        { withCredentials: true }
      );
      fetch();
    } catch (err) {
      console.error(
        "Error updating request:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (!requestsRecievedList || requestsRecievedList.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No more pending requests.
      </div>
    );
  }

  return (
    <div>
      {requestsRecievedList.map((request) => {
        const requestId = request._id;
        const { _id, name, about, photoURL } = request?.fromUserId || {};

        return (
          <div
            key={requestId}
            className="max-w-md mx-auto bg-base-200 shadow-md rounded-lg p-4 flex items-start gap-4 mb-4"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={photoURL || "https://via.placeholder.com/150"}
                alt={`${name}'s profile`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {name || "Unknown User"}
                </h3>
                <p className="text-sm text-gray-500">
                  {about || "No bio available."}
                </p>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleRequest("accept", requestId)}
                  className="bg-green-600 text-white text-sm px-4 py-2 mx-2 rounded hover:bg-green-700 transition duration-200"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest("reject", requestId)}
                  className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
