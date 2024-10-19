import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import StatusMessage from './StatusMessage';

const TokenSender = ({ updateSupply, authenticatedActor }) => {
    const [address, setAddress] = useState('');
    const [fromSubaccount, setFromSubaccount] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState({ message: '', isSuccess: null });

    const handleSendTransaction = async (e) => {
        try {
            const result = await authenticatedActor.icrc1_transfer({
                to: {
                    owner: Principal.fromText(address),
                    subaccount: []
                },
                fee: [],
                memo: [],
                from_subaccount: fromSubaccount ? [fromSubaccount] : [],
                created_at_time: [],
                amount: BigInt(amount)
            });
            if ('Ok' in result) {
                setStatus({ message: 'Transfer successful', isSuccess: true });
                updateSupply();
            } else if ('Err' in result) {
                if ('InsufficientFunds' in result.Err) {
                    setStatus({
                        message: `Transfer failed: Insufficient funds. Available balance: ${result.Err.InsufficientFunds.balance}`,
                        isSuccess: false
                    });
                } else {
                    setStatus({
                        message: `Transfer failed: ${Object.keys(result.Err)[0]}`,
                        isSuccess: false
                    });
                }
            }
        } catch (error) {
            console.error('Transfer failed:', error);
            setStatus({
                message: 'Transfer failed: Unexpected error',
                isSuccess: false
            });
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
            <StatusMessage message={status.message} isSuccess={status.isSuccess} />
        </div>
    );
};

export default TokenSender;