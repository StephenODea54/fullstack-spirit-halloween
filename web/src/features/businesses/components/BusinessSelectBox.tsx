// Module Imports
import type { Table } from '@tanstack/react-table';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

// Hooks
import { useBusinesses } from '../api';

// Types
interface BusinessSelectBoxProps<TData> {
    table: Table<TData>;
}

export const BusinessSelectBox = <TData,>({ table }: BusinessSelectBoxProps<TData>) => {
    const { data, isError } = useBusinesses();

    if (isError) return <p>Error!</p>;

    if (data) {
        return (
            <SearchSelect
                placeholder='Search for businesses...'
                value={table.getColumn('formerBusiness')?.getFilterValue() as string || ''}
                onValueChange={value => table.getColumn('formerBusiness')?.setFilterValue(value)}
            >
                {data &&
                    data.map((business: { id: string; formerBusiness: string | undefined }) => (
                        <SearchSelectItem key={business.id} value={business.formerBusiness || ''}>
                            {business.formerBusiness}
                        </SearchSelectItem>
                    ))}
            </SearchSelect>
        );
    }
};
