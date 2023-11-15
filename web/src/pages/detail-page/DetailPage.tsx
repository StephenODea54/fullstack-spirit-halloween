// Module Imports
import { Card } from '@tremor/react';

// Features
import { BusinessSelectBox } from '@/features/businesses/components/BusinessSelectBox';
import { LocationsTable } from '@/features/locations';

export const DetailPage = () => {
    return (
        <Card className='mt-6'>
            <div className='max-w-lg'>
                <BusinessSelectBox />
            </div>
            <div className='mt-6'>
                <LocationsTable />
            </div>
        </Card>
    );
};
