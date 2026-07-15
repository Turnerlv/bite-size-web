// components/DrawerContext.jsx
'use client';

import { createContext, useContext, useRef, useState } from 'react';
import { useDisclosure } from '@/hooks/a11y/useDisclosure.js';
import Drawer from '@/components/Drawer';

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
    const urlKeyRef = useRef('');
    const { isOpen, open, close } = useDisclosure(false, { urlKey: urlKeyRef });

    const triggerRef = useRef(null);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState('');
    const [side, setSide] = useState('bottom');
    const [contentSize, setContentSize] = useState('default');

    const openDrawer = ({ title = '', node, triggerEl, side: sideOption = 'bottom', urlKey, contentSize }) => {
        setTitle(title);
        setContent(node);
        setSide(sideOption);
        urlKeyRef.current = urlKey ?? '';
        setContentSize(contentSize)

        if (triggerEl) {
            triggerRef.current = triggerEl.current;
        }

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
                contentSize={contentSize}
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
