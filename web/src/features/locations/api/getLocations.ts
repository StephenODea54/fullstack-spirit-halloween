import {useQuery} from 'react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

import {Location} from '../types';

export const getLocations = (): Promise<Location[]> => {
    return axios.get(`/api/locations`);
};

type QueryFnType = typeof getLocations;

interface UseLocationsOptions {
    config?: QueryConfig<QueryFnType>;
}

export const useLocations = ({config}: UseLocationsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['locations'],
        queryFn: () => getLocations(),
        ...config,
    });
};
