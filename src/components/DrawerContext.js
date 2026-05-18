// components/DrawerContext.jsx
'use client';

import { createContext, useContext, useRef, useState } from 'react';
import { useDisclosure } from '@/hooks/a11y/useDisclosure.js';
import Drawer from '@/components/Drawer';

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
    const { isOpen, open, close } = useDisclosure(false);

    const triggerRef = useRef(null);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState('');
    const [side, setSide] = useState('bottom');

    const openDrawer = ({ title = '', node, triggerEl, side: sideOption = 'bottom' }) => {
        setTitle(title);
        setContent(node);
        setSide(sideOption);

        if (triggerEl) {
            triggerRef.current = triggerEl.current;
        }

        // Open after state updates are batched
        open();
    };

    const closeDrawer = () => {
        close();
    };

    return (
        <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
            {children}

            {/* Single global drawer instance */}
            <Drawer
                open={isOpen}
                onClose={closeDrawer}
                triggerRef={triggerRef}
                title={title}
                side={side}
            >
                {content}
            </Drawer>
        </DrawerContext.Provider>
    );
}

export function useDrawer() {
    const ctx = useContext(DrawerContext);
    if (!ctx) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return ctx;
}
