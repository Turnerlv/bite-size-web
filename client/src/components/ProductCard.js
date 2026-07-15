import React from 'react';
import Badge from './Badge';
import Link from 'next/link';

export default function ProductCard({
    bite,
    className = '',
}) {

    return (
        <Link href={`/bites/${bite.slug}`}
            className={[
                // default card styles
                'border border-border bg-surface p-3 pt-4',
                'flex flex-col justify-between cursor-pointer',
                // layout styles from parent
                className,
            ].join(' ')}
        >
            <div className="mb-3 flex items-start gap-2">
                <div className="flex-1">
                    <h3 className="m-0 text-base font-bold">{bite.heading}</h3>
                    <p className="m-0 text-xs text-gray-11">{bite.description}</p>
                </div>
                <Badge text={bite.category} />
            </div>

            {bite.preview && (
                <div className="mt-auto">
                    <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-4">
                        <img
                            src={bite.preview}
                            alt={bite.heading}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            )}
        </Link>
    );
}
