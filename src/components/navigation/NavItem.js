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
        <li>
            <button
                ref={ref}
                className={`
                    /* Size */
                    w-full sm:w-auto
                    /* Flex & Grid */
                    flex flex-row items-center justify-between
                    /* Spacing */
                    gap-2 px-8 sm:px-5 pr-3 sm:pr-4 py-2
                    /* Radius */
                    rounded-full
                    /* Background */
                    ${isOpen ? 'bg-gray-a-2' : 'bg-transparent'}
                    /* Text & Typography */
                    font-work text-base text-foreground
                    /* Interactivity */
                    cursor-pointer
                    /* State/ARIA/Data */
                    hover:bg-gray-a-3 focus:custom-focus
                `}
                onClick={onClick}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={`menu-${itemKey}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {label}
                <ChevronDown
                    className={`
                        /* Size */
                        w-4 h-4
                        /* Transforms & Animation */
                        rotate-270 transition duration-150 ease-out
                        /* State/ARIA/Data */
                        ${isOpen ? 'sm:-rotate-180' : 'sm:rotate-0'}
                    `} />
            </button>
        </li>
    );
});
NavItem.displayName = 'NavItem';
