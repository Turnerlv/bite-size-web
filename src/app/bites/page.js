import Badge from '@/components/Badge';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { NAV_ITEMS } from '@/config/navigation';

const featuredBites = [
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
        description: 'Essential array methods.',
        category: 'JavaScript',
        preview: '/bite_preview_3.png',
    },
    {
        heading: 'Tailwind CSS Tips',
        description: 'Pro tips and tricks for styling with Tailwind CSS utility classes.',
        category: 'CSS',
        preview: '/bite_preview_4.png',
    },
];

const bitesNav = NAV_ITEMS.find((n) => n.key === 'bites');

export const metadata = {
    title: 'Bites — Bite Size Design',
    description: 'A growing library of UI patterns, components, and frontend experiments.',
};

export default function BitesPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[50vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <h1 className="heading-1 mb-3">One bite at a time.</h1>
                    <p className="font-work text-text-muted max-w-lg">
                        A growing library of interactive UI patterns, reusable components, and frontend experiments — built to show how good design and clean code work together.
                    </p>
                </div>
            </section>

            {/* Section links */}
            <section className="py-8 page-padding mx-auto max-w-[1200px] border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {bitesNav?.items.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="flex flex-col gap-1 border border-border p-4 bg-gray-a2 hover:bg-gray-a3 transition-colors focus-visible:custom-focus"
                        >
                            <span className="heading-5">{item.label}</span>
                            <span className="text-xs font-work text-text-muted">{item.description}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Featured Bites */}
            <section className="py-16 page-padding mx-auto max-w-[1200px]">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="heading-3">Featured Bites</h2>
                    <Button as="link" href="/bites/categories" variant="ghost" size="sm">
                        Browse all →
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredBites.map((bite, idx) => (
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