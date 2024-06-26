import './bootstrap';
import '../css/app.css';
import "react-quill/dist/quill.snow.css";

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FaEnvelope } from 'react-icons/fa';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const queryClient = new QueryClient();


        root.render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
                
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
