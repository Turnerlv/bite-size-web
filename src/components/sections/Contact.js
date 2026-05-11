'use client';

import React, { useRef } from 'react';
import Button from '../Button';
import { useDrawer } from '@/components/DrawerContext';
import ContactForm from '../ContactForm';
import { HOME_CONTENT } from '@/content/static';

const HomeContact = () => {
    const { openDrawer } = useDrawer();
    const { closeDrawer } = useDrawer();
    const buttonRef = useRef(null);
    const { contact } = HOME_CONTENT;

    return (
        <section className="
            /* Size */
            w-full max-w-[1200px] mx-auto
            /* Spacing */
            py-20 page-padding
        ">
            <div className="
                bg-primary
                /* Flex & Grid */
                flex flex-col
                /* Spacing */
                justify-center
                px-8 py-12 gap-8"
            >
                <div className="text-primary-contrast">
                    <h2 className="
                    /* Other */
                    heading-3
                    /* Spacing */
                    mb-1
                    
                    ">{contact.title}</h2>
                    <p>{contact.description}</p>
                </div>
                <div className='flex flex-col sm:flex-row gap-4'>
                    <Button
                        variant='contrast'
                        responsive={false}
                        onClick={() => openDrawer({ title: 'Shoot us a message', node: <ContactForm cancel={closeDrawer} />, triggerEl: buttonRef.current, side: 'bottom' })}
                    >
                        {contact.ctas.primary.label}
                    </Button>
                    <Button variant='contrast_link' responsive={false} as='link' href={contact.ctas.secondary.href}>{contact.ctas.secondary.label}</Button>
                </div>
            </div>
        </section>
    );
};

export default HomeContact;