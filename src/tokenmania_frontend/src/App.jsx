import React, { useState } from 'react';
import TokenInfo from './TokenInfo';
import { tokenmania_backend } from "../../declarations/tokenmania_backend";
import BalanceChecker from './BalanceChecker';

const Header = () => {
  return (
    <header className="bg-infinite text-white p-6 mb-8 shadow-lg">
      <h1 className="text-4xl font-bold tracking-tight">Tokenmania</h1>
    </header>
  );
};

const TokenSender = () => {
  const [address, setAddress] = useState('');
  const [fromSubaccount, setFromSubaccount] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSendTransaction = async (e) => {
    e.preventDefault();
    try {
      await tokenmania_backend.icrc1_transfer({
        'to': Principal.fromText(address),
        'fee': [],
        'memo': [],
        'from_subaccount': fromSubaccount ? [fromSubaccount] : [],
        'created_at_time': [],
        'amount': BigInt(amount),
      });
      setStatus('Transfer successful');
    } catch (error) {
      console.error('Transfer failed:', error);
      setStatus('Transfer failed');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Tokens</h2>
      <form onSubmit={handleSendTransaction} className="space-y-6">
        <input
          type="text"
          value={fromSubaccount}
          onChange={(e) => setFromSubaccount(e.target.value)}
          placeholder="From Subaccount (optional)"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Recipient Address"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          min="0"
          step="0.000001"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-infinite text-white py-2 px-4 rounded-md hover:bg-dark-infinite"
        >
          Send Tokens
        </button>
      </form>
      {status && <div className="mt-4 p-3 bg-gray-100 border rounded-md">{status}</div>}
    </div>
  );
};

const ApproveSpender = () => {
  const [spenderAddress, setSpenderAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [fromSubaccount, setFromSubaccount] = useState('');
  const [status, setStatus] = useState('');

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      await tokenmania_backend.icrc2_approve({
        spender: { owner: Principal.fromText(spenderAddress), subaccount: [] },
        amount: BigInt(amount),
        from_subaccount: fromSubaccount ? [fromSubaccount] : [],
        expires_at: [],
        expected_allowance: [],
        memo: [],
        fee: [],
        created_at_time: [],
      });
      setStatus('Approval successful');
    } catch (error) {
      console.error('Approval failed:', error);
      setStatus('Approval failed');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Approve Spender</h2>
      <form onSubmit={handleApprove} className="space-y-6">
        <input
          type="text"
          value={fromSubaccount}
          onChange={(e) => setFromSubaccount(e.target.value)}
          placeholder="From Subaccount (optional)"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          value={spenderAddress}
          onChange={(e) => setSpenderAddress(e.target.value)}
          placeholder="Spender Address"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Approved Amount"
          required
          min="0"
          step="0.000001"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-infinite text-white py-2 px-4 rounded-md hover:bg-dark-infinite"
        >
          Approve Spender
        </button>
      </form>
      {status && <div className="mt-4 p-3 bg-gray-100 border rounded-md">{status}</div>}
    </div>
  );
};

const TransferFrom = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [spenderSubaccount, setSpenderSubaccount] = useState('');
  const [status, setStatus] = useState('');

  const handleTransferFrom = async (e) => {
    e.preventDefault();
    try {
      await tokenmania_backend.icrc2_transfer_from({
        from: { owner: Principal.fromText(fromAddress), subaccount: [] },
        to: { owner: toAddress, subaccount: [] },
        amount: BigInt(amount),
        spender_subaccount: spenderSubaccount ? [spenderSubaccount] : [],
        fee: [],
        memo: [],
        created_at_time: [],
      });
      setStatus('Transfer-from successful');
    } catch (error) {
      console.error('Transfer-from failed:', error);
      setStatus('Transfer-from failed');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Transfer From</h2>
      <form onSubmit={handleTransferFrom} className="space-y-6">
        <input
          type="text"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          placeholder="From Address"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder="To Address"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          min="0"
          step="0.000001"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          value={spenderSubaccount}
          onChange={(e) => setSpenderSubaccount(e.target.value)}
          placeholder="Spender Subaccount (optional)"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-infinite text-white py-2 px-4 rounded-md hover:bg-dark-infinite"
        >
          Transfer From
        </button>
      </form>
      {status && <div className="mt-4 p-3 bg-gray-100 border rounded-md">{status}</div>}
    </div>
  );
};

const TokenManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <TokenInfo />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BalanceChecker />
          <TokenSender />
          <ApproveSpender />
          <TransferFrom />
        </div>
      </div>
    </div>
  );
};

export default TokenManagement;