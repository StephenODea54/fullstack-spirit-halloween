// Hooks
import { useTotalStates } from "../api/getTotalStates";

// Components
import { KPICard } from "@/components/ui";

export const TotalStatesCard = () => {
    const { data, isLoading, isError } = useTotalStates();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error!</p>;

    return (
        <KPICard metric={data.totalStates} title='Total States' />
    );
};
