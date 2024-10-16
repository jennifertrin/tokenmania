import React, { useState, useEffect } from 'react';
import { tokenmania_backend } from "../../declarations/tokenmania_backend";

const TokenInfo = () => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTokenInfo = async () => {
            try {
                const metadata = await tokenmania_backend.icrc1_metadata();
                const supply = await tokenmania_backend.icrc1_total_supply();

                metadata.forEach(item => {
                    if (item[0] === "icrc1:name") {
                        setTokenName(item[1].Text);
                    } else if (item[0] === "icrc1:symbol") {
                        setTokenSymbol(item[1].Text);
                    }
                });

                setTotalSupply(Number(supply).toLocaleString());
                setLoading(false);
            } catch (error) {
                console.error("Error fetching token info:", error);
                setLoading(false);
            }
        };

        fetchTokenInfo();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-md mb-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800 border-b border-indigo-200 pb-2">Token Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoCard icon="💰" title="Name" value={tokenName} />
                <InfoCard icon="🏷️" title="Symbol" value={tokenSymbol} />
                <InfoCard icon="📊" title="Total Supply" value={totalSupply} />
            </div>
        </div>
    );
};

const InfoCard = ({ icon, title, value }) => (
    <div className="bg-white p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>
        <p className="text-xl font-bold text-indigo-600 truncate" title={value}>
            {value}
        </p>
    </div>
);

export default TokenInfo;