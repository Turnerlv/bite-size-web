import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { BLOG_CONTENT } from '@/content/static';

export const metadata = {
    title: 'Blog — Bite Size Design',
    description: 'Opinions, data flows, and explainers from the messy middle of frontend and backend engineering.',
};

export default function BlogPage() {
    const { hero, posts } = BLOG_CONTENT;

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
                            {hero.titleLines[0]}
                        </span>
                        <span className="heading-1">{hero.titleLines[1]}</span>
                    </h1>
                    <div className="max-w-sm">
                        <p className="font-work text-text-muted">
                            {hero.description}
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
