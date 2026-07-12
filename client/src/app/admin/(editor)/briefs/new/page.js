import BriefForm from '../_components/BriefForm';
import { briefsAPI } from '@/api/briefs';
import ProtectedRoute from '@/app/ProtectedRoute';

export default async function NewBriefPage() {
    const briefData = {
        title: '',
        description: '',
        category: '',
        content: '',
        image_url: '',
    };

    const handleSubmit = async (payload) => {
        'use server';
        await briefsAPI.server.newBrief(payload);
    };

    return (
        <ProtectedRoute>
            <BriefForm
                briefData={briefData}
                onSubmit={handleSubmit}
            />
        </ProtectedRoute>
    );
}
