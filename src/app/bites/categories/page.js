import Badge from '@/components/Badge';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES_CONTENT, CATEGORY_DATA } from '@/content/static';

export const metadata = {
    title: 'Categories — Bites — Bite Size Design',
    description: 'Browse bites by discipline — systems, API design, full-stack, databases, integrations, security, and more.',
};

export default function CategoriesPage() {
    const categories = Object.entries(CATEGORY_DATA).map(([slug, data]) => ({
        slug,
        label: data.title,
        description: data.overview,
        count: data.count,
        color: data.color,
    }));
    const { hero, sections, featuredByCategory } = CATEGORIES_CONTENT;

    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text={hero.badge} />
                    <h1 className="heading-1 mt-4">{hero.title}</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        {hero.description}
                    </p>
                </div>
            </section>

            {/* Category Grid */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-8">{sections.allCategoriesTitle}</h2>
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
                <h2 className="heading-3 mb-8">{sections.featuredTitle}</h2>
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
