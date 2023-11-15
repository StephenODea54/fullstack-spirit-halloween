// Module Imports
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Flex, Tab, TabGroup, TabList, Text, Title } from '@tremor/react';

// Hooks
import { useTheme } from '@/hooks';

// Types
interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { setTheme } = useTheme();

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
            <main className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
                <Flex className='space-y-6' flexDirection='col' justifyContent='start'>
                    <Flex>
                        <div className='w-full'>
                            <Title>Dashboard</Title>
                            <div className='hidden sm:block'>
                                <Text>
                                    An analysis of which department stores are now Spirit Halloween Locations
                                </Text>
                            </div>
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
                    </Flex>
                    {children}
                </Flex>
            </main>
        </div>
    );
};
