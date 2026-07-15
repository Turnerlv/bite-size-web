'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/api/auth';
import { useNotification } from '@/context/NotificationContext';

export function useCreateAccount() {
    const { login } = useAuth();
    const router = useRouter();
    const { showToast } = useNotification();
    const [serverError, setServerError] = useState(null);

    const onSubmit = async (formData) => {
        setServerError(null);
        try {
            const { name, email, password: provider_key } = formData;
            const payload = { name, email, provider_key };

            const data = await authAPI.createAccount(payload);

            login(data.token, data.user);
            showToast('Account created successfully', null, 'success');
            router.push('/admin/profile');
        } catch (error) {
            const data = error.response?.data;
            setServerError(data?.message ?? data?.error ?? 'Something went wrong. Please try again.');
        }
    };

    return { onSubmit, serverError };
}

export function useLogin() {
    const { login } = useAuth();
    const router = useRouter();
    const { showToast } = useNotification();
    const [serverError, setServerError] = useState(null);

    const onSubmit = async (formData) => {
        setServerError(null);
        try {
            const { email, password: provider_key } = formData;
            const payload = { email, provider_key };

            const data = await authAPI.login(payload);

            login(data.token, data.user);
            showToast('Logged in successfully', null, 'success');
            router.push('/admin/profile');
        } catch (error) {
            const data = error.response?.data;
            setServerError(data?.message ?? data?.error ?? 'Something went wrong. Please try again.');
        }
    };

    return { onSubmit, serverError };
}

export function useResetPassword() {
    const { showToast } = useNotification();
    const { reset } = useAuth();

    const onSubmit = async (formData) => {
        try {
            await authAPI.updatePassword(formData);
            showToast('Password updated', 'Your changes will take effect on next login.', 'success');
            reset();
        } catch (error) {
            showToast('Error', 'Failed to update password. Please try again.', 'error');
        }
    };

    return { onSubmit };
}