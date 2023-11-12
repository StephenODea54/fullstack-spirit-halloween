import { Card, Metric, Text } from "@tremor/react";

// Types
interface KPICardProps {
    metric: number;
    title: string;
}

export const KPICard = ({ metric, title }: KPICardProps) => {
    return (
        <div className="max-w-lg">
            <Card>
                <Text>{title}</Text>
                <Metric>{metric}</Metric>
            </Card>
        </div>
    );
};
