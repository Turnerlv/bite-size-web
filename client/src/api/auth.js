import { serverFetch } from './clients';

export const authAPI = {

server: {
    createAccount: (body, options = {}) => serverFetch('/auth/create-account', { method: 'POST', body: JSON.stringify(body), ...options }),
    login: (body, options = {}) => serverFetch('/auth/login', { method: 'POST', body: JSON.stringify(body), ...options }),
    updatePassword: (body, options = {}) => serverFetch('/auth/change-password', { method: 'PUT', body: JSON.stringify(body), ...options }),
}
};