import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests } from '../utils/requestSlice'

const Requests = () => {

  const requestsRecieved = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}request/received`, {
        withCredentials: true,
      });
      console.log(res.data.requests);
      dispatch(getRequests(res.data.requests));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestsRecieved) return;

  console.log(requestsRecieved);

  return (
    requestsRecieved.map((request) => {
      const { name, about, photoURL } = request?.fromUserId;
      return (
        <div className="max-w-md mx-auto bg-base-200 shadow-md rounded-lg p-4 flex items-start gap-4">
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
              <p className="text-sm text-gray-500">
                {about}
              </p>
            </div>

            <div className="mt-3 flex justify-end">
              <button className="bg-green-600 text-white text-sm px-4 py-2 mx-4 rounded hover:bg-green-700 transition duration-200 cursor-pointer">
                Accept
              </button>
              <button className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition duration-200 cursor-pointer">
                Reject
              </button>
            </div>
          </div>
        </div>
      )
    })
  )
}

export default Requests
