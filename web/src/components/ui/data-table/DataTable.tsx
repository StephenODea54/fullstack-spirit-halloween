// Module Imports
import {useState} from 'react';
import {
    flexRender,
    getPaginationRowModel,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';
import {Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from '@tremor/react';

// Components
import {DataTableFooter} from '.';

// Types
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export const DataTable = <TData, TValue>({columns, data}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        autoResetPageIndex: false,
    });

    return (
        <>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, idx) => (
                                <TableHeaderCell key={header.id} className={idx === 0 ? '' : 'text-right'}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell, idx) => (
                                    <TableCell key={cell.id} className={idx === 0 ? '' : 'text-right'}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>No Results</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTableFooter table={table} />
        </>
    );
};
