// Module Imports
import {LocationsTable} from '@/features/locations';
import {Card} from '@tremor/react';

export const DetailPage = () => {
    return (
        <Card className='pt-6 mt-6'>
            <LocationsTable />
        </Card>
    );
};
