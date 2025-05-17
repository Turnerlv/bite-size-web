'use client';

import { useEffect } from 'react';

export const useClickOutside = (ref, onOutsideClick) => {
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onOutsideClick?.();
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref, onOutsideClick]);
};
