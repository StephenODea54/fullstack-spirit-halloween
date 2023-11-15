import { Card, Metric, Text } from '@tremor/react';

// Types
interface KPICardProps {
    metric: number | string;
    title: string;
}

export const KPICard = ({ metric, title }: KPICardProps) => {
    return (
        <Card className='max-w-lg'>
            <Text>{title}</Text>
            <Metric>{metric}</Metric>
        </Card>
    );
};
