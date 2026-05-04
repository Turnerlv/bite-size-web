import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { Heart, ArrowRight, Star } from 'lucide-react';

const componentList = [
    {
        name: 'Button',
        description: 'Eight variants, four sizes, icon support, responsive mode, and link rendering via Next.js.',
        category: 'Action',
        status: 'Stable',
    },
    {
        name: 'Badge',
        description: 'Compact label for categories, statuses, and tags. Uppercase, Roboto Mono, alpha-tinted.',
        category: 'Display',
        status: 'Stable',
    },
    {
        name: 'Input',
        description: 'Text input with label, description, error state, icon slots, and three visual variants.',
        category: 'Form',
        status: 'Stable',
    },
    {
        name: 'Select',
        description: 'Radix UI–powered select with full keyboard navigation, same sizing API as Input.',
        category: 'Form',
        status: 'Stable',
    },
    {
        name: 'TextArea',
        description: 'Resizable textarea with character counter, single-row pill shape, and multi-row radius.',
        category: 'Form',
        status: 'Stable',
    },
    {
        name: 'ProductCard',
        description: 'Clickable card for bites — heading, description, badge, and optional preview image.',
        category: 'Display',
        status: 'Stable',
    },
    {
        name: 'MarketingTile',
        description: 'Side-image + copy tile used in differentiator grids and feature callouts.',
        category: 'Display',
        status: 'Stable',
    },
    {
        name: 'Drawer',
        description: 'Accessible slide-in panel. Supports four sides, focus trap, ESC, and focus return.',
        category: 'Overlay',
        status: 'Stable',
    },
    {
        name: 'Navigation',
        description: 'Mega-menu desktop nav + mobile slide-down. Keyboard navigable, dark-toggle included.',
        category: 'Navigation',
        status: 'Stable',
    },
    {
        name: 'Footer',
        description: 'Full-width footer with logo, nav links, and social icons. Auto-populated from nav config.',
        category: 'Navigation',
        status: 'Stable',
    },
];

const categoryColors = {
    Action: 'bg-yellow-a4',
    Display: 'bg-gray-a4',
    Form: 'bg-gray-a3',
    Overlay: 'bg-yellow-a3',
    Navigation: 'bg-gray-a5',
};

export const metadata = {
    title: 'Components — Bites — Bite Size Design',
    description: 'Common components, coded cleanly. The Bite Size Design component library.',
};

export default function ComponentsPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text="Components" />
                    <h1 className="heading-1 mt-4">* Components (to remove)</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        Accessible, composable UI building blocks. Each component follows the same sizing, variant, and focus-state conventions.
                    </p>
                </div>
            </section>

            {/* Button Showcase */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Button</h2>
                <p className="text-sm font-work text-text-muted mb-8">
                    8 variants × 4 sizes. Supports icons, links, and responsive full-width mode.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                    <Button variant="primary" size="md">Primary</Button>
                    <Button variant="secondary" size="md">Secondary</Button>
                    <Button variant="outline" size="md">Outline</Button>
                    <Button variant="soft" size="md">Soft</Button>
                    <Button variant="surface" size="md">Surface</Button>
                    <Button variant="ghost" size="md">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                    <Button variant="primary" size="xs">XS</Button>
                    <Button variant="primary" size="sm">SM</Button>
                    <Button variant="primary" size="md">MD</Button>
                    <Button variant="primary" size="lg">LG</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="md" icon={Heart} iconPosition="left">With icon</Button>
                    <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">Icon right</Button>
                    <Button variant="primary" size="md" icon={Star} iconPosition="only" />
                </div>
            </section>

            {/* Component Grid */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-8">All Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {componentList.map((component) => (
                        <div
                            key={component.name}
                            className="flex items-start gap-4 border border-border p-5 bg-gray-a2 hover:bg-gray-a3 transition-colors"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="heading-5">{component.name}</h3>
                                    <Badge
                                        text={component.category}
                                        color={categoryColors[component.category]}
                                    />
                                </div>
                                <p className="text-sm font-work text-text-muted">{component.description}</p>
                            </div>
                            <span className="shrink-0 text-[10px] font-roboto text-primary uppercase">{component.status}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
