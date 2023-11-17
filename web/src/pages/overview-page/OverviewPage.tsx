// Module Imports
import { useState } from 'react';
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';

// Features
import { BusinessBarChart, BusinessMaxCard } from '@/features/businesses';
import { LocationCountCard } from '@/features/locations';
import { StateCountCard } from '@/features/states';

// Components
import { Card, Flex, Grid, Select, SelectItem, Tab, TabGroup, TabList, Text, Title } from '@tremor/react';

// Constants
const LIMITS = [5, 10, 15, 20, 25];

// Types
type Sort = 'ASC' | 'DESC';

export const OverviewPage = () => {
    const [businessSort, setBusinessSort] = useState<Sort>('DESC');
    const [businessLimit, setBusinessLimit] = useState(LIMITS[1]);

    return (
        <>
            <Grid numItems={1} numItemsMd={3} className='gap-6 mt-6'>
                <LocationCountCard />
                <BusinessMaxCard />
            </Grid>
            <Card className='mt-6'>
                <Flex className='md:flex-row' flexDirection='col' justifyContent='between'>
                    <Flex alignItems='start' flexDirection='col'>
                        <Title>Spirit Halloween Locations by Former Business</Title>
                        <Text>Top {businessLimit} Locations</Text>
                    </Flex>
                    <Flex className='max-w-[275px] self-start mt-6 md:mt-0'>
                        <TabGroup
                            onIndexChange={index => {
                                if (index === 0) {
                                    setBusinessSort('DESC');
                                } else {
                                    setBusinessSort('ASC');
                                }
                            }}>
                            <TabList variant='solid'>
                                <Tab icon={BarsArrowDownIcon} />
                                <Tab icon={BarsArrowUpIcon} />
                            </TabList>
                        </TabGroup>
                        <Select
                            enableClear={false}
                            onValueChange={value => setBusinessLimit(parseInt(value))}
                            value={businessLimit.toString()}>
                            {LIMITS.map(limit => (
                                <SelectItem key={limit} value={limit.toString()}>
                                    {limit}
                                </SelectItem>
                            ))}
                        </Select>
                    </Flex>
                </Flex>
                <Flex className='mt-6'>
                    <BusinessBarChart limit={businessLimit} sort={businessSort} />
                </Flex>
            </Card>
        </>
    );
};
