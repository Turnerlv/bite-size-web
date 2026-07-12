
import ContactForm from "@/components/form/ContactForm";

export const metadata = {
    title: 'Contact — Bite Size Design',
    description: 'Get in touch for projects, consulting, or speaking.',
};

export default function ContactPage() {
    return (
        <section className="pt-[74px] page-padding mx-auto max-w-[800px] pb-12 text-foreground">
            <div className="min-h-[15vh] flex flex-col justify-end pb-8">
                <h1 className="heading-2">Contact</h1>
            </div>
            <ContactForm />
        </section>
    );
}