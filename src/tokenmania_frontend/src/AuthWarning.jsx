import React from 'react';

const FullPageAuthWarning = () => {
    return (
        <div className="w-screen h-screen px-0 -my-8 bg-infinite text-white">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-black bg-opacity-30 border-l-4 border-white p-6 rounded-md shadow-lg">
                        <div className="flex items-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mr-3"
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
                            <h2 className="text-xl font-bold">Authentication Required</h2>
                        </div>
                        <p className="mb-4">
                            Please sign in to access token management features. Ensuring your account is secure is our top priority.
                        </p>
                        <button className="bg-white text-infinite font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                            Sign In
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FullPageAuthWarning;