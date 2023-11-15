// Hooks
import {useBusinessMax} from '../api';

// Components
import {KPICard} from '@/components/ui';

export const BusinessMaxCard = () => {
    const {data, isLoading, isError} = useBusinessMax();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error!</p>;

    return <KPICard metric={data.formerBusiness} title='Former Business with the Most Locations' />;
};
