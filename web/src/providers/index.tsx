// Module Imports
import {QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

// Utils
import {queryClient} from '@/lib';

// Types
interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider = ({children}: AppProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            {children}
        </QueryClientProvider>
    );
};
