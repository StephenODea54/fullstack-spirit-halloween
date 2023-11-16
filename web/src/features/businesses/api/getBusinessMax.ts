// Module Imports
import { useQuery } from 'react-query';

// Utils
import { axios, type ExtractFnReturnType, type QueryConfig } from '@/lib';

// Types
import type { GetBusinessMaxResponseType } from '../types';

type QueryFnType = typeof getBusinessMax;

interface UseBusinessMaxOptions {
    config?: QueryConfig<QueryFnType>;
}

export const getBusinessMax = (): Promise<GetBusinessMaxResponseType> => {
    return axios.get(`/api/businesses/max`);
};

export const useBusinessMax = ({ config }: UseBusinessMaxOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['businessMax'],
        queryFn: () => getBusinessMax(),
        ...config,
    });
};
