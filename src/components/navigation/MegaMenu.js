'use client';

import React, { useEffect, useRef } from 'react';
import NavItemSecondary from './NavItemSecondary';
import { useKeyboardNavigation } from '@/hooks/a11y/useKeyboardNavigation';
import { useClickOutside } from '@/hooks/a11y/useClickOutside';
import { useFocusReturn } from '@/hooks/a11y/useFocusReturn';

export const MegaMenu = ({
    label,
    itemKey,
    isOpen,
    triggerRef,
    items,
    onClose,
    onMouseEnter,
    onMouseLeave
}) => {
    const panelRef = useRef();
    const {
        itemRefs,
        focusedIndex,
        setFocusedIndex,
        handleKeyDown
    } = useKeyboardNavigation(items.length, onClose);

    useClickOutside(panelRef, () => {
        setFocusedIndex(-1);
        onClose();
    });

    useFocusReturn(isOpen, triggerRef);

    useEffect(() => {
        if (isOpen) {
            panelRef.current?.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            id={`menu-${itemKey}`}
            role="menu"
            tabIndex={1}
            ref={panelRef}
            onKeyDown={handleKeyDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={`${itemKey} submenu`}
            className="focus:outline-none mx-auto w-full max-w-[1200px] pt-4"
        >
            <div className='flex flex-col gap-4 max-w-7xl mx-auto px-8 py-6 border-t border-border'>
                <h2 className='text-lg font-rubik font-semibold'>{label}</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {items.map((item, index) => (
                        <NavItemSecondary
                            key={index}
                            label={item.label}
                            description={item.description}
                            href={item.href}
                            icon={item.icon}
                            ref={(el) => (itemRefs.current[index] = el)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
