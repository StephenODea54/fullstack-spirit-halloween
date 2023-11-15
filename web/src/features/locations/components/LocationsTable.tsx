// Module Imports
import { useState } from 'react';
import {
    type ColumnFiltersState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Button,
    Flex,
    Select,
    SelectItem,
    Subtitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
} from '@tremor/react';

// Features
import { BusinessSelectBox } from '@/features/businesses';

// Hooks
import { useLocations } from '../api';

// Components
import { LocationsColumns } from '../components';
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid';

// Constants
const PAGE_LIMITS = [10, 20, 30, 40, 50];

export const LocationsTable = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const { data, isError } = useLocations();

    const table = useReactTable({
        data: data || [],
        columns: LocationsColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            sorting,
        },
        autoResetPageIndex: false,
    });

    if (isError) {
        return <Subtitle>Error!</Subtitle>;
    } else if (data) {
        return (
            <>
                <div className='max-w-lg'>
                    <BusinessSelectBox table={table} />
                </div>
                <Table className='mt-6'>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, idx) => (
                                    <TableHeaderCell
                                        key={header.id}
                                        className={idx === 0 ? '' : 'text-right'}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHeaderCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell, idx) => (
                                    <TableCell key={cell.id} className={idx === 0 ? '' : 'text-right'}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Flex className='mt-6 md:flex-row space-y-6 md:space-y-0' flexDirection='col'>
                    <Flex className='max-w-[275px]'>
                        <Text className='w-full'>Rows per page: </Text>
                        <Select
                            enableClear={false}
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={value => table.setPageSize(parseInt(value))}>
                            {PAGE_LIMITS.map(pageSize => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </Select>
                    </Flex>
                    <Flex className='max-w-[200px]'>
                        <Button
                            disabled={!table.getCanPreviousPage()}
                            icon={ChevronDoubleLeftIcon}
                            onClick={() => table.setPageIndex(0)}
                            variant='light'
                        />
                        <Button
                            disabled={!table.getCanPreviousPage()}
                            icon={ChevronLeftIcon}
                            onClick={() => table.previousPage()}
                            variant='light'
                        />
                        <Button
                            disabled={!table.getCanNextPage()}
                            icon={ChevronRightIcon}
                            onClick={() => table.nextPage()}
                            variant='light'
                        />
                        <Button
                            disabled={!table.getCanNextPage()}
                            icon={ChevronDoubleRightIcon}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            variant='light'
                        />
                    </Flex>
                </Flex>
            </>
        );
    } else {
        return <></>;
    }
};
