// Module Imports
import {BarChart as TremorBarChart} from '@tremor/react';

// Types
type Colors =
    | 'blue'
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';

interface BarChartProps<T> {
    categories: string[];
    colors?: Colors[];
    data: T[];
    index: string;
    layout?: 'horizontal' | 'vertical';
    valueFormatter?: (number: number) => string;
}

export const BarChart = <T,>({
    categories,
    colors = ['blue'],
    data,
    index,
    layout = 'vertical',
    valueFormatter,
}: BarChartProps<T>) => {
    return (
        <TremorBarChart
            colors={colors}
            categories={categories}
            data={data}
            index={index}
            layout={layout}
            valueFormatter={valueFormatter}
            showLegend={false}
            showTooltip={false}
        />
    );
};
