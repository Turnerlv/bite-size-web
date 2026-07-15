"use client";

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/form/Input';
import { TextArea } from '@/components/form/TextArea';
import { Select } from '@/components/form/Select';
import { useNotification } from '@/context/NotificationContext';
import Button from '@/components/Button';
import RichText from '@/components/form/RichText';
import { briefSchema } from '@/schemas/briefSchema';

export default function BriefForm({
    briefData,
    onSubmit,
}) {
    const pathname = usePathname();
    const { showToast } = useNotification();
    const router = useRouter();
    const isEditMode = !pathname?.endsWith('/new');

    const richTextRef = useRef(null);

    const {
        register,
        handleSubmit: rhfHandleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(briefSchema),
        defaultValues: {
            title: briefData?.title ?? '',
            description: briefData?.description ?? '',
            category: briefData?.category ?? '',
            image_url: briefData?.image_url ?? '',
        },
    });

    const onFormSubmit = async (data) => {
        try {
            const content = await richTextRef.current?.save() ?? '';
            const payload = { ...data, content };

            if (typeof onSubmit !== 'function') {
                throw new Error('A valid onSubmit callback is required.');
            }

            await onSubmit(payload);
            showToast(isEditMode ? 'Brief updated successfully' : 'Brief created successfully', null, 'success');

            reset();

            await richTextRef.current?.clear();

            router.refresh();
            router.push('/admin/briefs');

        } catch (error) {
            showToast(isEditMode ? 'Failed to update brief' : 'Failed to create brief', null, 'error');
        }
    };

    return (
        <section className="pt-[74px] page-padding mx-auto max-w-[800px] pb-12 text-foreground">
            <div className="min-h-[15vh] flex flex-col justify-end pb-8">
                <h1 className="heading-2">{isEditMode ? 'Edit brief' : 'Create new brief'}</h1>
            </div>
            <form className="flex flex-col gap-8" aria-label="brief form" onSubmit={rhfHandleSubmit(onFormSubmit)}>
                <Input
                    type="text"
                    size="lg"
                    label="Title"
                    placeholder="Give your post a clear, specific title"
                    id="title"
                    error={errors.title?.message}
                    defaultValue={briefData?.title ?? ''}
                    {...register('title')}
                />

                <TextArea
                    id="description"
                    size="lg"
                    label="Description"
                    rows={3}
                    placeholder="Write a short summary of what this post covers"
                    error={errors.description?.message}
                    defaultValue={briefData?.description ?? ''}
                    {...register('description')}
                />

                <Select
                    id="category"
                    size='lg'
                    label="Category"
                    error={errors.category?.message}
                    defaultValue={briefData?.category ?? ''}
                    options={[
                        { value: 'Architecture', label: 'Architecture' },
                        { value: 'Integrations', label: 'Integrations' },
                        { value: 'DevEx', label: 'DevEx' },
                        { value: 'Technology', label: 'Technology' },
                        { value: 'Other', label: 'Something else' },
                    ]}
                    {...register('category')}
                />

                <RichText ref={richTextRef} defaultContent={briefData?.content} />

                <div className="flex flex-col-reverse sm:flex-row gap-6 justify-end">
                    <Button type="button" variant="ghost" size="lg" onClick={() => router.push('/admin/briefs')}>
                        Cancel
                    </Button>
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit post'}
                    </Button>
                </div>
            </form>
        </section>
    );
}