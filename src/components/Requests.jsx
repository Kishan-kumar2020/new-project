import React from 'react'

const Requests = () => {
  return (
    <div className="max-w-md mx-auto my-4 bg-base-200 shadow-md rounded-lg p-4 flex items-start gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">Jane Doe</h3>
          <p className="text-sm text-gray-500">
            Frontend developer who loves building interactive UIs with React and Tailwind.
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
}

export default Requests
