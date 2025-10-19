// pages/style-guide.tsx
import Button from "@/components/Button";
import { Heart } from "lucide-react";

export default function StyleGuide() {
    return (
        <main className="flex flex-col w-full p-8 space-y-12 bg-background text-white min-h-screen pt-19">
            {/* Typography */}
            <section className="mx-auto w-full m-24 px-8 max-w-[1200px]">
                <h2 className="text-3xl font-rubik font-bold mb-4">Typography</h2>
                <div className="space-y-2">
                    <h1 className="heading-1 text-foreground">Heading 1</h1>
                    <h2 className="heading-2 text-foreground">Heading 2</h2>
                    <h3 className="heading-3 text-foreground">Heading 3</h3>
                    <h4 className="heading-4 text-foreground">Heading 4</h4>
                    <h5 className="heading-5 text-foreground">Heading 5</h5>
                    <h6 className="heading-6 text-foreground">Heading 6</h6>
                    <p className="body-lg">Body Large</p>
                    <p className="body">Body text - base</p>
                    <p className="body-sm">Body Small</p>
                </div>
            </section>

            {/* Colors */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Background', class: 'bg-background text-foreground' },
                        { name: 'Foreground', class: 'bg-foreground text-background' },
                        { name: 'Surface', class: 'bg-surface text-foreground' },
                        { name: 'Border', class: 'bg-border text-foreground' },
                        { name: 'Text Muted', class: 'bg-background text-text-muted' },
                        { name: 'Primary', class: 'bg-primary text-primary-contrast' },
                        { name: 'Secondary', class: 'bg-secondary text-secondary-contrast' },
                        { name: 'Gray 1', class: 'bg-gray-1 text-gray-12' },
                        { name: 'Gray 2', class: 'bg-gray-2 text-gray-12' },
                        { name: 'Gray 3', class: 'bg-gray-3 text-gray-12' },
                        { name: 'Gray 4', class: 'bg-gray-4 text-gray-12' },
                        { name: 'Gray 5', class: 'bg-gray-5 text-gray-12' },
                        { name: 'Gray 6', class: 'bg-gray-6 text-gray-12' },
                        { name: 'Gray 7', class: 'bg-gray-7 text-gray-12' },
                        { name: 'Gray 8', class: 'bg-gray-8 text-gray-12' },
                        { name: 'Gray 9', class: 'bg-gray-9 text-gray-1' },
                        { name: 'Gray 10', class: 'bg-gray-10 text-gray-1' },
                        { name: 'Gray 11', class: 'bg-gray-11 text-gray-1' },
                        { name: 'Gray 12', class: 'bg-gray-12 text-gray-1' },
                        { name: 'Yellow 1', class: 'bg-yellow-1 text-yellow-12' },
                        { name: 'Yellow 2', class: 'bg-yellow-2 text-yellow-12' },
                        { name: 'Yellow 3', class: 'bg-yellow-3 text-yellow-12' },
                        { name: 'Yellow 4', class: 'bg-yellow-4 text-yellow-12' },
                        { name: 'Yellow 5', class: 'bg-yellow-5 text-yellow-12' },
                        { name: 'Yellow 6', class: 'bg-yellow-6 text-yellow-12' },
                        { name: 'Yellow 7', class: 'bg-yellow-7 text-yellow-12' },
                        { name: 'Yellow 8', class: 'bg-yellow-8 text-yellow-12' },
                        { name: 'Yellow 9', class: 'bg-yellow-9 text-yellow-12' },
                        { name: 'Yellow 10', class: 'bg-yellow-10 text-yellow-12' },
                        { name: 'Yellow 11', class: 'bg-yellow-11 text-yellow-1' },
                        { name: 'Yellow 12', class: 'bg-yellow-12 text-yellow-1' },
                    ].map((color, i) => (
                        <div
                            key={i}
                            className={`${color.class} h-20 rounded-lg flex items-center justify-center`}
                        >
                            <span className="text-sm font-medium">{color.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Spacing scale */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Spacing</h2>
                <div className="flex flex-wrap gap-4">
                    {[1, 2, 4, 6, 8, 10, 12, 16, 20].map((space) => (
                        <div key={space} className="flex flex-col items-center">
                            <div
                                className="bg-blue-400 w-4"
                                style={{ height: `${space * 4}px` }}
                            />
                            <span className="text-xs mt-1">{`space-${space}`}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Buttons */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Buttons</h2>
                <div className="flex gap-4 items-start mb-8">
                    <Button variant='primary' size='xs' iconPosition='default'>Button</Button>
                    <Button variant='primary' size='xs' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='primary' size='xs' icon={Heart} iconPosition='only'></Button>
                    <Button variant='primary' size='sm' iconPosition='default'>Button</Button>
                    <Button variant='primary' size='sm' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='primary' size='sm' icon={Heart} iconPosition='only'></Button>
                    <Button variant='primary' size='md' iconPosition='default'>Button</Button>
                    <Button variant='primary' size='md' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='primary' size='md' icon={Heart} iconPosition='only'></Button>
                    <Button variant='primary' size='lg' iconPosition='default'>Button</Button>
                    <Button variant='primary' size='lg' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='primary' size='lg' icon={Heart} iconPosition='only'></Button>
                </div>
                <div className="flex gap-4 items-start mb-8">
                    <Button variant='secondary' size='sm' iconPosition='default'>Button</Button>
                    <Button variant='secondary' size='sm' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='secondary' size='sm' icon={Heart} iconPosition='only'></Button>
                    <Button variant='secondary' size='md' iconPosition='default'>Button</Button>
                    <Button variant='secondary' size='md' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='secondary' size='md' icon={Heart} iconPosition='only'></Button>
                    <Button variant='secondary' size='lg' iconPosition='default'>Button</Button>
                    <Button variant='secondary' size='lg' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='secondary' size='lg' icon={Heart} iconPosition='only'></Button>
                </div>
                <div className="flex gap-4 items-start mb-8">
                    <Button variant='outline' size='sm' iconPosition='default'>Button</Button>
                    <Button variant='outline' size='sm' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='outline' size='sm' icon={Heart} iconPosition='only'></Button>
                    <Button variant='outline' size='md' iconPosition='default'>Button</Button>
                    <Button variant='outline' size='md' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='outline' size='md' icon={Heart} iconPosition='only'></Button>
                    <Button variant='outline' size='lg' iconPosition='default'>Button</Button>
                    <Button variant='outline' size='lg' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='outline' size='lg' icon={Heart} iconPosition='only'></Button>
                </div>
                <div className="flex gap-4 items-start mb-8">
                    <Button variant='soft' size='sm' iconPosition='default'>Button</Button>
                    <Button variant='soft' size='sm' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='soft' size='sm' icon={Heart} iconPosition='only'></Button>
                    <Button variant='soft' size='md' iconPosition='default'>Button</Button>
                    <Button variant='soft' size='md' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='soft' size='md' icon={Heart} iconPosition='only'></Button>
                    <Button variant='soft' size='lg' iconPosition='default'>Button</Button>
                    <Button variant='soft' size='lg' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='soft' size='lg' icon={Heart} iconPosition='only'></Button>
                </div>
                <div className="flex gap-4 items-start mb-8">
                    <Button variant='surface' size='sm' iconPosition='default'>Button</Button>
                    <Button variant='surface' size='sm' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='surface' size='sm' icon={Heart} iconPosition='only'></Button>
                    <Button variant='surface' size='md' iconPosition='default'>Button</Button>
                    <Button variant='surface' size='md' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='surface' size='md' icon={Heart} iconPosition='only'></Button>
                    <Button variant='surface' size='lg' iconPosition='default'>Button</Button>
                    <Button variant='surface' size='lg' icon={Heart} iconPosition='left'>Button</Button>
                    <Button variant='surface' size='lg' icon={Heart} iconPosition='only'></Button>
                </div>
            </section>

            {/* Cards or Components */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Sample Card</h2>
                <div className="bg-surface p-6 rounded-xl shadow-lg max-w-md">
                    <h3 className="text-xl font-semibold mb-2">Card Title</h3>
                    <p className="text-sm text-gray-300">
                        This is a sample card with background, padding, and rounded corners.
                    </p>
                </div>
            </section>
        </main>
    );
}
