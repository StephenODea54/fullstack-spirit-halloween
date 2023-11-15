// Module Imports
import type { ColumnDef } from '@tanstack/react-table';
import { Text } from '@tremor/react';

// Components
import { LocationColumnHeader } from './LocationColumnHeader';

// Types
import type { GetLocationCountsReturnType } from '../types';

export const LocationsColumns: ColumnDef<GetLocationCountsReturnType>[] = [
    {
        accessorKey: 'formerBusiness',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>Former Business</LocationColumnHeader>;
        },
        cell: ({ row }) => {
            return <Text>{row.getValue('formerBusiness')}</Text>;
        },
    },
    {
        accessorKey: 'city',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>City</LocationColumnHeader>;
        },
        cell: ({ row }) => {
            return <Text>{row.getValue('city')}</Text>;
        },
    },
    {
        accessorKey: 'state',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>State</LocationColumnHeader>;
        },
        cell: ({ row }) => {
            return <Text>{row.getValue('state')}</Text>;
        },
    },
    {
        accessorKey: 'zip',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>Zip</LocationColumnHeader>;
        },
        cell: ({ row }) => {
            return <Text>{row.getValue('zip')}</Text>;
        },
    },
    {
        accessorKey: 'address',
        header: ({ column }) => {
            return <LocationColumnHeader column={column}>Address</LocationColumnHeader>;
        },
        cell: ({ row }) => {
            return <Text>{row.getValue('address')}</Text>;
        },
    },
];
