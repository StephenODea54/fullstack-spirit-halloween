// Module Imports
import { Card } from '@tremor/react';

// Features
import { LocationsTable } from '@/features/locations';

export const DetailPage = () => {
    return (
        <Card className='mt-6'>
            <div className='mt-6'>
                <LocationsTable />
            </div>
        </Card>
    );
};
