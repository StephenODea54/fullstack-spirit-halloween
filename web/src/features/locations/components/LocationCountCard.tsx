// Hooks
import { useLocationCount } from '../api/getLocationCount';

// Components
import { KPICard } from '@/components/ui';

export const LocationCountCard = () => {
    const { data, isLoading, isError } = useLocationCount();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error!</p>;

    return <KPICard metric={data.totalLocations} title='Total Locations' />;
};
