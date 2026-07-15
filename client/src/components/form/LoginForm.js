'use client';

import Link from 'next/link';
import { Input } from '@/components/form/Input';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/authSchema';
import Alert from '@/components/Alert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { loginAction } from '@/lib/auth'; 
import { useParamLogout } from '@/hooks/paramLogout';

export default function LoginForm({ isPage = true, onSwitchForm }) {

    const [serverError, setServerError] = useState(null);
    const { login } = useAuth();
    const { showToast } = useNotification();
    const router = useRouter();

    useParamLogout();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // Submit
    const onSubmit = async (data) => {
        setServerError(null);
        const result = await loginAction(data);

            if (result?.error) {
                setServerError(result.error);
                return;
            }

                login(result.token, result.user);
                showToast('Logged in successfully', null, 'success');
                
                router.push('/admin/profile');
                router.refresh();
    }

    const routeCreateAccount = <Link
        href="/create-account"
        className="text-foreground underline underline-offset-2 hover:text-text-muted transition-colors"
    >
        Sign up
    </Link>

    const handleSwitch = (e) => {
        e.preventDefault();
        if (onSwitchForm) {
            onSwitchForm();
        } else {
        }
    };

    const queryPathCreateAccount = <button
        onClick={handleSwitch}
        className="text-foreground underline underline-offset-2 hover:text-text-muted transition-colors"
    >
        Sign up
    </button>

    return (
        <>
            {serverError && <Alert message={serverError} />}
            <form className="flex flex-col gap-6" aria-label="login form" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder="Your password"
                    id="password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <div className="flex pt-2">
                    <Button type="submit" size="lg" responsive isLoading={isSubmitting}>
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                </div>

                <p className="text-sm text-text-muted text-center">
                    Don&apos;t have an account?{' '}
                    {isPage ? routeCreateAccount : queryPathCreateAccount}
                </p>
            </form>
        </>
    );
}