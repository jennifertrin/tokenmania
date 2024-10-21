import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import StatusMessage from './StatusMessage';

const TransferFrom = ({ authenticatedActor }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState(null);
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

    const inputFields = [
        { name: 'fromAddress', value: fromAddress, setter: setFromAddress, placeholder: 'From Address', type: 'text', required: true },
        { name: 'toAddress', value: toAddress, setter: setToAddress, placeholder: 'To Address', type: 'text', required: true },
        { name: 'amount', value: amount, setter: setAmount, placeholder: 'Amount', type: 'number', required: true, min: '0', step: '0.000001' },
        { name: 'spenderSubaccount', value: spenderSubaccount, setter: setSpenderSubaccount, placeholder: 'Spender Subaccount (optional)', type: 'text', required: false },
    ];

    return (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Transfer From</h2>
            <form onSubmit={handleTransferFrom} className="space-y-6">
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
                    Transfer From
                </button>
            </form>
            <StatusMessage message={status.message} isSuccess={status.isSuccess} />
        </div>
    );
};

export default TransferFrom;