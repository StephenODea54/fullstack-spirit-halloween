// Module Imports
import { Card, Text } from '@tremor/react';

// Hooks
import { useFormerBusinessCounts } from '../api';

// Components
import { BarChart } from '@/components/ui';

// Types
interface FormerBusinessBarChartProps {
    limit?: number;
    sort?: 'ASC' | 'DESC';
}

export const FormerBusinessBarChart = ({ limit = 10, sort = 'DESC' }: FormerBusinessBarChartProps) => {
    const customTooltip = ({ payload, active }: { payload: any, active: boolean | undefined }) => {
        if (!active || !payload) return null;

        return (
            <Card className="w-56 p-2">
                {payload.map((category: { color: string; value: number }, idx: number) => (
                    <div key={idx} className="flex flex-1 space-x-2.5">
                        <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
                        <div className="space-y-1">
                            <Text>{category.value} Locations</Text>
                        </div>
                    </div>
                ))}
            </Card>
        );
    };

    const { data, isError } = useFormerBusinessCounts({ limit, sort });

    if (isError) return <p>Error!</p>;

    return (
        <BarChart<typeof data>
            categories={['totalLocations']}
            customTooltip={customTooltip}
            data={data}
            index='formerBusiness'
        />
    );
};
