'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Table from '@/components/Table';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';

export default function BriefList({ initialBriefs, onDeleteBrief }) {
    const [briefList, setBriefList] = useState(initialBriefs || []);
    const { isAdmin } = useAuth();
    const router = useRouter();
    const { showToast } = useNotification();

    const handleOpenForm = (brief = null) => {
        if (brief && brief.id) {
            router.push(`/admin/briefs/${brief.id}/edit`);
        }
    };

    const handleDelete = async (row) => {
        try {
            await onDeleteBrief(row.id);
            setBriefList((prev) => prev.filter(b => b.id !== row.id));
            router.refresh();
            showToast('Brief deleted successfully', 'success');
        } catch (error) {
            showToast('Error deleting brief', 'error');
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'createdAt',
            label: 'Date',
            render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'
        },
        { key: 'title', label: 'Title' },
        ...(isAdmin ? [{ key: 'author', label: 'Author' }] : []),
        { key: 'category', label: 'Category' }
    ];

    const rowActions = [
        { label: 'View', onClick: (row) => router.push(`/briefs/${row.slug}`) },
        { label: 'Edit', onClick: (row) => handleOpenForm(row) },
        { label: 'Delete', onClick: (row) => handleDelete(row), destructive: true }
    ];

    return (
        <div>
                <Table
                    columns={columns}
                    data={briefList || []}
                    onRowClick={(row) => handleOpenForm(row)}
                    rowActions={rowActions}
                    itemName="briefs"
                />
        </div>
    );
}