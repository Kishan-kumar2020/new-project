import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/slices/connectionSlice';

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}request/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.connections || []));
    } catch (err) {
      console.error('Error fetching connections:', err.response?.data || err.message);
    }
  }

  const handleRemove = async (userId) => {
    try {
      const res = await axios.delete(`${BASE_URL}request/remove/${userId}`, {
        withCredentials: true,
      });
      console.log(res.data.message);
      fetchConnections(); // Refresh the list
    } catch (err) {
      console.error('Error removing connection:', err.response?.data || err.message);
    }
  }

  useEffect(() => {
    if (!connections || connections.length === 0) {
      fetchConnections();
    }
  }, []);

  if (!connections || connections.length === 0) {
    return <div className="text-center mt-10 text-gray-500">No connections found.</div>;
  }

  return (
    connections.map((connection) => {
      const user = connection?.user;
      const userId = user?._id;

      if (!userId) return null; // Defensive check

      return (
        <div key={userId} className="max-w-md mx-auto bg-base-200 shadow-md rounded-lg p-4 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={user.photoURL}
              alt={user.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.about}</p>
            </div>

            <div className="mt-3">
              <button
                onClick={() => handleRemove(userId)}
                className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition duration-200 cursor-pointer"
              >
                Remove Connection
              </button>
            </div>
          </div>
        </div>
      )
    })
  );
}

export default Connections;
