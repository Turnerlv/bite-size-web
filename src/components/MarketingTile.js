import React from 'react';
import clsx from 'clsx';

const Tile = ({ image, padding, title, description }) => (
    <div className="flex border border-border overflow-hidden">
        <div className="flex-shrink-0 bg-primary-contrast aspect-square w-[132px] sm:w-auto flex items-center justify-center">
            <img
                src={image}
                alt={title}
                className={clsx(padding, 'aspect-square m-auto sm:object-cover sm:w-full sm:h-full')}
            />
        </div>
        <div className="flex flex-col justify-center p-6 bg-gray-a2">
            <h3 className="heading-5 mb-1">{title}</h3>
            <p className="text-sm font-work text-text-muted">{description}</p>
        </div>
    </div>
);

export default Tile;