// Providers
import {AppProvider} from '@/providers';

// Layout
import {Layout} from '@/components/layout';

// Pages
import {OverviewPage} from '@/pages';

// Components
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@tremor/react';

export default function App() {
    return (
        <AppProvider>
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
                        <TabPanel>Hello from the details tab</TabPanel>
                    </TabPanels>
                </TabGroup>
            </Layout>
        </AppProvider>
    );
}
