// Hooks
import {useStateCount} from '../api/getTotalStates';

// Components
import {KPICard} from '@/components/ui';

export const StateCountCard = () => {
    const {data, isLoading, isError} = useStateCount();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error!</p>;

    return <KPICard metric={data.totalStates} title='Total States' />;
};
