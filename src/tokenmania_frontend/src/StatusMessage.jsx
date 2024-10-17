import React from 'react';

const StatusMessage = ({ message, isSuccess }) => {
    if (!message) return null;

    return (
        <div className={`mt-4 p-3 border rounded-md flex items-center ${isSuccess
            ? 'bg-green-100 border-green-300 text-green-800'
            : 'bg-red-100 border-red-300 text-red-800'
            }`}>
            <span className={`inline-block w-5 h-5 mr-2 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'
                } flex items-center justify-center`}>
                {isSuccess
                    ? <span className="text-white text-xs">✓</span>
                    : <span className="text-white text-xs">✕</span>
                }
            </span>
            {message}
        </div>
    );
};

export default StatusMessage;