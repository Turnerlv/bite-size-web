import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react'

export const NavItem = forwardRef(({
    label,
    itemKey,
    isOpen,
    onClick,
    onMouseEnter,
    onMouseLeave
}, ref) => {

    return (
        <li >
            <button
                ref={ref}
                className={`w-full sm:w-auto flex flex-row items-center justify-between gap-2
                            px-8 sm:px-5 pr-3 sm:pr-4 py-2 
                            sm:rounded-full cursor-pointer 
                            font-work text-base text-foreground 
                            hover:bg-gray-a-3 focus:custom-focus
                            ${isOpen ? 'bg-gray-a-2' : 'bg-transparent'}`}
                onClick={onClick}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={`menu-${itemKey}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {label}
                <ChevronDown
                    className={`w-4 h-4
                                transition duration-150 ease-out rotate-270
                                ${isOpen ? 'sm:-rotate-180' : 'sm:rotate-0'}`} />
            </button>
        </li>
    );
});
NavItem.displayName = 'NavItem';