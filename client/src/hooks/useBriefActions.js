'use client';

import { useState, useEffect } from 'react';
import { briefsAPI } from '@/api/briefs';
import { useAuth } from '@/context/AuthContext';

export function useFetchBriefs() {
    const { user, isAdmin } = useAuth();
    const [briefList, setBriefList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBriefs = async () => {
            if (!user?.id) return;
            try {
                const data = isAdmin
                    ? await briefsAPI.client.getAll()
                    : await briefsAPI.client.getByAuthor(user.id);
                setBriefList(data);
            } catch (err) {
                console.error('Error fetching briefs:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBriefs();
    }, [user, isAdmin]);

    return { briefList, setBriefList, loading, error };
}
