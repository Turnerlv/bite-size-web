import { usersAPI } from '@/api/users';
import UsersList from '../_components/UsersList';
import PrivateRoute from '@/app/PrivateRoute';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    let userList = [];

    try {
        userList = await usersAPI.server.getAll({ cache: 'no-store' });
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const handleDelete = async (id) => {
        'use server';
        await usersAPI.server.deleteUser(id);
    };

    return (
        <PrivateRoute>
            <UsersList initialUsers={userList} onDeleteUser={handleDelete} />
        </PrivateRoute>
    );
}