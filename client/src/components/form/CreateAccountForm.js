'use client';

import Link from 'next/link';
import { Input } from '@/components/form/Input';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '@/schemas/authSchema';
import Alert from '@/components/Alert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { createAccountAction } from '@/lib/auth'; 

export default function CreateAccountForm({ isPage = true, onSwitchForm }) {
    
    const [serverError, setServerError] = useState(null);
    const { login } = useAuth();
    const { showToast } = useNotification();
    const router = useRouter();

    const onSubmit = async (data) => {
        setServerError(null);
        const result = await createAccountAction(data);

        if (result?.error) {
            setServerError(result.error);
            return;
        }

        login(result.token, result.user);
        showToast('Account created successfully', null, 'success');
        router.push('/admin/profile');
        router.refresh();
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createUserSchema),
    });

    const routeLogin = <Link
        href="/login"
        className="text-foreground underline underline-offset-2 hover:text-text-muted transition-colors"
    >
        Log in
    </Link>

    const handleSwitch = (e) => {
        e.preventDefault();
        if (onSwitchForm) {
            onSwitchForm();
        } else {
        }
    };

    const queryPathLogin = <button
        onClick={handleSwitch}
        className="text-foreground underline underline-offset-2 hover:text-text-muted transition-colors"
    >
        Login
    </button>

    return (
        <>
            {serverError && <Alert message={serverError} />}
            <form className="flex flex-col gap-6" aria-label="create account form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    size="lg"
                    label="Name"
                    placeholder="Your full name"
                    id="name"
                    error={errors.name?.message}
                    {...register('name')}
                />
                <Input
                    type="email"
                    size="lg"
                    label="Email"
                    placeholder="you@example.com"
                    id="email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <Input
                    type="password"
                    size="lg"
                    label="Password"
                    placeholder="Choose a strong password"
                    id="password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <div className="flex pt-2">
                    <Button type="submit" size="lg" responsive isLoading={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </Button>
                </div>

            </form>
            <p className="text-sm text-text-muted text-center mt-6">
                Already have an account?{' '}
                {isPage ? routeLogin : queryPathLogin}
            </p>
        </>
    );
}