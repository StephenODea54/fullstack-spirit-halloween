// Module Imports
import {Text} from '@tremor/react';

// Components
import {DataTableColumnHeader} from '@/components/ui';

// Types
import type {ColumnDef} from '@tanstack/react-table';
import type {Location} from '../types';

export const LocationsColumns: ColumnDef<Location>[] = [
    {
        accessorKey: 'formerBusiness',
        header: ({column}) => {
            return <DataTableColumnHeader column={column}>Former Business</DataTableColumnHeader>;
        },
        cell: ({row}) => {
            return <Text>{row.getValue('formerBusiness')}</Text>;
        },
    },
    {
        accessorKey: 'city',
        header: ({column}) => {
            return <DataTableColumnHeader column={column}>City</DataTableColumnHeader>;
        },
        cell: ({row}) => {
            return <Text>{row.getValue('city')}</Text>;
        },
    },
    {
        accessorKey: 'state',
        header: ({column}) => {
            return <DataTableColumnHeader column={column}>State</DataTableColumnHeader>;
        },
        cell: ({row}) => {
            return <Text>{row.getValue('state')}</Text>;
        },
    },
    {
        accessorKey: 'zip',
        header: ({column}) => {
            return <DataTableColumnHeader column={column}>Zip</DataTableColumnHeader>;
        },
        cell: ({row}) => {
            return <Text>{row.getValue('zip')}</Text>;
        },
    },
    {
        accessorKey: 'address',
        header: ({column}) => {
            return <DataTableColumnHeader column={column}>Address</DataTableColumnHeader>;
        },
        cell: ({row}) => {
            return <Text>{row.getValue('address')}</Text>;
        },
    },
];
