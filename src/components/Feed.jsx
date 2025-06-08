import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { addFeed } from '../utils/feedSlice';
import { BASE_URL, USER_ICON_PATH } from '../utils/constants';

const Feed = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const fetchConnections = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}user/feed`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
      console.log('From feed', res.data.users);
    } catch (err) {
      console.log(err);
    }
  }

  // Send Connection Request API Call
  const sendConnectionRequest = async (userId) => {
    try {
      const res = await axios.post(`${BASE_URL}request/send/${userId}`, {}, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  const currentUser = feed && feed.length > 0 ? feed[currentIdx] : null;
  const { _id, name, photoURL, about } = currentUser || {};
  const isNext = feed && feed.length > currentIdx;

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
          Ignore
        </button>
        <button onClick={() => {
          sendConnectionRequest(_id)
          setCurrentIdx(prev => prev + 1)
        }} className="flex-1 btn btn-primary">Interested</button>
      </div>
    </div>
  );
}

export default Feed
