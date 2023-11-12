// Hooks
import { useMostFormerBusiness } from "../api";

// Components
import { KPICard } from "@/components/ui";

export const MostFormerBusinessCard = () => {
    const { data, isLoading, isError } = useMostFormerBusiness();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error!</p>;

    return (
        <KPICard metric={data.formerBusiness} title='Former Business with the Most Locations' />
    );
};
