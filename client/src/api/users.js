import { apiClient, serverFetch } from './clients';

export const usersAPI = {
    server: {
        getAll: (options = { next: { revalidate: 60 } }) => serverFetch('/users', options),
        getById: (id, options = { next: { revalidate: 60 } }) => serverFetch(`/users/user-by-id/${id}`, options),
        updateUser: (id, body) => serverFetch(`/users/user-by-id/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
        deleteUser: (id) => serverFetch(`/users/user-by-id/${id}`, { method: 'DELETE' }),
    }
};