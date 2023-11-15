// Module Imports
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Card, Flex, Icon, Metric, Text } from '@tremor/react';

// Types
interface KPICardProps {
    metric: number | string;
    title: string;
    tooltipText?: string;
}

export const KPICard = ({ metric, title, tooltipText }: KPICardProps) => {
    return (
        <Card className='max-w-lg'>
            <Flex alignItems='center' className='space-x-0.5' justifyContent='start'>
                <Text>{title}</Text>
                {tooltipText && <Icon icon={InformationCircleIcon} tooltip={tooltipText} />}
            </Flex>
            <Metric>{metric}</Metric>
        </Card>
    );
};
