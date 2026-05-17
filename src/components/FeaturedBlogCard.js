import Link from 'next/link';
import Badge from '@/components/Badge';
import Button from '@/components/Button';

export default function FeaturedBlogCard({ post }) {
    return (
        <article className="flex flex-col gap-4">
            <div className="flex">
                <Badge text={post.category} />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="heading-2 max-w-2xl">{post.title}</h2>
                <p className="font-work text-sm text-text-muted leading-[1.7] max-w-xl">{post.excerpt}</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs font-roboto text-text-muted">{post.author}</span>
                <span>|</span>
                <span className="text-xs font-roboto text-text-muted">{post.date}</span>
            </div>
            <div className="w-full aspect-16/9 bg-gray-3 rounded-lg" />
            <div>
                <Button as="link" href={`/about/briefs/${post.slug}`} variant="primary" size="sm">
                    Read brief
                </Button>
            </div>
        </article>
    );
}