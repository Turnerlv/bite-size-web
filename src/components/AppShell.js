'use client';

import Navigation from "../components/navigation/Navigation";
import Footer from '@/components/navigation/Footer';
import { DrawerProvider } from "@/components/DrawerContext";

export default function AppShell({ children }) {
    return (
        <DrawerProvider>
            <Navigation />
            {children}
            <Footer />
        </DrawerProvider>
    );
}