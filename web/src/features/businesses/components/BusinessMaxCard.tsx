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
        return (
            <KPICard
                metric={data.formerBusiness}
                title='Most Frequent location'
                tooltipText='The former store with the most Spirit Halloween locations.'
            />
        );
    } else {
        return <></>;
    }
};
