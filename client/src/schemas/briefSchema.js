import { z } from 'zod';

export const briefSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(5, 'Title must be at least 5 characters'),
    description: z.string().min(1, 'Description is required'),
    category: z.enum(['Architecture', 'Integrations', 'DevEx', 'Technology', 'Other'], {
        error: 'Please select a category',
    }),
    image_url: z
        .string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
});
