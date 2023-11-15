// Module Imports
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';

// Hooks
import { useTheme } from '@/hooks';

// Components
import { Tab, TabGroup, TabList, Text, Title } from '@tremor/react';

// Types
interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { setTheme } = useTheme();

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
            <main className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
                <div className='flex flex-col space-y-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <Title>Spirit Halloween - Economic Analysis</Title>
                            <Text>Inspired by u/plutoandmal</Text>
                        </div>
                        <TabGroup
                            onIndexChange={index => {
                                if (index === 0) {
                                    setTheme('light');
                                } else {
                                    setTheme('dark');
                                }
                            }}
                            className='flex justify-end'>
                            <TabList variant='solid'>
                                <Tab icon={SunIcon} />
                                <Tab icon={MoonIcon} />
                            </TabList>
                        </TabGroup>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
};
