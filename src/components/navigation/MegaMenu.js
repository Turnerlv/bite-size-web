'use client';

import React, { useEffect, useRef } from 'react';
import { useKeyboardNavigation } from '@/hooks/a11y/useKeyboardNavigation';
import { useClickOutside } from '@/hooks/a11y/useClickOutside';
import { useFocusReturn } from '@/hooks/a11y/useFocusReturn';

export const MegaMenu = ({
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
            className="focus:outline-none"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 px-8 py-6">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        role="menuitem"
                        tabIndex={0}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className="block font-medium hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};
