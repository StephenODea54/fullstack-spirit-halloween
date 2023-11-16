// Providers
import { AppProvider } from '@/providers';

// Head
import { Head } from '@/components/Head';

// Layout
import { Layout } from '@/components/layout';

// Pages
import { DetailPage, OverviewPage } from '@/pages';

// Components
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';

export default function App() {
    return (
        <AppProvider>
            <Head
                title='Spirit Halloween'
                description='An economic analysis of what former department stores were home to Spirit Halloween locations in 2023.'
            />
            <Layout>
                <TabGroup>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Detail</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <OverviewPage />
                        </TabPanel>
                        <TabPanel>
                            <DetailPage />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </Layout>
        </AppProvider>
    );
}
