// Module Imports
import { useState } from 'react';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

// Hooks
import { useBusinesses } from '../api';

export const BusinessSelectBox = () => {
    const [business, setBusiness] = useState('');

    const { data, isError } = useBusinesses();

    if (isError) return <p>Error!</p>;

    if (data) {
        return (
            <SearchSelect placeholder='Search for businesses...' value={business} onValueChange={setBusiness}>
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
