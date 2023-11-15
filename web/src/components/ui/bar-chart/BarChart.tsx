// Module Imports
import { BarChart as TremorBarChart, type Color, type CustomTooltipType } from '@tremor/react';

// Types
interface BarChartProps<T> {
    categories: string[];
    colors?: Color[];
    customTooltip?: React.ComponentType<CustomTooltipType>;
    data: T[];
    index: string;
    layout?: 'horizontal' | 'vertical';
    valueFormatter?: (number: number) => string;
}

export const BarChart = <T,>({
    categories,
    colors = ['blue'],
    customTooltip,
    data,
    index,
    layout = 'horizontal',
    valueFormatter,
}: BarChartProps<T>) => {
    return (
        <TremorBarChart
            categories={categories}
            colors={colors}
            customTooltip={customTooltip}
            data={data}
            index={index}
            layout={layout}
            showAnimation={true}
            showLegend={false}
            valueFormatter={valueFormatter}
        />
    );
};
