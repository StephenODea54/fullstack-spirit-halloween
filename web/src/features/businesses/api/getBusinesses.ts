// Module Imports
import { useQuery } from 'react-query';

// Utils
import { axios, type ExtractFnReturnType, type QueryConfig } from '@/lib';

// Types
import type { GetBusinessResponseType } from '../types';

type QueryFnType = typeof getBusinesses;

interface UseBusinessesOptions {
    config?: QueryConfig<QueryFnType>;
}

export const getBusinesses = (): Promise<GetBusinessResponseType[]> => {
    return axios.get(`/api/businesses`);
};

export const useBusinesses = ({ config }: UseBusinessesOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['businesses'],
        queryFn: () => getBusinesses(),
        ...config,
    });
};
