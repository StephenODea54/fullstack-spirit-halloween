// Module Imports
import {useState} from 'react';
import {BarsArrowDownIcon, BarsArrowUpIcon} from '@heroicons/react/24/outline';

// Features
import {FormerBusinessBarChart, MostFormerBusinessCard} from '@/features/businesses';
import {TotalLocationsCard} from '@/features/locations';
import {StateCountsBarChart, TotalStatesCard} from '@/features/states';

// Components
import {Card, Flex, Grid, Select, SelectItem, Tab, TabGroup, TabList, Text, Title} from '@tremor/react';

// Constants
const LIMITS = [5, 10, 15, 20, 25];

// Types
type Sort = 'ASC' | 'DESC';

export const OverviewPage = () => {
    // State Bar Chart Filters
    const [statesSort, setStatesSort] = useState<Sort>('DESC');
    const [statesLimit, setStatesLimit] = useState(LIMITS[1]);

    // Business Bar Chart Filters
    const [businessSort, setBusinessSort] = useState<Sort>('DESC');
    const [businessLimit, setBusinessLimit] = useState(LIMITS[1]);

    // Toggle for State and Business View
    const [view, setView] = useState<'state' | 'business'>('state');

    return (
        <>
            <Grid numItems={1} numItemsMd={3} className='gap-6 mt-6'>
                <TotalLocationsCard />
                <TotalStatesCard />
                <MostFormerBusinessCard />
            </Grid>
            <Card className='mt-6'>
                <Flex className='md:flex-row' flexDirection='col' justifyContent='between'>
                    <Flex alignItems='start' flexDirection='col'>
                        <Title>
                            Spirit Halloween Locations by {view === 'state' ? 'State' : 'Former Business'}
                        </Title>
                        <Text>Top {view === 'state' ? statesLimit : businessLimit} Locations</Text>
                    </Flex>
                    <TabGroup
                        className='mt-4 flex md:justify-end md:mt-0'
                        onIndexChange={index => {
                            if (index === 0) {
                                setView('state');
                            } else {
                                setView('business');
                            }
                        }}>
                        <TabList variant='solid'>
                            <Tab>State View</Tab>
                            <Tab>Business View</Tab>
                        </TabList>
                    </TabGroup>
                </Flex>
                <Flex className='mt-12 max-w-[275px]'>
                    <TabGroup
                        onIndexChange={index => {
                            if (index === 0) {
                                view === 'state' ? setStatesSort('DESC') : setBusinessSort('DESC');
                            } else {
                                view === 'state' ? setStatesSort('ASC') : setBusinessSort('ASC');
                            }
                        }}>
                        <TabList variant='solid'>
                            <Tab icon={BarsArrowDownIcon} />
                            <Tab icon={BarsArrowUpIcon} />
                        </TabList>
                    </TabGroup>
                    <Select
                        enableClear={false}
                        onValueChange={value => {
                            view === 'state'
                                ? setStatesLimit(parseInt(value))
                                : setBusinessLimit(parseInt(value));
                        }}
                        value={view === 'state' ? statesLimit.toString() : businessLimit.toString()}>
                        {LIMITS.map(limit => (
                            <SelectItem key={limit} value={limit.toString()}>
                                {limit}
                            </SelectItem>
                        ))}
                    </Select>
                </Flex>
                <Flex className='mt-6'>
                    {view === 'business' ? (
                        <FormerBusinessBarChart limit={businessLimit} sort={businessSort} />
                    ) : (
                        <StateCountsBarChart limit={statesLimit} sort={statesSort} />
                    )}
                </Flex>
            </Card>
        </>
    );
};
