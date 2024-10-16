import React, { useState, useCallback, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const InternetIdentity = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [identity, setIdentity] = useState(null);

    const initAuth = useCallback(async () => {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
            handleAuthenticated(authClient);
        }
    }, []);

    const handleAuthenticated = async (authClient) => {
        const identity = authClient.getIdentity();
        setIsAuthenticated(true);
        setIdentity(identity);
    };

    const signIn = async () => {
        const authClient = await AuthClient.create();
        await authClient.login({
            identityProvider: "https://identity.ic0.app/#authorize",
            onSuccess: () => {
                handleAuthenticated(authClient);
            },
        });
    };

    const signOut = async () => {
        const authClient = await AuthClient.create();
        await authClient.logout();
        setIsAuthenticated(false);
        setIdentity(null);
    };

    useEffect(() => {
        initAuth();
    }, [initAuth]);

    return (
        <div className="flex flex-col items-end justify-center space-y-2">
            {!isAuthenticated ? (
                <button
                    onClick={signIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Sign In
                </button>
            ) : (
                <>
                    <p className="text-white text-sm">
                        <span className="font-mono">{identity?.getPrincipal().toString()}</span>
                    </p>
                    <button
                        onClick={signOut}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 text-sm rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Sign Out
                    </button>
                </>
            )}
        </div>
    );
};

export default InternetIdentity;