import EmptyState from '@/components/EmptyState';
import { DEVELOPER_EXPERIENCE_CONTENT } from '@/content/static';
import CategoryHeader from '../_components/CategoryHeader';
import CategoryOverview from '../_components/CategoryOverview';

export const metadata = {
    title: 'Developer Experience — Bites — Bite Size Design',
    description: 'Error handling, SDK design, and patterns for delightful developer experiences — built to show how great DX bridges system complexity.',
};

export default function DeveloperExperiencePage() {
    const { hero, overview, focusAreas } = DEVELOPER_EXPERIENCE_CONTENT;

    return (
        <div>
            <CategoryHeader hero={hero} />
            <CategoryOverview overview={overview} focusAreas={focusAreas} />
            <EmptyState />
        </div>
    );
}
