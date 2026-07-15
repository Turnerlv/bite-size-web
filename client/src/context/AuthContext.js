'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export function AuthProvider({ children, initialUser }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(() => initialUser || null);
    const router = useRouter();

    // Login
    const login = (accessToken, userDetails) => {
        setToken(accessToken);
        setUser(userDetails);
    };

    // Logout Action
    const logout = () => {
        Cookies.remove('token');
        setToken(null);
        setUser(null);

        router.push('/login');
        router.refresh();
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    }

    // Derived Properties
    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoggedIn,
            isAdmin,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}