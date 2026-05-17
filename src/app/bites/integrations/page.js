import CategoryHeader from '@/components/CategoryHeader';
import CategoryOverview from '@/components/CategoryOverview';
import EmptyState from '@/components/EmptyState';
import { INTEGRATIONS_CONTENT } from '@/content/static';

export const metadata = {
    title: 'Integrations — Bites — Bite Size Design',
    description: 'Webhooks, API contracts, and patterns for reliable third-party integrations — built to show how modern products connect at scale.',
};

export default function IntegrationsPage() {
    const { hero, overview, focusAreas } = INTEGRATIONS_CONTENT;

    return (
        <div>
            <CategoryHeader hero={hero} />
            <CategoryOverview overview={overview} focusAreas={focusAreas} />
            <EmptyState />
        </div>
    );
}
