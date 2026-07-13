import axios from 'axios';
import { redirect } from 'next/navigation';

// Client calls
export const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_EXPRESS_API_KEY,
    },
});
apiClient.interceptors.response.use(
    
    (response) => {
        return response;
    },

    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login?reason=expired';
        }
        return Promise.reject(error);
    }
);

// Server calls
const SERVER_URL = 'http://localhost:3000/api';

export const serverFetch = async (endpoint, options = {}) => {
    const { cookies } = await import('next/headers');
    const token = (await cookies()).get('token')?.value;

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': process.env.EXPRESS_API_KEY,
        ...(token && { Cookie: `token=${token}` }),
        ...options.headers,
    };

    const { params, headers: _headers, ...fetchOptions } = options;
    const res = await fetch(`${SERVER_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    const contentType = res.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
        ? await res.json().catch(() => ({}))
        : {};

    if (!res.ok) {
        // 401 on the server side means the JWT has expired or is invalid.
        // Redirect to login rather than throwing — this mirrors the client-side
        // apiClient interceptor and gives the user a recoverable path instead of
        // landing on an error page.
        if (res.status === 401) {
            redirect('/login?reason=expired');
        }
        const message = data?.message ?? data?.error ?? res.statusText;
        throw new Error(message);
    }

    return data;
};