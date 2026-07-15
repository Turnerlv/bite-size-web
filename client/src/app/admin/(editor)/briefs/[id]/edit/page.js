import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { briefsAPI } from '@/api/briefs';
import BriefForm from '../../_components/BriefForm';
import ProtectedRoute from '@/app/ProtectedRoute';
import Loading from '@/components/Loading';

export default async function EditBriefPage({ params}) { 
    const { id } = await params;
    let post;

    try {
        post = await briefsAPI.server.getById(id);
    } catch (error) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
        notFound();
    }

    const handleSubmit = async (payload) => {
        'use server';
        await briefsAPI.server.updateBrief(id, payload);
    };

    return (
        <ProtectedRoute>
            <Suspense fallback={<Loading />}>
                <BriefForm
                    briefData={post}
                    onSubmit={handleSubmit}
                />
            </Suspense>
        </ProtectedRoute>
    );
}