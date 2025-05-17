'use client';

import React, { useState, useEffect } from 'react';

const isMobile = () => window.innerWidth <= 768;

export const NavItemExpand = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileView, setMobileView] = useState(isMobile());

    useEffect(() => {
        const handleResize = () => setMobileView(isMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const hasChildren = item.children && item.children.length > 0;

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const open = isOpen || (!mobileView && hasChildren);

    return (
        <div
            className="relative group md:mx-2"
            onMouseEnter={() => !mobileView && hasChildren && setIsOpen(true)}
            onMouseLeave={() => !mobileView && hasChildren && setIsOpen(false)}
        >
            <div className="flex items-center justify-between">
                {mobileView && hasChildren ? (
                    <button
                        onClick={toggleMenu}
                        className="w-full text-left p-2"
                    >
                        {item.label}
                    </button>
                ) : (
                    <a href={item.href} className="p-2 block hover:underline">
                        {item.label}
                    </a>
                )}
            </div>

            {hasChildren && open && (
                <div className="md:absolute md:left-0 md:top-full md:w-64 bg-white shadow-lg z-10 md:group-hover:block md:hidden">
                    <ul className="p-4 space-y-2">
                        {mobileView && (
                            <li>
                                <a href={item.href} className="block text-blue-600 font-semibold">
                                    View All {item.label}
                                </a>
                            </li>
                        )}
                        {item.children.map((child) => (
                            <li key={child.label}>
                                <a href={child.href} className="block hover:underline">
                                    {child.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
