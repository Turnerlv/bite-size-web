import EmptyState from '@/components/EmptyState';
import { ARCHITECTURE_CONTENT } from '@/content/static';
import CategoryHeader from '../_components/CategoryHeader';
import CategoryOverview from '../_components/CategoryOverview';

export const metadata = {
    title: 'Architecture — Bites — Bite Size Design',
    description: 'Systems, data flow, and event-driven architecture patterns — built to show how resilient backends power seamless frontends.',
};

export default function ArchitecturePage() {
    const { hero, overview, focusAreas } = ARCHITECTURE_CONTENT;

    return (
        <div>
            <CategoryHeader hero={hero} />
            <CategoryOverview overview={overview} focusAreas={focusAreas} />
            <EmptyState />
        </div>
    );
}
