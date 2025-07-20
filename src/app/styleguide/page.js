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
                    <h1 className="text-5xl font-bold text-foreground">Heading 1</h1>
                    <h2 className="text-4xl font-semibold">Heading 2</h2>
                    <h3 className="text-3xl font-medium">Heading 3</h3>
                    <p className="text-base">Body text - base</p>
                    <p className="text-sm">Small text</p>
                    <p className="text-xs">Extra small text</p>
                </div>
            </section>

            {/* Colors */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Background', class: 'bg-[#121822]' },
                        { name: 'White', class: 'bg-white text-black' },
                        { name: 'Gray 100', class: 'bg-gray-100 text-black' },
                        { name: 'Gray 800', class: 'bg-gray-800' },
                        { name: 'Blue 400', class: 'bg-blue-400' },
                        { name: 'Blue 600', class: 'bg-blue-600' },
                        { name: 'Red 500', class: 'bg-red-500' },
                        { name: 'Green 500', class: 'bg-green-500' },
                    ].map((color, i) => (
                        <div
                            key={i}
                            className={`${color.class} h-20 rounded-lg flex items-center justify-center border border-white/10`}
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
