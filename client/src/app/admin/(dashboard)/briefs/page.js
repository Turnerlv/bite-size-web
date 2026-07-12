import { getBriefsAction } from '@/lib/briefs';
import { briefsAPI } from '@/api/briefs';
import BriefList from '../_components/BriefList';

export default async function BriefsPage() {
    const briefs = await getBriefsAction({ surface: 'dashboard' });

    const handleDelete = async (id) => {
        'use server';
        await briefsAPI.server.deleteBrief(id);
    };

    return (
        <BriefList initialBriefs={briefs} onDeleteBrief={handleDelete} />
    );
}