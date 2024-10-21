import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import { tokenmania_backend } from "../../declarations/tokenmania_backend";

const BalanceChecker = () => {
    const [principal, setPrincipal] = useState('');
    const [subaccount, setSubaccount] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    const handleCheckBalance = async (e) => {
        e.preventDefault();
        setBalance(null);
        setError('');

        try {
            const owner = Principal.fromText(principal);
            const subaccountArray = subaccount ?
                [new Uint8Array(subaccount.split(',').map(num => parseInt(num.trim(), 10)))] :
                [];

            const result = await tokenmania_backend.icrc1_balance_of({
                owner: owner,
                subaccount: subaccountArray
            });

            setBalance(result.toString());
        } catch (err) {
            console.error('Error checking balance:', err);
            setError('Failed to check balance. Please ensure the principal is valid.');
        }
    };

    const inputFields = [
        { name: 'principal', value: principal, setter: setPrincipal, placeholder: 'Principal ID', type: 'text', required: true },
        { name: 'subaccount', value: subaccount, setter: setSubaccount, placeholder: 'Subaccount (optional)', type: 'text', required: false },
    ];

    return (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Check Balance</h2>
            <form onSubmit={handleCheckBalance} className="space-y-6">
                {inputFields.map(({ name, value, setter, placeholder, type, required }) => (
                    <input
                        key={name}
                        type={type}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                ))}
                <button
                    type="submit"
                    className="w-full bg-infinite text-white py-2 px-4 rounded-md hover:bg-dark-infinite"
                >
                    Check Balance
                </button>
            </form>
            {balance !== null && (
                <div className="mt-4 p-3 bg-gray-100 border rounded-md">
                    Balance: {balance}
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}
        </div>
    );
};

export default BalanceChecker;