// Module Imports
import {useQuery} from 'react-query';

// Utils
import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

// Types
import type {GetBusinessResponseType} from '../types';

export const getBusinesses = (): Promise<GetBusinessResponseType[]> => {
    return axios.get(`/api/businesses`);
};

type QueryFnType = typeof getBusinesses;

interface UseBusinessesOptions {
    config?: QueryConfig<QueryFnType>;
}

export const useBusinesses = ({config}: UseBusinessesOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['businesses'],
        queryFn: () => getBusinesses(),
        ...config,
    });
};
