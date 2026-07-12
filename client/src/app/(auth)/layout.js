export default function authLayout({ children }) {
    return (
        <div className="pt-18.5 min-h-screen max-w-[1200px] mx-auto flex text-foreground">

            {/* Left: form */}
            <div className="flex-1 flex items-center justify-center page-padding py-16">
                <div className="w-full max-w-[480px] flex flex-col gap-8">
                    {children}
                </div>
            </div>

            {/* Right: branded panel */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-primary p-16 my-8">
                <p className="font-rubik font-bold text-3xl leading-tight text-primary-contrast flex flex-col gap-2">
                    <span>Think like a designer.</span>
                    <span>Build like an engineer.</span>
                </p>
            </div>

        </div>
    );
}
