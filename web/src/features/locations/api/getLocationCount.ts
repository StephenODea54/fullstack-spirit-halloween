// Module Imports
import { useQuery } from 'react-query';

// Utils
import { axios, type ExtractFnReturnType, type QueryConfig } from '@/lib';

// Types
type QueryFnType = typeof getLocationCount;

interface UseLocationCountOptions {
    config?: QueryConfig<QueryFnType>;
}

import { GetLocationCountsReturnType } from '../types';

export const getLocationCount = (): Promise<GetLocationCountsReturnType> => {
    return axios.get(`/api/locations/total`);
};

export const useLocationCount = ({ config }: UseLocationCountOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['locationCount'],
        queryFn: () => getLocationCount(),
        ...config,
    });
};
