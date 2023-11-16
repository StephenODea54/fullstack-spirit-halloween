// Module Imports
import type { ColumnDef } from '@tanstack/react-table';

// Components
import { LocationColumnHeader } from './LocationColumnHeader';

// Types
import type { GetLocationsReturnType } from '../types';

export const LocationsColumns: ColumnDef<GetLocationsReturnType>[] = [
    {
        accessorKey: 'formerBusiness',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>Former Business</LocationColumnHeader>;
        },
    },
    {
        accessorKey: 'city',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>City</LocationColumnHeader>;
        },
    },
    {
        accessorKey: 'state',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>State</LocationColumnHeader>;
        },
    },
    {
        accessorKey: 'zip',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>Zip</LocationColumnHeader>;
        },
    },
    {
        accessorKey: 'address',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>Address</LocationColumnHeader>;
        },
    },
];
