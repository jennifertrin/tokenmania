import React from 'react';
import InternetIdentity from './InternetIdentity';

const Header = ({ isAuthenticated, identity, setIsAuthenticated, setIdentity }) => {
    return (
        <header className="bg-infinite text-white p-4">
            <div className="mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-bold">Tokenmania</h1>
                <InternetIdentity
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    identity={identity}
                    setIdentity={setIdentity}
                    showIdentity={true}
                />
            </div>
        </header>
    );
};

export default Header;