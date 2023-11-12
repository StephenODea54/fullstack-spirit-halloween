import {useQuery} from 'react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

import {TotalLocations} from '../types';

export const getTotalLocations = (): Promise<TotalLocations> => {
    return axios.get(`/api/locations/total`);
};

type QueryFnType = typeof getTotalLocations;

interface UseTotalLocationsOptions {
    config?: QueryConfig<QueryFnType>;
}

export const useTotalLocations = ({config}: UseTotalLocationsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['totalLocations'],
        queryFn: () => getTotalLocations(),
        ...config,
    });
};
