// Components
import {DataTable} from '@/components/ui';
import {LocationsColumns} from '../components';

// Hooks
import {useLocations} from '../api';

export const LocationsTable = () => {
    const {data, isError} = useLocations();

    if (isError) return <p>Error!</p>;

    return <DataTable columns={LocationsColumns} data={(data && data) || []} />;
};
