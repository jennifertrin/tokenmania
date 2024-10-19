import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import StatusMessage from './StatusMessage';

const TransferFrom = ({ authenticatedActor }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [spenderSubaccount, setSpenderSubaccount] = useState('');
    const [status, setStatus] = useState({ message: '', isSuccess: null });

    const handleTransferFrom = async (e) => {
        e.preventDefault();
        try {
            await authenticatedActor.icrc2_transfer_from({
                from: { owner: Principal.fromText(fromAddress), subaccount: [] },
                to: { owner: toAddress, subaccount: [] },
                amount: BigInt(amount),
                spender_subaccount: spenderSubaccount ? [spenderSubaccount] : [],
                fee: 10_000,
                memo: [],
                created_at_time: [],
            });
            if ('Ok' in result) {
                setStatus({ message: 'Transfer successful', isSuccess: true });
            } else if ('Err' in result) {
                setStatus({
                    message: `Transfer failed: ${Object.keys(result.Err)[0]}`,
                    isSuccess: false
                });
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
            <StatusMessage message={status.message} isSuccess={status.isSuccess} />
        </div>
    );
};

export default TransferFrom;