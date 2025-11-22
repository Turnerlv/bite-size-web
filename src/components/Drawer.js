import React, { useState } from 'react';
import { useClickOutside, useFocusReturn, useKeyboardNavigation } from '../hooks';

export default function Drawer({ children, isOpen, onClose }) {
    const drawerRef = React.useRef(null);

    useClickOutside(drawerRef, onClose);
    useFocusReturn();
    useKeyboardNavigation({ onEscape: onClose });

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
                    <div
                        ref={drawerRef}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg z-50"
                        role="dialog"
                        aria-modal="true"
                    >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}