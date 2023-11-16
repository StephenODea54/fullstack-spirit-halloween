// Module Imports
import { useQuery } from 'react-query';

// Utils
import { axios, type ExtractFnReturnType, type QueryConfig } from '@/lib';

// Types
import { GetLocationsReturnType } from '../types';

type QueryFnType = typeof getLocations;

interface UseLocationsOptions {
    config?: QueryConfig<QueryFnType>;
}

export const getLocations = (): Promise<GetLocationsReturnType[]> => {
    return axios.get(`/api/locations`);
};

export const useLocations = ({ config }: UseLocationsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['locations'],
        queryFn: () => getLocations(),
        ...config,
    });
};
