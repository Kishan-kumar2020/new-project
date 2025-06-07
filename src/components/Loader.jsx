import React from 'react'

const Loader = ({ message = 'ABCDEF' }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="text-center mb-4 text-green-500">{message}</div>
            <div className="flex-1 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
