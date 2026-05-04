import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { Code2, Zap, Package, Globe } from 'lucide-react';

const stack = [
    {
        icon: Code2,
        name: 'Next.js 15',
        role: 'Framework',
        description:
            'App Router, server components, and file-based routing. All pages in this site use the App Router with a shared layout via AppShell.',
        link: 'https://nextjs.org',
    },
    {
        icon: Zap,
        name: 'Tailwind CSS v4',
        role: 'Styling',
        description:
            'CSS-first config via @theme inline. Custom color scales, semantic tokens, and utility classes all defined in globals.css — no tailwind.config.js needed.',
        link: 'https://tailwindcss.com',
    },
    {
        icon: Package,
        name: 'Radix UI',
        role: 'Primitives',
        description:
            'Unstyled, accessible component primitives. Currently used for Select. Provides full keyboard navigation and ARIA semantics out of the box.',
        link: 'https://radix-ui.com',
    },
    {
        icon: Globe,
        name: 'Lucide React',
        role: 'Icons',
        description:
            `Consistent stroke-based icon set. Icons are rendered at size-matched dimensions per the Button component's icon size map.`,
        link: 'https://lucide.dev',
    },
];

const feasibilityPrinciples = [
    {
        title: 'Data journey first',
        body: 'Before writing a single component, we map how data moves through the system. The frontend is the last mile — not the starting point.',
    },
    {
        title: 'Progressive enhancement',
        body: 'The hero backdrop-filter effect checks browser support before enabling. Animations are non-breaking enhancements, never load-bearing.',
    },
    {
        title: 'Resilient APIs',
        body: 'Every integration pattern accounts for failure. Retry logic, idempotency, and graceful degradation are not afterthoughts — they are part of the design.',
    },
    {
        title: 'Design the system, not just the screen',
        body: 'A great UI backed by a brittle system is a liability. We design the full architecture so the experience can be trusted at scale.',
    },
];

export const metadata = {
    title: 'Technology — Bites — Bite Size Design',
    description: 'The tech stack and feasibility principles behind Bite Size Design.',
};

export default function TechnologyPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text="Technology" />
                    <h1 className="heading-1 mt-4">Feasibility FTW.</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        The stack behind this site — chosen for performance, developer experience, and the ability to actually ship great-looking, accessible interfaces.
                    </p>
                </div>
            </section>

            {/* Stack */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-8">The Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stack.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.name}
                                className="flex gap-4 border border-border p-6 bg-gray-a2"
                            >
                                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-primary text-primary-contrast">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="heading-5">{item.name}</h3>
                                        <span className="text-[10px] font-roboto text-text-muted uppercase">{item.role}</span>
                                    </div>
                                    <p className="text-sm font-work text-text-muted">{item.description}</p>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-block text-xs font-roboto text-primary hover:underline focus-visible:custom-focus"
                                    >
                                        {item.link.replace('https://', '')} →
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Feasibility Principles */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Feasibility Principles</h2>
                <p className="text-sm font-work text-text-muted mb-8">
                    Patterns on this site are guided by these engineering constraints — so every bite can actually be shipped in a real product.
                </p>
                <div className="flex flex-col gap-6">
                    {feasibilityPrinciples.map((principle, idx) => (
                        <div key={idx} className="flex gap-6 border-b border-border pb-6 last:border-0 last:pb-0">
                            <span className="font-roboto text-primary text-sm shrink-0 pt-0.5">0{idx + 1}</span>
                            <div>
                                <h3 className="heading-5 mb-1">{principle.title}</h3>
                                <p className="text-sm font-work text-text-muted">{principle.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dependencies table */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-8">Key Dependencies</h2>
                <div className="border border-border divide-y divide-border">
                    {[
                        { pkg: 'next', version: '15.3.1', type: 'Production' },
                        { pkg: 'react', version: '^19.0.0', type: 'Production' },
                        { pkg: 'tailwindcss', version: '^4', type: 'Dev' },
                        { pkg: '@radix-ui/react-select', version: '^2.2.6', type: 'Production' },
                        { pkg: 'lucide-react', version: '^0.509.0', type: 'Production' },
                        { pkg: 'clsx', version: '^2.1.1', type: 'Production' },
                        { pkg: '@lottiefiles/dotlottie-react', version: '^0.17.7', type: 'Production' },
                    ].map(({ pkg, version, type }) => (
                        <div key={pkg} className="flex items-center justify-between px-4 py-3 hover:bg-gray-a2">
                            <code className="text-sm font-roboto text-foreground">{pkg}</code>
                            <div className="flex items-center gap-4">
                                <code className="text-xs font-roboto text-text-muted">{version}</code>
                                <Badge text={type} color={type === 'Dev' ? 'bg-gray-a4' : 'bg-yellow-a4'} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
