import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { Code2, AlertCircle, BookOpen, Wrench } from 'lucide-react';

const sections = [
    {
        badge: 'Error Handling',
        title: 'Failures worth reading.',
        description:
            'Most error messages are written for the developer who threw the exception, not the developer who received it. These bites cover error contracts, human-readable messages, and the discipline of designing failures as carefully as features.',
        icon: AlertCircle,
        items: [
            {
                heading: 'Structured Error Responses',
                subheading: 'Code, message, and context — consistently',
                difficulty: 'Beginner',
            },
            {
                heading: 'Client-Safe Error Boundaries',
                subheading: 'What to expose vs. what to swallow',
                difficulty: 'Intermediate',
            },
            {
                heading: 'Typed Error Contracts in TypeScript',
                subheading: 'Discriminated unions and exhaustive handling',
                difficulty: 'Advanced',
            },
        ],
    },
    {
        badge: 'SDK Design',
        title: 'APIs that don\'t hurt.',
        description:
            'An SDK is a product. These bites explore what makes a client library feel good to use — predictable method names, typed inputs and outputs, sensible defaults, and documentation that serves the reader.',
        icon: BookOpen,
        items: [
            {
                heading: 'Designing a Typed SDK Client',
                subheading: 'Autocomplete, inference, and zero config',
                difficulty: 'Intermediate',
            },
            {
                heading: 'Retry Logic and Backoff in SDKs',
                subheading: 'Making reliability the default',
                difficulty: 'Intermediate',
            },
            {
                heading: 'SDK Versioning Strategy',
                subheading: 'Deprecation patterns without breakage',
                difficulty: 'Advanced',
            },
        ],
    },
    {
        badge: 'Tooling & Workflow',
        title: 'Build for the builder.',
        description:
            'The tools developers use every day shape how they think about their product. These bites cover CLI ergonomics, local dev environment design, and the small choices that compound into a great engineering culture.',
        icon: Wrench,
        items: [
            {
                heading: 'CLI Design Principles',
                subheading: 'Flags, help text, and progressive disclosure',
                difficulty: 'Beginner',
            },
            {
                heading: 'Local Dev Environment as Code',
                subheading: '.env design, seeds, and reproducibility',
                difficulty: 'Intermediate',
            },
            {
                heading: 'DX Auditing Your Own API',
                subheading: 'How to evaluate your platform through fresh eyes',
                difficulty: 'Intermediate',
            },
        ],
    },
];

export const metadata = {
    title: 'DX — Bites — Bite Size Design',
    description: 'Developer experience patterns — error handling, SDK design, and tooling that makes building with your platform a pleasure.',
};

export default function DXPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text="Dev Experience" />
                    <h1 className="heading-1 mt-4">APIs that don't hurt.</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        Because internal tools and integrations deserve good design too. Developer experience is a product discipline — and these bites treat it that way.
                    </p>
                </div>
            </section>

            {sections.map((section, sIdx) => {
                const Icon = section.icon;
                return (
                    <section
                        key={sIdx}
                        className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-primary text-primary-contrast">
                                <Icon size={16} strokeWidth={1.5} />
                            </div>
                            <Badge text={section.badge} />
                        </div>
                        <h2 className="heading-3 mb-2">{section.title}</h2>
                        <p className="text-sm font-work text-text-muted mb-8 max-w-lg">{section.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {section.items.map((item, iIdx) => (
                                <div
                                    key={iIdx}
                                    className="border border-border p-6 bg-gray-a2 flex flex-col gap-2"
                                >
                                    <Badge
                                        text={item.difficulty}
                                        color={
                                            item.difficulty === 'Beginner'
                                                ? 'bg-yellow-a3'
                                                : item.difficulty === 'Intermediate'
                                                ? 'bg-yellow-a4'
                                                : 'bg-yellow-a5'
                                        }
                                    />
                                    <h3 className="heading-5">{item.heading}</h3>
                                    <p className="text-sm font-work text-text-muted">{item.subheading}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}

            {/* CTA */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border flex flex-col gap-4">
                <h2 className="heading-3">Want a DX audit of your platform?</h2>
                <p className="text-sm font-work text-text-muted max-w-md">
                    These bites cover principles. If you need a real API DX review or SDK design engagement, our API & Developer Experience service is the right fit.
                </p>
                <Button href="/about/services" label="See our services" variant="primary" size="md" />
            </section>
        </div>
    );
}
