// Hooks
import {useTotalLocations} from '../api/getTotalLocations';

// Components
import {KPICard} from '@/components/ui';

export const TotalLocationsCard = () => {
    const {data, isLoading, isError} = useTotalLocations();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error!</p>;

    return <KPICard metric={data.totalLocations} title='Total Locations' />;
};
