// Module Imports
import { Subtitle } from '@tremor/react';

// Hooks
import { useStateCount } from '../api/getTotalStates';

// Components
import { KPICard } from '@/components/ui';

export const StateCountCard = () => {
    const { data, isError } = useStateCount();

    if (isError) {
        return <Subtitle>Error!</Subtitle>;
    } else if (data) {
        return (
            <KPICard
                metric={data.totalStates}
                title='States'
                tooltipText='The total number of states considered in the analysis.'
            />
        );
    } else {
        return <></>;
    }
};
