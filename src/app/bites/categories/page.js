import Badge from '@/components/Badge';
import ProductCard from '@/components/ProductCard';

const categories = [
    {
        slug: 'systems',
        label: 'Systems',
        description: 'Event-driven patterns, distributed architecture, and state management across the stack.',
        count: 12,
        color: 'bg-yellow-a4',
    },
    {
        slug: 'api-design',
        label: 'API Design',
        description: 'REST, GraphQL, schema-first thinking, and contract-driven development.',
        count: 9,
        color: 'bg-gray-a4',
    },
    {
        slug: 'full-stack',
        label: 'Full-Stack',
        description: 'End-to-end feature builds connecting frontend to backend with clean data contracts.',
        count: 7,
        color: 'bg-gray-a3',
    },
    {
        slug: 'dev-experience',
        label: 'Dev Experience',
        description: 'Internal tooling, SDK design, error handling, and developer-first API patterns.',
        count: 5,
        color: 'bg-yellow-a3',
    },
    {
        slug: 'databases',
        label: 'Databases',
        description: 'Schema design, migration strategy, indexing, and query optimisation.',
        count: 6,
        color: 'bg-gray-a5',
    },
    {
        slug: 'integrations',
        label: 'Integrations',
        description: 'Webhooks, third-party APIs, platform connectors, and legacy system wrappers.',
        count: 8,
        color: 'bg-yellow-a4',
    },
    {
        slug: 'security',
        label: 'Security',
        description: 'Auth patterns, input validation, secrets management, and OWASP-aligned practices.',
        count: 4,
        color: 'bg-gray-a4',
    },
    {
        slug: 'devops',
        label: 'DevOps',
        description: 'CI/CD pipelines, deployment strategies, environment config, and observability.',
        count: 3,
        color: 'bg-gray-a3',
    },
];

const featuredByCategory = [
    {
        heading: 'Event-Driven Webhook Architecture',
        description: 'Resilient async patterns for real-time pipelines',
        category: 'Systems',
        preview: '/bite_preview_1.png',
    },
    {
        heading: 'API Design Principles',
        description: 'Versioning, error contracts, and DX',
        category: 'API Design',
        preview: '/bite_preview_2.png',
    },
    {
        heading: 'Full-Stack Auth Flow',
        description: 'Token-based auth across the stack',
        category: 'Full-Stack',
        preview: '/bite_preview_3.png',
    },
    {
        heading: 'Supabase Schema Strategy',
        description: 'RLS, migrations, and foreign key hygiene',
        category: 'Databases',
        preview: '/bite_preview_4.png',
    },
];

export const metadata = {
    title: 'Categories — Bites — Bite Size Design',
    description: 'Browse bites by discipline — systems, API design, full-stack, databases, integrations, security, and more.',
};

export default function CategoriesPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text="Categories" />
                    <h1 className="heading-1 mt-4">Browse by architecture.</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        Every bite is tagged by discipline. Find exactly what you're looking for — or discover something new.
                    </p>
                </div>
            </section>

            {/* Category Grid */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-8">All Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <a
                            key={cat.slug}
                            href={`/bites/categories/${cat.slug}`}
                            className="flex flex-col justify-between border border-border p-5 bg-gray-a2 hover:bg-gray-a3 transition-colors focus-visible:custom-focus"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <Badge text={cat.label} color={cat.color} />
                                    <span className="text-xs font-roboto text-text-muted">{cat.count} bites</span>
                                </div>
                                <p className="text-sm font-work text-text-muted">{cat.description}</p>
                            </div>
                            <span className="mt-4 text-xs font-roboto text-primary">Browse →</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Featured */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-8">Popular across categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredByCategory.map((bite, idx) => (
                        <ProductCard
                            key={idx}
                            heading={bite.heading}
                            description={bite.description}
                            category={bite.category}
                            preview={bite.preview}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
