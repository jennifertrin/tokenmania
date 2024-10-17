import React, { useState } from 'react';
import TokenInfo from './TokenInfo';
import BalanceChecker from './BalanceChecker';
import Header from './Header';
import TokenSender from './TokenSender';
import ApproveSpender from './TokenApprove';
import TransferFrom from './TokenTransfer';
import InternetIdentity from './InternetIdentity';

const TokenManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        isAuthenticated={isAuthenticated}
        identity={identity}
        setIsAuthenticated={setIsAuthenticated}
        setIdentity={setIdentity}
      />
      <TokenInfo />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
          {isAuthenticated ? (
            <>
              <BalanceChecker />
              <TokenSender />
              <ApproveSpender />
              <TransferFrom />
            </>
          ) : (
            <div className="bg-infinite border-l-4 text-white p-4 mt-4 rounded-md shadow-md">
              <div className="flex items-center">
                <span className="text-xl font-bold mr-2">!</span>
                <p className="font-bold">Authentication Required</p>
              </div>
              <p className="mt-2">
                Please sign in to access token management features.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenManagement;