import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import StatusMessage from './StatusMessage';

const TokenSender = ({ updateSupply, authenticatedActor }) => {
    const [fromSubaccount, setFromSubaccount] = useState('');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(null);
    const [status, setStatus] = useState({ message: '', isSuccess: null });

    const handleSendTransaction = async (e) => {
        e.preventDefault();
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

    const inputFields = [
        { name: 'fromSubaccount', value: fromSubaccount, setter: setFromSubaccount, placeholder: 'From Subaccount (optional)', type: 'text', required: false },
        { name: 'address', value: address, setter: setAddress, placeholder: 'Recipient Address', type: 'text', required: true },
        { name: 'amount', value: amount, setter: setAmount, placeholder: 'Amount', type: 'number', required: true, min: '0', step: '0.000001' },
    ];

    return (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Tokens</h2>
            <form onSubmit={handleSendTransaction} className="space-y-6">
                {inputFields.map(({ name, value, setter, placeholder, type, required, min, step }) => (
                    <input
                        key={name}
                        type={type}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        min={min}
                        step={step}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                ))}
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