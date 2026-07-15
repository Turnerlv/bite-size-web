'use client';

import { useState } from 'react';
import Table from '@/components/Table';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';

export default function UsersList({ initialUsers, onDeleteUser }) {
    const [userList, setUserList] = useState(initialUsers);
    const router = useRouter();
    const { showToast } = useNotification();

    const handleDelete = async (row) => {
        try {
            await onDeleteUser(row.id);
            setUserList((prev) => prev.filter(b => b.id !== row.id));
            showToast('User deleted successfully', null, 'success');
            router.refresh();
        } catch (error) {
            showToast('Error deleting user', null, 'error');
            console.error('Error deleting user:', error);
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'createdAt',
            label: 'Date',
            render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'
        },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
    ];

    const rowActions = [
        { label: 'Delete', onClick: (row) => handleDelete(row), destructive: true }
    ];

    return (
        <div>
            <Table
                columns={columns}
                data={userList || []}
                itemName="users"
                rowActions={rowActions}
            />
        </div>
    );
}