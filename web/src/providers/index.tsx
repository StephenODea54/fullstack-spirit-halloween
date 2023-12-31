// Module Imports
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Components
import { ThemeProvider } from '@/components/theme';

// Utils
import { queryClient } from '@/lib';

// Types
interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
                <ThemeProvider defaultTheme='light' storageKey='theme'>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </HelmetProvider>
    );
};
