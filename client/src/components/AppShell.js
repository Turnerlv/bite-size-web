'use client';

import Navigation from "./navigation/Navigation";
import Footer from '@/components/navigation/Footer';
import { DrawerProvider } from "@/context/DrawerContext";
import { NotificationProvider } from "@/context/NotificationContext";

export default function AppShell({ children }) {
    return (
        <NotificationProvider>
            <DrawerProvider>
                <Navigation />
                {children}
                <Footer />
                </DrawerProvider>
            </NotificationProvider>    );
}