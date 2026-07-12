import EmptyState from '@/components/EmptyState';
import { TECHNOLOGY_CONTENT } from '@/content/static';
import CategoryHeader from '../_components/CategoryHeader';
import CategoryOverview from '../_components/CategoryOverview';

export const metadata = {
    title: 'Technology — Bites — Bite Size Design',
    description: 'Tools, frameworks, and standards for building resilient systems — explored through a Staff-level technical lens.',
};

export default function TechnologyPage() {
    const { hero, overview, focusAreas } = TECHNOLOGY_CONTENT;

    return (
        <div>
            <CategoryHeader hero={hero} />
            <CategoryOverview overview={overview} focusAreas={focusAreas} />
            <EmptyState />
        </div>
    );
}
