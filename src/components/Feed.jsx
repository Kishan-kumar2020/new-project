import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, USER_ICON_PATH } from '../utils/constants';

const Feed = () => {

  const [feed, setFeed] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const fetchConnections = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get(`${BASE_URL}user/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeed(data.users);
      console.log('From get', data.users);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  const currentUser = feed[currentIdx];
  const { name, photoURL, about } = currentUser ? currentUser : '';
  const isNext = feed.length - currentIdx;
  console.log('isNext', isNext);

  if (!isNext) {
    return <p className="text-center text-lg text-gray-500">No more users to show.</p>;
  }

  return (
    <div className="w-md mx-auto bg-base-100 rounded-lg shadow-xs overflow-hidden p-6 flex flex-col self-center items-center space-y-4 shadow-amber-50">
      <img
        src={photoURL ? photoURL : USER_ICON_PATH}
        alt="Profile"
        className="w-32 h-32 object-cover rounded-full border-4 border-primary"
      />

      <div className="text-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500">Age: 26</p>
      </div>

      <p className="text-center text-gray-700">{about}</p>

      <div className="flex gap-4 w-full mt-4">
        <button
          onClick={() => setCurrentIdx(prev => prev + 1)}
          className="flex-1 btn btn-outline btn-error"
        >
          Reject
        </button>
        <button className="flex-1 btn btn-primary">Send Request</button>
      </div>
    </div>
  );
}

export default Feed
