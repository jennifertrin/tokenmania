import React, { useCallback, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from "../../declarations/tokenmania_backend";

const InternetIdentity = ({ isAuthenticated, setIsAuthenticated, identity, setIdentity }) => {
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

    const network = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");
    const internetIdentityUrl = network === "local" ? `http:/${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/` : `https://identity.ic0.app`

    const signIn = async () => {
        const authClient = await AuthClient.create();
        await authClient.login({
            identityProvider: internetIdentityUrl,
            onSuccess: async () => {
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

    useEffect(() => {
        if (isAuthenticated && identity) {
            const authenticatedActor = createActor(process.env.CANISTER_ID_TOKENMANIA_BACKEND, {
                agentOptions: {
                    identity,
                },
            });

            authenticatedActor.on_login();
        }
    }, [isAuthenticated, identity]);

    return (
        <div className="flex items-center space-x-4">
            {isAuthenticated ? (
                <>
                    <p className="text-sm">
                        <span className="font-mono">{identity?.getPrincipal().toString()}</span>
                    </p>
                    <button
                        onClick={signOut}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 text-sm rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <button
                    onClick={signIn}
                    className="bg-white text-blue-600 font-bold py-1 px-3 text-sm rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                    Sign In
                </button>
            )}
        </div>
    );
};

export default InternetIdentity;