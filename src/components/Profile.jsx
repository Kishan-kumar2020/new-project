import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Profile = () => {

  // FROM Line 6 to 15 this is the code to preview
  const [isEditing, setIsEditing] = useState(false);
  // const [profile, setProfile] = useState({
  //   name: "John Doe",
  //   email: "johndoe@example.com",
  //   about: "A passionate developer who loves clean UI and solving problems with code."
  // });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({ ...user });

  const { name, email, about } = formData;
  
  /**
   * This is the way to make use of our store
    

   * We don't require the additional state only formData we require

   */

  return (
    <div className="relative w-full max-w-6xl h-full overflow-hidden mx-auto my-10">
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
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
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
            onClick={() => {
              // setProfile({ ...formData });
              setIsEditing(false)
              dispatch(addUser(formData));
              /**
               * If we use store
               */
            }}
            className={`w-full text-white py-2 rounded bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out opacity-100 ${isEditing ? 'opacity-100' : 'opacity-0'} hover:duration-200 hover:ease-in-out`} >
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
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="font-medium">{email}</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-400 text-sm">About</p>
              <p>{about}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditing(true);
              setFormData({ ...user });
            }
            }
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ${isEditing ? 'opacity-0' : ''}`}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
