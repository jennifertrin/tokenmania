import React, { useState, useEffect } from 'react';
import { tokenmania_backend } from "../../declarations/tokenmania_backend";
import CardDisplay from './CardDisplay';

const TokenInfo = ({ totalSupply }) => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTokenInfo = async () => {
            try {
                const metadata = await tokenmania_backend.icrc1_metadata();

                metadata.forEach(item => {
                    if (item[0] === "icrc1:name") {
                        setTokenName(item[1].Text);
                    } else if (item[0] === "icrc1:symbol") {
                        setTokenSymbol(item[1].Text);
                    }
                });

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

    const tokenInfo = [
        { icon: "💰", title: "Name", value: { tokenName } },
        { icon: "🏷️", title: "Symbol", value: { tokenSymbol } },
        { icon: "📊", title: "Total Supply", value: { totalSupply } }
    ];


    return (
        <CardDisplay cards={tokenInfo} />
    );
};

export default TokenInfo;