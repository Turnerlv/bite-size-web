'use client';

import React from 'react';
import Badge from './Badge';
import { useRouter } from 'next/navigation';

export default function ProductCard({
    heading,
    description,
    category,
    preview,
    route,
    className = '',
}) {
    const router = useRouter();

    const handleClick = () => {
        if (route) router.push(route);
    };

    return (
        <div
            className={[
                // default card styles
                'border border-border bg-gray-2 p-3 pt-4',
                'flex flex-col justify-between cursor-pointer',
                // layout styles from parent
                className,
            ].join(' ')}
            onClick={handleClick}
        >
            <div className="mb-3 flex items-start gap-2">
                <div className="flex-1">
                    <h3 className="m-0 text-base font-bold">{heading}</h3>
                    <p className="m-0 text-xs text-gray-11">{description}</p>
                </div>
                <Badge text={category} />
            </div>

            {preview && (
                <div className="mt-auto">
                    <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-4">
                        <img
                            src={preview}
                            alt={heading}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
