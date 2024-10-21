import React from 'react';

const AuthWarning = () => {
    return (
        <div className="bg-infinite border-l-4 border-white text-white p-4 mt-4 rounded-md shadow-md">
            <div className="flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                </svg>
                <h3 className="text-lg font-bold">Authentication Required</h3>
            </div>
            <p className="mt-2">
                Please sign in to access token management features. Ensuring your account is secure is our top priority.
            </p>
        </div>
    );
};

export default AuthWarning;