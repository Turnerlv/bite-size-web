import Badge from '@/components/Badge';
import Button from '@/components/Button';

const posts = [
    {
        slug: 'design-tokens-primer',
        title: 'A primer on design tokens',
        excerpt: 'What design tokens actually are, why they matter, and how to set up a system that doesn\'t become a maintenance nightmare.',
        category: 'Design Systems',
        date: 'April 14, 2025',
        readTime: '6 min read',
    },
    {
        slug: 'tailwind-v4-what-changed',
        title: 'Tailwind v4: what actually changed',
        excerpt: 'The new CSS-first config, updated theme API, and @layer utilities — what it means for your workflow and whether it\'s worth migrating.',
        category: 'CSS',
        date: 'March 28, 2025',
        readTime: '8 min read',
    },
    {
        slug: 'accessible-focus-states',
        title: 'Focus states that don\'t suck',
        excerpt: 'How to design and build focus indicators that satisfy WCAG 2.2, look great, and don\'t conflict with your brand.',
        category: 'Accessibility',
        date: 'March 10, 2025',
        readTime: '5 min read',
    },
    {
        slug: 'radix-ui-composition',
        title: 'Composing Radix UI components',
        excerpt: 'Radix gives you primitives — here\'s how to compose them into something that feels like your design system, not a generic UI kit.',
        category: 'React',
        date: 'February 20, 2025',
        readTime: '7 min read',
    },
    {
        slug: 'dark-mode-strategy',
        title: 'Dark mode without the headache',
        excerpt: 'A practical strategy for dark mode: semantic tokens, CSS variables, and how to avoid the "just invert everything" trap.',
        category: 'Design Systems',
        date: 'February 3, 2025',
        readTime: '9 min read',
    },
    {
        slug: 'lottie-performance',
        title: 'Using Lottie without torching your bundle',
        excerpt: 'DotLottie, lazy loading, and fallback strategies for keeping your animations silky without making your users wait.',
        category: 'Performance',
        date: 'January 15, 2025',
        readTime: '4 min read',
    },
];

export const metadata = {
    title: 'Blog — Bite Size Design',
    description: 'Thoughts on design systems, frontend engineering, and the space between design and code.',
};

export default function BlogPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                h-screen page-padding mx-auto max-w-[1200px]
                overflow-hidden relative
                flex items-center
                text-foreground
            ">
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-20">
                    <h1 className="flex flex-col">
                        <span className="heading-1 text-primary [text-shadow:-2px_-2px_0_var(--color-foreground)] dark:[text-shadow:none]">
                            We blabber.
                        </span>
                        <span className="heading-1">About building.</span>
                    </h1>
                    <div className="max-w-sm">
                        <p className="font-work text-text-muted">
                            Opinions, experiments, and explainers from the messy middle of design and development.
                        </p>
                    </div>
                </div>
            </section>

            {/* Posts */}
            <section className="py-20 page-padding mx-auto max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="flex flex-col justify-between border border-border bg-gray-a2 p-6 hover:bg-gray-a3 transition-colors cursor-pointer"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <Badge text={post.category} />
                                    <span className="text-xs font-roboto text-text-muted">{post.readTime}</span>
                                </div>
                                <h2 className="heading-4 mb-2">{post.title}</h2>
                                <p className="text-sm font-work text-text-muted">{post.excerpt}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                                <span className="text-xs font-roboto text-text-muted">{post.date}</span>
                                <Button variant="ghost" size="xs" as="link" href={`/about/blog/${post.slug}`}>
                                    Read →
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
