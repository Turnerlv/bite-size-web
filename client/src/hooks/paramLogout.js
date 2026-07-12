'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export function useParamLogout() {
    const { logout } = useAuth();
    const searchParams = useSearchParams();
    const logoutParam = searchParams.get('reason');

    useEffect(() => {
        if (logoutParam === 'expired') {
            console.log('Logging out due to expired session...');
            logout();
        }
    }, [logoutParam, logout]);

    return null;
}

