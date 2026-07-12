import Button from '@/components/Button';
import { BLOG_CONTENT } from '@/content/static';
import BlogCard from './_components/BlogCard';
import FeaturedBlogCard from './_components/FeaturedBlogCard';
import { getBriefsAction } from '@/lib/briefs';

export const metadata = {
    title: 'Briefs — Bite Size Design',
    description: 'Opinions, data flows, and explainers from the messy middle of frontend and backend engineering.',
};

export default async function BlogPage() {
    const { hero } = BLOG_CONTENT;

    const briefs = await getBriefsAction({ surface: 'list-view' });
    const [featured, ...rest] = briefs;

    return (
        <div>
            {/* Hero */}
            <section className="
                h-screen w-full max-w-300 mx-auto page-padding
                overflow-hidden relative
                flex items-center
                text-foreground
            ">
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 md:gap-8 lg:gap-20">
                    <h1 className="flex flex-col shrink-0">
                        <span className="heading-1 text-primary [text-shadow:-2px_-2px_0_var(--color-foreground)] dark:[text-shadow:none]">{hero.titleLines[0]}</span>
                        <span className="heading-1">{hero.titleLines[1]}</span>
                    </h1>
                    <div className="flex flex-col justify-end gap-1 md:gap-2 text-text-muted text-left max-w-s my-0 lg:my-auto">
                        {hero.description.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>
                </div>
            </section >

            <div className='page-padding mx-auto max-w-300'>
                {/* Featured post */}
                < section className="max-w-[996px] py-12 border-t border-border" >
                    <div className="grid grid-cols-1 md:grid-cols-[3fr_12fr] gap-10 md:gap-16">
                        <div className="pt-1">
                            <span className="heading-5">Featured brief</span>
                        </div>
                        <FeaturedBlogCard post={featured} />
                    </div>
                </section >
                {/* All briefs */}
                < section className="max-w-[996px] py-12 border-t border-border pb-20" >
                    <div className="grid grid-cols-1 md:grid-cols-[3fr_12fr] gap-10 md:gap-16">
                        <div className="pt-1">
                            <span className="heading-5">All briefs</span>
                        </div>
                        <div className="flex flex-col">
                            {rest.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                            <div className="flex justify-center pt-10">
                                <Button variant="outline" size="sm">
                                    Load more briefs
                                </Button>
                            </div>
                        </div>
                    </div>
                </section >
            </div>

        </div >
    );
}
