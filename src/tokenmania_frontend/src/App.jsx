import React, { useState, useEffect } from 'react';
import ApproveSpender from './TokenApprove';
import AuthWarning from './AuthWarning';
import BalanceChecker from './BalanceChecker';
import { createActor, tokenmania_backend } from "../../declarations/tokenmania_backend";
import Header from './Header';
import TransferFrom from './TokenTransfer';
import TokenInfo from './TokenInfo';
import TokenSender from './TokenSender';

const TokenManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [totalSupply, setTotalSupply] = useState('');
  const [authenticatedActor, setAuthenticatedActor] = useState();

  const updateSupply = async () => {
    try {
      const supply = await tokenmania_backend.icrc1_total_supply();
      setTotalSupply(Number(supply).toLocaleString());
    } catch (error) {
      console.error("Error fetching total supply:", error);
    }
  };

  useEffect(() => {
    updateSupply();
  }, []);

  useEffect(() => {
    if (identity) {
      setAuthenticatedActor(createActor(process.env.CANISTER_ID_TOKENMANIA_BACKEND, {
        agentOptions: {
          identity,
        },
      }));
      authenticatedActor?.on_login();
    }
  }, [identity]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        isAuthenticated={isAuthenticated}
        identity={identity}
        setIsAuthenticated={setIsAuthenticated}
        setIdentity={setIdentity}
      />
      <TokenInfo totalSupply={totalSupply} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
          {isAuthenticated ? (
            <>
              <BalanceChecker />
              <TokenSender authenticatedActor={authenticatedActor} updateSupply={updateSupply} />
              <ApproveSpender authenticatedActor={authenticatedActor} />
              <TransferFrom authenticatedActor={authenticatedActor} updateSupply={updateSupply} />
            </>
          ) : (
            <AuthWarning />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenManagement;