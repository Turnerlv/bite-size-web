import { getServerSession } from '@/lib/auth';
import { usersAPI } from '@/api/users';
import { updateProfileAction } from '@/lib/users';
import UserProfile from '../_components/UserProfile';

export default async function ProfilePage() {
    const session = await getServerSession();
    let userData = {};

    try {
        if (session?.id) {
            userData = await usersAPI.server.getById(session.id, { next: { revalidate: 30 } }) ?? {};
        }
    } catch (error) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
        console.error('Error fetching user:', error);
    }

    return (
        <UserProfile userData={userData} onUpdateProfile={updateProfileAction} />
    );
}
