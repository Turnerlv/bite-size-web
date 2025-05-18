import React from 'react';

export const MegaMenu = ({ itemKey, isActive, items }) => {
    if (!isActive) return null;

    return (
        <div
            id={`menu-${itemKey}`}
            role="menu"
            aria-label={`${itemKey} submenu`}
            className="absolute left-0 top-full w-full bg-white shadow-lg border-t z-50"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 px-8 py-6">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="block text-sm font-medium text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        role="menuitem"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};
