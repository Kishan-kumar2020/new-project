import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/slices/userSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user && user.name) {
      setFormData(user);
    }
  }, [user]);

  const { email, ...updateData } = formData;
  const { name, about, photoURL, age, gender } = updateData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  }

  const handleSave = async () => {
    try {
      const res = await axios.put(`${BASE_URL}user/profile`, updateData, {
        withCredentials: true,
      });

      if (res) {
        setError('');
        setIsEditing(false);
        dispatch(addUser(res.data?.user));
      } else {
        setError(res.data?.message);
      }
    } catch (err) {
      const errorOccured = err.response?.data?.errors ? err.response?.data?.errors[0]?.message : err.response?.data?.message;
      setError(errorOccured);
    }
  }


  return (
    <div className="relative w-full max-w-6xl overflow-hidden mx-auto self-center">
      <div
        className="flex justify-center w-full gap-1 h-full relative"
      >
        {/* Profile Edit Form */}
        <div className={`w-1/2 h-full px-6 pt-4 pb-8 bg-base-200 shadow-md border-2 border-blue-950 rounded-lg mx-4 opacity-0 transition duration-300 ease-in-out ${isEditing ? 'editPageTransition' : ''}`}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
          <p className='text-red-500'>{error}</p>
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Name</label>
            <input
              name='name'
              type="text"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm">PhotoURL</label>
            <input
              name='photoURL'
              type="text"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={photoURL}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Gender</label>
            <br />
            <select name='gender' value={gender} onChange={handleChange} className='w-full mt-2 border rounded p-2'>
              <option className='bg-base-300' value='male'>male</option>
              <option className='bg-base-300' value='female'>female</option>
              <option className='bg-base-300' value='other'>others</option>
              <option className='bg-base-300' value='prefer_not_to_say'>Prefer no to say</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Age</label>
            <input
              name='age'
              type="number"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={age}
              min='18'
              max='100'
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-400 text-sm">About</label>
            <textarea
              name='about'
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 resize-none"
              rows="3"
              value={about}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-between gap-4'>
            <button
              onClick={handleCancel}
              className={`flex-1 text-white py-2 rounded bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out opacity-100 ${isEditing ? 'opacity-100' : 'opacity-0'} hover:duration-200 hover:ease-in-out cursor-pointer`} >
              ❌ Cancel
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 text-white py-2 rounded bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out opacity-100 ${isEditing ? 'opacity-100' : 'opacity-0'} hover:duration-200 hover:ease-in-out cursor-pointer`} >
              ✅ Save
            </button>
          </div>
        </div>


        {/* Profile Preview */}
        <div className={`w-1/3 h-full absolute px-6 pt-4 pb-8 bg-base-200 shadow-md border-2 border-blue-950 rounded-lg mx-4 flex flex-col transition duration-300 ease-in-out ${isEditing ? 'previewPageTransition' : ''}`}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Profile Preview</h2>
          <div className="flex-1">
            <img src={photoURL} alt='Add Photo' className='mx-auto my-4 w-full h-[200px] rounded object-contain' />
            <div className="mb-2">
              <p className="font-medium">{name}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">{age}, {gender}</p>
            </div>
            <div className="mb-6">
              <p>{about}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditing(true);
              setError('')
            }
            }
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ${isEditing ? 'opacity-0' : ''} cursor-pointer`}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
