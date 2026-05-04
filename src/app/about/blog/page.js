import Badge from '@/components/Badge';
import Button from '@/components/Button';

const posts = [
    {
        slug: 'data-integrity-best-ux',
        title: 'Why data integrity is the best UX',
        excerpt: 'The most impactful user experience improvements often happen in the data layer — not the UI. Here is why integrity is the real design work.',
        category: 'Architecture',
        date: 'April 14, 2026',
        readTime: '6 min read',
    },
    {
        slug: 'robust-webhooks-nextjs',
        title: 'Building robust webhooks in Next.js',
        excerpt: 'Idempotency, signature verification, retry queues, and dead-letter handling — the full picture for production-grade webhook endpoints.',
        category: 'Integrations',
        date: 'March 28, 2026',
        readTime: '8 min read',
    },
    {
        slug: 'error-states-that-dont-suck',
        title: "Error states that don't suck",
        excerpt: 'Actionable, human-readable error messages are a developer experience problem as much as a UX problem. Here is how to design both at once.',
        category: 'Dev Experience',
        date: 'March 10, 2026',
        readTime: '5 min read',
    },
    {
        slug: 'event-driven-patterns-fintech',
        title: 'Event-driven patterns for fintech',
        excerpt: 'How event sourcing, CQRS, and async messaging patterns map to real fintech use cases — and when simpler request-response is the right call.',
        category: 'Systems',
        date: 'February 20, 2026',
        readTime: '7 min read',
    },
    {
        slug: 'bridging-design-and-apis',
        title: 'Bridging design and APIs seamlessly',
        excerpt: 'The contract between frontend and backend should be designed, not discovered. A practical guide to schema-first thinking across the stack.',
        category: 'Tech Strategy',
        date: 'February 3, 2026',
        readTime: '9 min read',
    },
    {
        slug: 'supabase-without-torching-schema',
        title: 'Using Supabase without torching your schema',
        excerpt: 'Row-level security, migration discipline, and foreign key hygiene — the practices that keep a Supabase project maintainable at scale.',
        category: 'Databases',
        date: 'January 15, 2026',
        readTime: '4 min read',
    },
];

export const metadata = {
    title: 'Blog — Bite Size Design',
    description: 'Opinions, data flows, and explainers from the messy middle of frontend and backend engineering.',
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
                        <span className="heading-1">About systems.</span>
                    </h1>
                    <div className="max-w-sm">
                        <p className="font-work text-text-muted">
                            Opinions, data flows, and explainers from the messy middle of frontend and backend.
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
