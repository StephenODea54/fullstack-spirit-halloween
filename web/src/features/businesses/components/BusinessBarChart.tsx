// Module Imports
import { BarChart, Bold, Card, Subtitle, Text } from '@tremor/react';

// Hooks
import { useBusinessCounts } from '../api';

// Types
interface BusinessPayload {
    color: string;
    payload: {
        id: string;
        formerBusiness: string;
        totalLocations: number;
    };
}

interface BusinessBarChartProps {
    limit?: number;
    sort?: 'ASC' | 'DESC';
}

export const BusinessBarChart = ({ limit = 10, sort = 'DESC' }: BusinessBarChartProps) => {
    const customTooltip = ({ payload, active }: { payload: any; active: boolean | undefined }) => {
        if (!active || !payload) return null;

        return (
            <Card className='w-56 p-2'>
                {payload.map((category: BusinessPayload, idx: number) => {
                    return (
                        <div key={idx} className='flex flex-1 space-x-2.5'>
                            <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
                            <div className='space-y-1'>
                                <Bold>{category.payload.formerBusiness}</Bold>
                                <Text>{category.payload.totalLocations} Locations</Text>
                            </div>
                        </div>
                    );
                })}
            </Card>
        );
    };

    const { data, isError } = useBusinessCounts({ limit, sort });

    if (isError) {
        return <Subtitle>Error!</Subtitle>;
    } else if (data) {
        return (
            <BarChart
                categories={['totalLocations']}
                customTooltip={customTooltip}
                data={data}
                index={'formerBusiness'}
                showAnimation={true}
                showLegend={false}
            />
        );
    } else {
        return <></>;
    }
};
