// Module Imports
import { Subtitle } from '@tremor/react';

// Hooks
import { useLocationCount } from '../api/getLocationCount';

// Components
import { KPICard } from '@/components/ui';

export const LocationCountCard = () => {
    const { data, isError } = useLocationCount();

    if (isError) {
        return <Subtitle>Error!</Subtitle>;
    } else if (data) {
        return (
            <KPICard
                metric={data.totalLocations}
                title='Locations'
                tooltipText='The total number of department stores available in the data.'
            />
        );
    } else {
        return <></>;
    }
};
