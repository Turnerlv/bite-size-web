import Link from 'next/link';
import Badge from '@/components/Badge';
import { formatDate } from '@/utils/formatDate';

export default function BlogCard({ post }) {
    return (
        <Link href={`/briefs/${encodeURIComponent(post.slug)}`} className="block group focus-visible:custom-focus">
            <article className="flex items-start sm:grid sm:grid-cols-4 md:grid-cols-3 gap-4 sm:gap-6 py-7 border-b border-border last:border-0 hover:bg-gray-a2 transition-colors -mx-4 px-4 md:-mx-0 md:px-0">
                {/* Thumbnail */}
                <div className="min-w-[100px] max-w-[125px] w-full sm:max-w-none sm:col-span-1 aspect-square md:aspect-16/9 bg-gray-3 rounded-md" />

                {/* Content */}
                <div className="sm:col-span-3 md:col-span-2 flex flex-col gap-3 py-1">
                    <div>
                        <div className="hidden sm:inline-flex mb-2">
                            <Badge text={post.category} />
                        </div>

                        <h3 className="heading-5 mb-1 group-hover:text-primary transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-sm font-work text-text-muted leading-[1.6] line-clamp-4">
                            {post.description}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                        <span className="text-[11px] sm:text-xs font-roboto text-text-muted mr-3">{post.author}</span>
                        <span className="text-[11px] sm:text-xs font-roboto text-text-muted">{formatDate(post.createdAt)}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}