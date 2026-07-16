'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastProvider, ToastViewport } from '@/components/Toast';


const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    // Thread-safe method to enqueue new toasts with unique IDs
    const showToast = useCallback((title, description, variant = 'default') => {
        const uniqueId = `id-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        setToasts((prev) => [...prev, { id: uniqueId, title, description, variant }]);
    }, []);

    return (
        <NotificationContext.Provider value={{ showToast }}>
            <ToastProvider>
                {children}

                {/* Map over the active stack of toasts inside the shell */}
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        open={true}
                        onOpenChange={(isOpen) => {
                            if (!isOpen) {
                                // Remove from state when dismissed or auto-closed
                                setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                            }
                        }}
                        title={toast.title}
                        description={toast.description ? toast.description : null}
                        variant={toast.variant}
                    />
                ))}

                {/* Your custom viewport pinned fixed to the screen layout */}
                <ToastViewport />
            </ToastProvider>
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within a NotificationProvider');
    return context;
};