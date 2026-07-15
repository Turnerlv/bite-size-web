'use client';

import { Input } from '@/components/form/Input';
import { TextArea } from '@/components/form/TextArea';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema, updateProfileSchema } from '@/schemas/authSchema';
import { useNotification } from '@/context/NotificationContext';
import { changePasswordAction } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function UserProfile({ userData = {}, onUpdateProfile }) {
    const { showToast } = useNotification();
    const router = useRouter();

    const handleUpdateProfile = async (formData) => {
        const result = await onUpdateProfile(formData);
        if (result?.error) {
            showToast('Error', result.error, 'error');
        } else {
            showToast('Profile updated successfully', null, 'success');
            router.refresh();
        }
    };

    const handleResetPassword = async (data) => {
        const result = await changePasswordAction(data);
        if (result?.error) {
            showToast('Error', result.error, 'error');
        } else {
            showToast('Password updated', 'Your changes will take effect on next login.', 'success');
        }
    };
    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    } = useForm({
        resolver: zodResolver(updateProfileSchema),
        values: { name: userData.name ?? '', title: userData.title ?? '', bio: userData.bio ?? '' },
    });
    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    } = useForm({
        resolver: zodResolver(updatePasswordSchema),
    });

    return (
        <div className="flex flex-col gap-6">

            {/* Personal Information */}
            <form onSubmit={handleProfileSubmit(handleUpdateProfile)} className="border border-border p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-1 pb-2 ">
                    <h2 className="heading-4">Personal information</h2>
                    <p className="text-sm text-text-muted">Your account details.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                        type="text"
                        size="lg"
                        label="Name"
                        id="name"
                        error={profileErrors.name?.message}
                        {...registerProfile('name')}
                    />
                    <Input
                        type="email"
                        size="lg"
                        label="Email"
                        id="email"
                        value={userData.email ?? ''}
                        disabled
                    />
                </div>
                <Input
                    type="text"
                    size="lg"
                    label="Title"
                    id="title"
                    error={profileErrors.title?.message}
                    {...registerProfile('title')}
                />
                <TextArea
                    size="lg"
                    label="Bio"
                    id="bio"
                    rows={3}
                    error={profileErrors.bio?.message}
                    {...registerProfile('bio')}
                />
                <div className="flex justify-end">
                    <Button variant="outline" type="submit" size="sm" isLoading={isProfileSubmitting}>
                        Save changes
                    </Button>
                </div>
            </form>

            {/* Security */}
            <form onSubmit={handlePasswordSubmit(handleResetPassword)} className="border border-border p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-1 pb-2">
                    <h2 className="heading-4">Security</h2>
                    <p className="text-sm text-text-muted">Update your password.</p>
                </div>
                <Input
                    type="password"
                    size="lg"
                    label="Current password"
                    placeholder="Enter your current password"
                    id="current-password"
                    error={passwordErrors.current_password?.message}
                    {...registerPassword('current_password')}
                />
                <Input
                    type="password"
                    size="lg"
                    label="New password"
                    placeholder="Choose a new password"
                    id="new-password"
                    error={passwordErrors.new_password?.message}
                    {...registerPassword('new_password')}
                />
                <div className="flex justify-end">
                    <Button variant="outline" type="submit" size="sm" isLoading={isPasswordSubmitting}>
                        Reset password
                    </Button>
                </div>
            </form>

        </div>
    );
}
