import { serverFetch } from './clients';

export const briefsAPI = {
    server: {
        getAll: (options = { next: { revalidate: 60 } }) => serverFetch('/blogs', options),
        getByAuthor: (authorId, options = { next: { revalidate: 60 } }) => serverFetch(`/blogs/by-author/${authorId}`, options),
        newBrief: (body) => serverFetch('/blogs', { method: 'POST', body: JSON.stringify(body) }),
        updateBrief: (id, body) => serverFetch(`/blogs/blog-by-id/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
        deleteBrief: (id) => serverFetch(`/blogs/blog-by-id/${id}`, { method: 'DELETE' }),
        getById: (id, options = { cache: 'no-store' }) => serverFetch(`/blogs/blog-by-id/${id}`, options),
        getBySlug: (slug, options = { next: { revalidate: 60 } }) => serverFetch(`/blogs/blog-by-slug/${slug}`, options),
    }
};