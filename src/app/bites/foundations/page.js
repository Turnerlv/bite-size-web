import Badge from '@/components/Badge';

const typographyScale = [
    { class: 'heading-1', label: 'Heading 1', size: '30–48px', font: 'Rubik Bold' },
    { class: 'heading-2', label: 'Heading 2', size: '20–30px', font: 'Rubik Bold' },
    { class: 'heading-3', label: 'Heading 3', size: '18–24px', font: 'Rubik Bold' },
    { class: 'heading-4', label: 'Heading 4', size: '16–20px', font: 'Rubik Bold' },
    { class: 'heading-5', label: 'Heading 5', size: '16px', font: 'Rubik Bold' },
];

const spacingScale = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

const borderRadii = [
    { name: 'None', class: 'rounded-none' },
    { name: 'SM', class: 'rounded-sm' },
    { name: 'Base', class: 'rounded' },
    { name: 'MD', class: 'rounded-md' },
    { name: 'LG', class: 'rounded-lg' },
    { name: 'XL', class: 'rounded-xl' },
    { name: '2XL', class: 'rounded-2xl' },
    { name: 'Full', class: 'rounded-full' },
];

export const metadata = {
    title: 'Foundations — Bites — Bite Size Design',
    description: 'Typography, spacing, and base building blocks of the Bite Size design system.',
};

export default function FoundationsPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text="Foundations" />
                    <h1 className="heading-1 mt-4">* Foundations (to remove)</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        The primitive layer of the design system — typography, spacing, and shape. Get these right and everything else follows.
                    </p>
                </div>
            </section>

            {/* Typography */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Typography</h2>
                <p className="text-sm font-work text-text-muted mb-10">
                    Headings use <span className="font-roboto">Rubik</span>. Body text uses{' '}
                    <span className="font-roboto">Work Sans</span>. Code uses{' '}
                    <span className="font-roboto">Roboto Mono</span>.
                </p>

                <div className="flex flex-col gap-6">
                    {typographyScale.map(({ class: cls, label, size, font }) => (
                        <div key={cls} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                            <div className="w-full md:w-1/2">
                                <span className={`${cls} text-foreground`}>{label}</span>
                            </div>
                            <div className="flex gap-4 shrink-0">
                                <span className="text-xs font-roboto text-text-muted">{size}</span>
                                <span className="text-xs font-roboto text-text-muted">{font}</span>
                                <code className="text-xs font-roboto text-primary">.{cls}</code>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    <p className="font-work text-foreground text-base">Body — Work Sans 16px</p>
                    <p className="font-work text-text-muted text-sm">Body muted — Work Sans 14px in text-muted</p>
                    <code className="font-roboto text-sm text-primary">code — Roboto Mono 14px</code>
                </div>
            </section>

            {/* Spacing */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Spacing Scale</h2>
                <p className="text-sm font-work text-text-muted mb-10">
                    Tailwind default scale (1 unit = 4px). Page gutter:{' '}
                    <code className="font-roboto text-primary text-xs">.page-padding</code> = px-4 md:px-8.
                </p>
                <div className="flex flex-wrap items-end gap-4">
                    {spacingScale.map((s) => (
                        <div key={s} className="flex flex-col items-center gap-1">
                            <div
                                className="bg-primary w-4 shrink-0"
                                style={{ height: `${s * 4}px` }}
                            />
                            <span className="text-[10px] font-roboto text-text-muted">{s}</span>
                            <span className="text-[10px] font-roboto text-text-muted">{s * 4}px</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Border Radius */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Border Radius</h2>
                <p className="text-sm font-work text-text-muted mb-10">
                    Inputs and buttons use <code className="font-roboto text-primary text-xs">rounded-full</code>. Cards use sharp edges or <code className="font-roboto text-primary text-xs">rounded-md</code>.
                </p>
                <div className="flex flex-wrap gap-6">
                    {borderRadii.map(({ name, class: cls }) => (
                        <div key={name} className="flex flex-col items-center gap-2">
                            <div className={`w-16 h-16 bg-gray-a3 border border-border ${cls}`} />
                            <span className="text-xs font-roboto text-text-muted">{name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
