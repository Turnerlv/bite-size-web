import Button from '@/components/Button';
import { EMPTY_STATE_CONTENT } from '@/content/static';

export default function EmptyState({ className = '' }) {
    const { title, description, cta } = EMPTY_STATE_CONTENT;

    return (
        <section className={`page-padding mx-auto max-w-[1200px] pb-20 ${className}`.trim()}>
            <div className="border border-border bg-gray-a2 px-6 py-16 md:px-12 md:py-20">
                <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
                    <h2 className="heading-5">{title}</h2>
                    <p className="font-work text-sm text-text-muted leading-[1.6]">
                        {description}
                    </p>
                    <div className="pt-2">
                        <Button as="link" href={cta.href} variant="surface" size="sm">
                            {cta.label}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}