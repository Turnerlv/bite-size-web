import React from 'react';

const Badge = ({ text, color = 'bg-yellow-a4' }) => {
    return (
        <span className={`inline-flex items-center px-2 py-1 text-[10px] leading-4 ${color} text-yellow-a12 rounded uppercase font-roboto`}>
            {text}
        </span>
    );
};

export default Badge;