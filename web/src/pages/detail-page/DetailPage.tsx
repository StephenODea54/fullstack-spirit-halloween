// Module Imports
import {Card} from '@tremor/react';

// Features
import {BusinessSelectBox} from '@/features/businesses/components/BusinessSelectBox';
import {LocationsTable} from '@/features/locations';

export const DetailPage = () => {
    return (
        <Card className='pt-6 mt-6'>
            <BusinessSelectBox />
            <LocationsTable />
        </Card>
    );
};
