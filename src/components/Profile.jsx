import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) => state.user);
  console.log("From Profile", user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ ...user });
  const { email, ...updateData } = formData;

  const { name, about } = formData;

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(BASE_URL + 'user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...updateData, photoURL: 'https://search.brave.com/images?q=Image&context=W3sic3JjIjoiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9iL2I2L0ltYWdlX2NyZWF0ZWRfd2l0aF9hX21vYmlsZV9waG9uZS5wbmcvOTYwcHgtSW1hZ2VfY3JlYXRlZF93aXRoX2FfbW9iaWxlX3Bob25lLnBuZyIsInRleHQiOiJJbWFnZSAtIFdpa2lwZWRpYSIsInBhZ2VfdXJsIjoiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSW1hZ2UifV0%3D&sig=306c27ef4f455c2b8010b8c6435188f6ea20f8355d967ae6af2dd58619dafcf1&nonce=7277f3a71dd226c4117c53312799532c' })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setIsEditing(false);
        dispatch(addUser(data));
      } else {
        console.error('Update failed:', data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };


  return (
    <div className="relative w-full max-w-6xl overflow-hidden mx-auto self-center">
      <div
        className="flex justify-center w-full gap-1 h-full relative"
      >
        {/* Profile Edit Form */}
        <div className={`w-1/2 px-6 py-8 bg-base-200 shadow-md border-2 border-blue-950 rounded-lg mx-4 opacity-0 transition duration-300 ease-in-out ${isEditing ? 'editPageTransition' : ''}`}>
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Name</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          {/* <div className="mb-4">
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div> */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm">About</label>
            <textarea
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              rows="4"
              value={about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            />
          </div>
          <button
            onClick={handleSave}
            className={`w-full text-white py-2 rounded bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out opacity-100 ${isEditing ? 'opacity-100' : 'opacity-0'} hover:duration-200 hover:ease-in-out cursor-pointer`} >
            Save
          </button>
        </div>
        {/* Profile Preview */}
        <div className={`w-1/3 h-full absolute px-6 py-8 bg-base-200 shadow-md border-2 border-blue-950 rounded-lg mx-4 flex flex-col transition duration-300 ease-in-out ${isEditing ? 'previewPageTransition' : ''}`}>
          <h2 className="text-2xl font-semibold mb-4">Profile Preview</h2>
          <div className="flex-1 overflow-auto">
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Name</p>
              <p className="font-medium">{name}</p>
            </div>
            {/* <div className="mb-4">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="font-medium">{email}</p>
            </div> */}
            <div className="mb-6">
              <p className="text-gray-400 text-sm">About</p>
              <p>{about}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditing(true);
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
