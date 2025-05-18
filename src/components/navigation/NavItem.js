import React, { forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'

export const NavItem = forwardRef(({
    label,
    itemKey,
    isActive,
    onClick,
    onHover,
}, ref) => {


    return (
        <li onMouseEnter={() => onHover(itemKey)}>
            <button
                ref={ref}
                className={`flex flex-row items-center justify-between gap-2
                            px-8 sm:px-6 pr-3 sm:pr-4 py-2 
                            rounded-full cursor-pointer 
                            font-work text-base sm:text-lg text-foreground 
                            hover:bg-gray-a-3 
                            ${isActive ? 'bg-gray-a-2' : 'bg-transparent'}`}
                onClick={() => onClick(itemKey)}
                aria-haspopup="true"
                aria-expanded={isActive}
                aria-controls={`menu-${itemKey}`}
            >
                {label}
                <ChevronDown className='w-4 h-4' />
            </button>
        </li>
    );
});
NavItem.displayName = 'NavItem';