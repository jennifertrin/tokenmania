import React from 'react';

const Card = ({ icon, title, value }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-infinite/20 hover:border-infinite/40">
        <div className="flex items-center mb-2">
            <span className="text-4xl mr-3 bg-infinite/10 p-2 rounded-full">{icon}</span>
            <span className="text-lg font-semibold text-black tracking-tight">{title}</span>
        </div>
        <div className="text-3xl font-extrabold text-infinite tracking-wide">
            {Object.values(value)[0]}
        </div>
    </div>
);

const CardDisplay = ({ cards, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-infinite"></div>
            </div>
        );
    }

    return (
        <div className="bg-infinite/30 backdrop-blur-md p-8 shadow-lg mb-8 transition-all duration-500 hover:shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-white pb-2 inline-block tracking-tight leading-tight">
                Token Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </div>
    );
};

export default CardDisplay;