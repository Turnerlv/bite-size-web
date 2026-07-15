import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import Badge from '@/components/Badge';
import { Share2, Bookmark } from 'lucide-react';
import { briefsAPI } from '@/api/briefs';
import { formatDate } from '@/utils/formatDate';
import { calculateReadTime } from '@/utils/readTime';

async function getBlog(slug) {
    return await briefsAPI.server.getBySlug(slug)
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getBlog(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
    };
}

const bulletStyle = {
    backgroundColor: 'var(--color-text-muted)',
    WebkitMaskImage: "url('/bite_bullet.svg')",
    maskImage: "url('/bite_bullet.svg')",
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
};

function renderBlock(block, index) {
    switch (block.type) {
        case 'paragraph':
            return (
                <p key={index} className="font-work text-base text-text-muted leading-[1.8]">
                    {block.data.text}
                </p>
            );
        case 'subheading':
            return (
                <h2 key={index} className="heading-3 pt-4">
                    {block.data.text}
                </h2>
            );
        case 'orderedList':
            return (
                <ol key={index} className="bite-ordered-list">
                    {block.data.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
            );
        case 'unorderedList':
            return (
                <ul key={index} className="bite-bullet-list">
                    {block.data.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
        case 'list': {
            // Handle data saved before type normalization
            const htmlLabelRegex = /^<b>(.*?)<\/b>\s*([\s\S]*)/;
            const isObjectItems = block.data.items?.every(item => typeof item === 'object' && item !== null && 'content' in item);
            const isLabeledList = isObjectItems && block.data.items.every(item => htmlLabelRegex.test(item.content));

            if (isLabeledList) {
                return (
                    <ul key={index} className="flex flex-col gap-6">
                        {block.data.items.map((item, i) => {
                            const match = item.content.match(htmlLabelRegex);
                            return (
                                <li key={i} className="relative pl-14">
                                    <span className="absolute top-0.75 left-2 w-4 h-4 md:w-5 md:h-5 block shrink-0" style={bulletStyle} />
                                    <p className="font-work font-semibold text-sm md:text-base text-foreground mb-1">{match[1].trim()}</p>
                                    <p className="font-work text-sm md:text-base text-text-muted leading-[1.7]">{match[2].trim()}</p>
                                </li>
                            );
                        })}
                    </ul>
                );
            }
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            const listClass = block.data.style === 'ordered' ? 'bite-ordered-list' : 'bite-bullet-list';
            return (
                <ListTag key={index} className={listClass}>
                    {block.data.items?.map((item, i) => (
                        <li key={i}>{typeof item === 'object' ? item.content : item}</li>
                    ))}
                </ListTag>
            );
        }
        case 'labeledList':
            return (
                <ul key={index} className="flex flex-col gap-6">
                    {block.data.items.map((item, i) => (
                        <li key={i} className="relative pl-14">
                            <span
                                className="absolute top-0.75 left-2 w-4 h-4 md:w-5 md:h-5 block shrink-0"
                                style={bulletStyle}
                            />
                            <p className="font-work font-semibold text-sm md:text-base text-foreground mb-1">
                                {item.label}
                            </p>
                            <p className="font-work text-sm md:text-base text-text-muted leading-[1.7]">
                                {item.content}
                            </p>
                        </li>
                    ))}
                </ul>
            );
        default:
            return null;
    }
}

export default async function BriefPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    let post;

    try {
        post = await getBlog(slug)
    } catch (error) {
        notFound();
    }

    return (
        <div>
            {/* Header */}
            <section className="pt-[76px] page-padding mx-auto max-w-300 pb-10">
                <div className="pt-12 flex flex-col gap-6">
                    <Breadcrumbs
                        homeLabel="Home"
                        labelMap={{ about: 'About', briefs: 'Briefs' }}
                    />
                    <h1 className="heading-1 max-w-4xl pb-2">{post.title}</h1>

                    {/* Meta columns */}
                    <div className="grid grid-cols-3 md:grid-cols-[auto_auto_auto_1fr] gap-x-8 md:gap-x-12 gap-y-3 pt-6 border-t border-border w-full">
                        <div className="flex flex-col gap-2 justify-self-start">
                            <span className="font-roboto text-[10px] uppercase tracking-widest text-text-muted">
                                Category
                            </span>
                            <Badge text={post.category} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-roboto text-[10px] uppercase tracking-widest text-text-muted">
                                Published
                            </span>
                            <span className="font-work text-sm text-foreground">{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-roboto text-[10px] uppercase tracking-widest text-text-muted">
                                Read time
                            </span>
                            <span className="font-work text-sm text-foreground">{calculateReadTime(post.content)}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Excerpt lead */}
            <section className="page-padding mx-auto max-w-300 pb-10">
                <p className="large-block text-text-muted max-w-3xl">{post.description}</p>
            </section>

            {/* Hero image */}
            <section className="page-padding mx-auto max-w-300 pb-16">
                <div className="w-full aspect-video bg-gray-3 rounded-xl" />
            </section>

            {/* Author + Article body */}
            <section className="page-padding mx-auto max-w-300 pb-20">
                <div className="max-w-[996px] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 lg:gap-20 items-start">

                    {/* Author sidebar */}
                    <div className="md:sticky md:top-24 flex flex-col gap-5">
                        <div className="w-14 h-14 rounded-full bg-gray-3 shrink-0" />
                        <div>
                            <p className="font-work font-semibold text-sm text-foreground">{post.author}</p>
                            <p className="font-work text-xs text-text-muted mt-0.5">Solution architect</p>
                        </div>
                        <p className="font-work text-xs text-text-muted leading-[1.7]">
                            Lorem ipsum dolor sit amet, consectetur. Praesent molestie sem lobortis tincidunt ut tristique ut egestas, ullamcorper at mattis nunc sit augue aliquam nam.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <button className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-text-muted hover:text-foreground hover:bg-gray-a3 transition-colors">
                                <Share2 size={14} strokeWidth={1.5} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-text-muted hover:text-foreground hover:bg-gray-a3 transition-colors">
                                <Bookmark size={14} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>

                    {/* Article body */}
                    <div className="flex flex-col gap-8">
                        {typeof post.content === 'string'
                            ? post.content
                            : post.content?.map((block, i) => renderBlock(block, i))}
                    </div>
                </div>
            </section>
        </div>
    );
}
