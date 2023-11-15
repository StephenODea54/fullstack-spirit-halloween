import {useQuery} from 'react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

import {GetLocationCountsReturnType} from '../types';

export const getLocationCount = (): Promise<GetLocationCountsReturnType> => {
    return axios.get(`/api/locations/total`);
};

type QueryFnType = typeof getLocationCount;

interface UseLocationCountOptions {
    config?: QueryConfig<QueryFnType>;
}

export const useLocationCount = ({config}: UseLocationCountOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['locationCount'],
        queryFn: () => getLocationCount(),
        ...config,
    });
};
