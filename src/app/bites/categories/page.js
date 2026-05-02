import Badge from '@/components/Badge';
import ProductCard from '@/components/ProductCard';

const categories = [
    {
        slug: 'css',
        label: 'CSS',
        description: 'Layouts, animations, custom properties, and visual effects.',
        count: 12,
        color: 'bg-yellow-a4',
    },
    {
        slug: 'react',
        label: 'React',
        description: 'Hooks, patterns, compound components, and state management.',
        count: 9,
        color: 'bg-gray-a4',
    },
    {
        slug: 'javascript',
        label: 'JavaScript',
        description: 'Array methods, async patterns, algorithms, and utilities.',
        count: 7,
        color: 'bg-gray-a3',
    },
    {
        slug: 'accessibility',
        label: 'Accessibility',
        description: 'Focus management, ARIA patterns, keyboard navigation, and WCAG.',
        count: 5,
        color: 'bg-yellow-a3',
    },
    {
        slug: 'animation',
        label: 'Animation',
        description: 'Motion principles, CSS keyframes, scroll effects, and Lottie.',
        count: 6,
        color: 'bg-gray-a5',
    },
    {
        slug: 'design-systems',
        label: 'Design Systems',
        description: 'Tokens, theming, component APIs, and documentation.',
        count: 8,
        color: 'bg-yellow-a4',
    },
    {
        slug: 'performance',
        label: 'Performance',
        description: 'Bundle size, lazy loading, rendering strategies, and metrics.',
        count: 4,
        color: 'bg-gray-a4',
    },
    {
        slug: 'devops',
        label: 'DevOps',
        description: 'CI/CD, deployment, environment config, and git workflows.',
        count: 3,
        color: 'bg-gray-a3',
    },
];

const featuredByCategory = [
    {
        heading: 'Responsive Grid Layout',
        description: 'Adapt screens to any size',
        category: 'CSS',
        preview: '/bite_preview_1.png',
    },
    {
        heading: 'React Hooks Basics',
        description: 'Hook fundamentals and state management',
        category: 'React',
        preview: '/bite_preview_2.png',
    },
    {
        heading: 'JavaScript Arrays',
        description: 'Essential array methods',
        category: 'JavaScript',
        preview: '/bite_preview_3.png',
    },
    {
        heading: 'Focus State Patterns',
        description: 'WCAG-compliant focus indicators',
        category: 'Accessibility',
        preview: '/bite_preview_4.png',
    },
];

export const metadata = {
    title: 'Categories — Bites — Bite Size Design',
    description: 'Browse bites by type — CSS, React, JavaScript, accessibility, animation, and more.',
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
                    <h1 className="heading-1 mt-4">Browse by bite type.</h1>
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
