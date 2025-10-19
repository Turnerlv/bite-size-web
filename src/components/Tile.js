import React from 'react';
import clsx from 'clsx';

const Tile = ({ image, padding, title, description }) => (
    <div className="flex border border-border">
        <div className="flex-shrink-0 bg-primary-contrast aspect-square overflow-hidden">
            <img
                src={image}
                alt={title}
                className={clsx(padding, 'object-cover w-full h-full')}
            />
        </div>
        <div className="flex flex-col justify-center p-6 bg-gray-1">
            <h3 className="heading-6 md:heading-5 mb-1">{title}</h3>
            <p className="text-sm font-work text-text-muted">{description}</p>
        </div>
    </div>
);

export default Tile;