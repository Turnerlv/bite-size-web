'use client';

import { useEffect } from 'react';

export const useClickOutside = (ref, onOutsideClick) => {
    useEffect(() => {
        const handler = (e) => {
            // Ignore clicks inside Radix UI portals (e.g. Select dropdowns) that are
            // rendered outside the ref's DOM subtree via document.body portals.
            if (e.target.closest('[data-radix-popper-content-wrapper]')) return;

            if (ref.current && !ref.current.contains(e.target)) {
                onOutsideClick?.();
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref, onOutsideClick]);
};
