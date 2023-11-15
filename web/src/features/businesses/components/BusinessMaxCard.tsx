// Module Imports
import { Subtitle } from '@tremor/react';

// Hooks
import { useBusinessMax } from '../api';

// Components
import { KPICard } from '@/components/ui';

export const BusinessMaxCard = () => {
    const { data, isError } = useBusinessMax();

    if (isError) {
        return <Subtitle>Error!</Subtitle>;
    } else if (data) {
        return <KPICard metric={data.formerBusiness} title='Former Business with the Most Locations' />;
    } else {
        return <></>;
    }
};
