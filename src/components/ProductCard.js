'use client';

import React from 'react';
import Badge from './Badge';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const ProductCard = ({ heading, description, category, preview, route }) => {
    const router = useRouter(); // Initialize useRouter

    const handleClick = () => {
        router.push(route); // Navigate to the passed route
    };

    return (
        <div
            className="border border-border p-3 pt-4 w-full bg-gray-2 flex flex-col justify-between cursor-pointer"
            onClick={handleClick} // Add onClick event
        >
            <div className="flex items-start mb-3">
                <div className="flex-1 flex flex-col">
                    <h3 className="m-0 text-base font-bold">{heading}</h3>
                    <p className="m-0 text-gray-11 text-xs">{description}</p>
                </div>
                <Badge text={category} />
            </div>
            {preview && (
                <div className="w-full bg-gray-4 aspect-4/3 mt-auto">
                </div>
            )}
        </div>
    );
};

export default ProductCard;
