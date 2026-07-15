import Button from '@/components/Button';

export default function NotFound() {
    return (
        <main className="page-padding mx-auto max-w-[1200px] min-h-screen pb-20 flex items-center justify-center">
            <section className="w-full max-w-3xl p-8 md:p-12 text-center">
                <p className="font-roboto text-sm uppercase tracking-[0.12em] text-text-muted">Error 404</p>
                <h1 className="heading-1 mt-3 text-foreground">Page not found</h1>
                <p className="large-block text-body text-text-muted mt-4">
                    The page you are looking for does not exist or may have moved.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button as="link" href="/" variant="primary" size="md">
                        Back to home
                    </Button>
                    <Button as="link" href="/bites" variant="outline" size="md">
                        Browse bites
                    </Button>
                </div>
            </section>
        </main>
    );
}
