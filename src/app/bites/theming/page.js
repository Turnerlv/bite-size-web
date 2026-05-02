import Badge from '@/components/Badge';

const grayScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const yellowScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const semanticTokens = [
    { token: '--color-background', class: 'bg-background', label: 'Background', text: 'text-foreground' },
    { token: '--color-foreground', class: 'bg-foreground', label: 'Foreground', text: 'text-background' },
    { token: '--color-surface', class: 'bg-surface', label: 'Surface', text: 'text-foreground' },
    { token: '--color-border', class: 'bg-border', label: 'Border', text: 'text-foreground' },
    { token: '--color-text-muted', class: 'bg-background', label: 'Text Muted', text: 'text-text-muted' },
    { token: '--color-primary', class: 'bg-primary', label: 'Primary', text: 'text-primary-contrast' },
    { token: '--color-secondary', class: 'bg-secondary', label: 'Secondary', text: 'text-secondary-contrast' },
];

export const metadata = {
    title: 'Theming — Bites — Bite Size Design',
    description: 'Design tokens, color scales, and light/dark mode strategy for the Bite Size design system.',
};

export default function ThemingPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text="Theming" />
                    <h1 className="heading-1 mt-4">Tokens, tints &amp; tweaks.</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        A Radix-style 12-step color system with warm sepia grays and golden amber accents — built for both light and dark mode from the ground up.
                    </p>
                </div>
            </section>

            {/* Semantic Tokens */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Semantic Tokens</h2>
                <p className="text-sm font-work text-text-muted mb-8">
                    Always prefer semantic tokens over raw scale values in components. They adapt automatically across themes.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {semanticTokens.map(({ token, class: cls, label, text }) => (
                        <div key={token} className={`${cls} ${text} h-20 flex flex-col justify-between p-3 border border-border`}>
                            <span className="text-xs font-roboto">{label}</span>
                            <code className="text-[10px] font-roboto opacity-70">{token}</code>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gray Scale */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Gray Scale — Warm Sepia</h2>
                <p className="text-sm font-work text-text-muted mb-8">
                    Derived from warm amber undertones. Used for backgrounds, borders, muted text, and all neutral surfaces.
                </p>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {grayScale.map((step) => (
                        <div key={step} className="flex flex-col items-center gap-1">
                            <div
                                className={`w-full aspect-square bg-gray-${step}`}
                                style={{ backgroundColor: `var(--gray-${step})` }}
                            />
                            <span className="text-[10px] font-roboto text-text-muted">{step}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Yellow Scale */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Yellow Scale — Golden Amber</h2>
                <p className="text-sm font-work text-text-muted mb-8">
                    The primary accent. Step 9 (<code className="font-roboto text-xs text-primary">#f5c400</code>) is the main interactive color. Used for buttons, focus rings, highlights, and badges.
                </p>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {yellowScale.map((step) => (
                        <div key={step} className="flex flex-col items-center gap-1">
                            <div
                                className="w-full aspect-square"
                                style={{ backgroundColor: `var(--yellow-${step})` }}
                            />
                            <span className="text-[10px] font-roboto text-text-muted">{step}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dark Mode Strategy */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border">
                <h2 className="heading-3 mb-2">Dark Mode</h2>
                <p className="text-sm font-work text-text-muted mb-6">
                    Dark mode is driven by{' '}
                    <code className="font-roboto text-xs text-primary">data-theme=&quot;dark&quot;</code> on{' '}
                    <code className="font-roboto text-xs text-primary">&lt;html&gt;</code>. All color tokens are redefined
                    inside a{' '}
                    <code className="font-roboto text-xs text-primary">@variant dark</code> block in{' '}
                    <code className="font-roboto text-xs text-primary">globals.css</code>. No additional class switching needed in components.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-border p-6 bg-gray-a2">
                        <h3 className="heading-5 mb-3">Light background</h3>
                        <p className="text-sm font-roboto text-text-muted">
                            <code>#fdfaf6</code> — Soft parchment. Warm, not sterile white.
                        </p>
                    </div>
                    <div className="border border-border p-6" style={{ background: '#12110f', color: '#f0edea' }}>
                        <h3 className="heading-5 mb-3" style={{ color: '#f0edea' }}>Dark background</h3>
                        <p className="text-sm font-roboto" style={{ color: '#b9b2a8' }}>
                            <code>#0e0c0a</code> — Near black with warmth. Not pure black.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
