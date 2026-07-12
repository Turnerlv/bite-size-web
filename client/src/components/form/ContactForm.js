'use client';

import React, { useState } from 'react';
import { useForm as useFormspree } from '@formspree/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../../schemas/contactSchema';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { Select } from './Select';
import Button from '../Button';

export default function ContactForm({ cancel }) {
    const {
        register,
        handleSubmit: handleZodSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const [formspreeState, sendToFormspree] = useFormspree('mbdvgdgv');

    const onValidSubmit = async (data) => {
        const result = contactSchema.safeParse(data);
        if (!result.success) {
            console.error('Validation errors:', result.error);
            return;
        }
        sendToFormspree(data);
    };

    if (formspreeState.succeeded) {
        return (
            <div className='flex my-12 flex-col gap-4 items-center justify-center text-center'>
                <h2 className='heading-1'>Thanks!</h2>
                <p className='text-lg text-text-muted'>We'll be in touch soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleZodSubmit(onValidSubmit)} className='flex flex-col gap-8' aria-label="contact form" noValidate>
            <div className='w-full flex flex-col sm:flex-row gap-6'>
                <div className='flex-1'>
                    <Input
                        type="text"
                        size='lg'
                        label="Your name"
                        placeholder='Tell me what to call you.'
                        id="name"
                        name="name"
                        error={errors.name?.message}
                        {...register('name')}
                    />
                </div>
                <div className='flex-1'>
                    <Input
                        type="email"
                        size='lg'
                        label="Email"
                        placeholder="I'll reply here — no newsletters or spam."
                        id="email"
                        name="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>
            </div>

            <div>
                <Select
                    id="reason"
                    size='lg'
                    label="What brings you here?"
                    placeholder="Select a reason"
                    name="reason"
                    error={errors.reason?.message}
                    {...register('reason')}
                    options={[
                        { value: 'project', label: 'Start a project' },
                        { value: 'consulting', label: 'Consulting or advisory' },
                        { value: 'collaboration', label: 'Collaboration or partnership' },
                        { value: 'speaking', label: 'Speaking or workshop' },
                        { value: 'other', label: 'Something else' },
                    ]}
                />
            </div>
            <TextArea
                id="message"
                size='lg'
                label="What would you like to explore?"
                name="message"
                rows={3}
                error={errors.message?.message}
                {...register('message')}
            />

            <div className='flex flex-col-reverse sm:flex-row gap-6 justify-end'>
                <Button type="button" variant='ghost' onClick={cancel} size='lg'>Cancel</Button>
                <Button type="submit" isLoading={formspreeState.submitting} size='lg'>Let&apos;s talk</Button>
            </div>
        </form>
    );
}