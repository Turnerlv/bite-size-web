'use client';

import React, { useRef } from 'react';
import Button from '../Button';
import { useDrawer } from '@/components/DrawerContext';
import ContactForm from '../ContactForm';

const HomeContact = () => {
    const { openDrawer } = useDrawer();
    const { closeDrawer } = useDrawer();
    const buttonRef = useRef(null);

    return (
        <section className="
            /* Flex & Grid */
            flex flex-col items-center justify-center
            /* Spacing */
            py-20
        ">
            <div className="
                /* Size */
                w-full max-w-[1200px]
                /* Spacing */
                page-padding
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
                        
                        ">Ready to bite design in the ass?</h2>
                        <p>Get professionals to do the nasty bits. We don't bite...much.</p>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Button
                            variant='contrast'
                            responsive={false}
                            onClick={() => openDrawer({ title: 'Shoot us a message', node: <ContactForm cancel={closeDrawer} />, triggerEl: buttonRef.current, side: 'bottom' })}
                        >
                            Drop us a line
                        </Button>
                        <Button variant='contrast_link' responsive={false}>Check out our services</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeContact;