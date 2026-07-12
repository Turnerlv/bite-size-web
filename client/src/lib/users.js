'use server';

import { usersAPI } from '@/api/users';
import { getServerSession } from '@/lib/auth';

export async function updateProfileAction(formData) {
    try {
        const user = await getServerSession();
        const updated = await usersAPI.server.updateUser(user.id, formData);
        return { success: true, user: updated };
    } catch (error) {
        return { error: error?.message ?? 'Failed to update profile' };
    }
}
