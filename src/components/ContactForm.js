import React, { useState } from 'react';
import { Input } from './form/Input';
import { TextArea } from './form/TextArea';
import { Select } from './form/Select';
import Button from './Button';

export default function ContactForm({ cancel }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='w-full flex flex-col sm:flex-row gap-6'>
                <div className='flex-1'>
                    <Input
                        type="text"
                        size='lg'
                        label="Your name"
                        placeholder='Tell me what to call you.'
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div>
                <Select
                    id="reason"
                    size='lg'
                    label="What brings you here?"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    options={[
                        { value: 'project', label: 'Start a project' },
                        { value: 'consulting', label: 'Consulting or advisory' },
                        { value: 'collaboration', label: 'Collaboration or partnership' },
                        { value: 'speaking', label: 'Speaking or workshop' },
                        { value: 'other', label: 'Something else' },
                    ]}
                    required
                />
            </div>
            <TextArea
                id="message"
                size='lg'
                label="What would you like to explore?"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                required
            />

            <div className='flex flex-col-reverse sm:flex-row gap-6 justify-end'>
                <Button type="cancel" variant='ghost' onClick={cancel} size='lg'>Cancel</Button>
                <Button type="submit" onClick={handleSubmit} size='lg'>Let's talk</Button>
            </div>
        </form>
    );
}