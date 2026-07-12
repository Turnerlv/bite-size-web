'use client';

import { useState, useEffect } from 'react';
import { usersAPI } from '@/api/users';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';

export function useFetchUser() {
    const { user } = useAuth();
    const { showToast } = useNotification();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!user?.id) return;
            try {
                const data = await usersAPI.client.getById(user.id, { cache: 'no-store' });
                if (!data) {
                    setError(true);
                } else {
                    setUserData(data);
                }
            } catch (err) {
                showToast('Error', 'Failed to fetch user data. Please try again.', 'error');
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    return { userData, loading, error };
}

export function useUpdateProfile() {
    const { showToast } = useNotification();
    const { user, updateUser } = useAuth();
    const router = useRouter();
    const onSubmit = async (formData) => {

        try {
            const updatedUser = await usersAPI.client.updateUser(user.id, formData);
            updateUser({ ...user, name: updatedUser.name });
            showToast('Profile updated successfully', null, 'success');
            router.refresh();
        } catch (error) {
            showToast('Error', 'Failed to update profile. Please try again.', 'error');
        }
    };

    return { onSubmit };
}
