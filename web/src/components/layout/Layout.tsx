// Components
import {Text, Title} from '@tremor/react';

// Types
interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
            <main className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
                <div className='flex flex-col space-y-6'>
                    <div>
                        <Title>Spirit Halloween - Economic Analysis</Title>
                        <Text>Inspired by u/plutoandmal</Text>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
};
