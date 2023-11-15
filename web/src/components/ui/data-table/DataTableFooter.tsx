// Module Imports
import { useState } from 'react';
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Button, Flex, Select, SelectItem, Text } from '@tremor/react';
import type { Table } from '@tanstack/react-table';

// Types
interface DataTableFooterProps<TData> {
    pageLimits?: number[];
    table: Table<TData>;
}

export const DataTableFooter = <TData,>({
    pageLimits = [10, 20, 30, 40, 50],
    table,
}: DataTableFooterProps<TData>) => {
    return (
        <Flex className='mt-6'>
            <Flex className='max-w-[275px]'>
                <Text className='w-full'>Rows per page: </Text>
                <Select
                    enableClear={false}
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={value => table.setPageSize(parseInt(value))}>
                    {pageLimits.map(pageSize => (
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
    );
};
