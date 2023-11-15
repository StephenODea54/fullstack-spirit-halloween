// Module Imports
import {useQuery} from 'react-query';

// Utils
import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

// Types
import type {GetBusinessMaxResponseType} from '../types';

export const getBusinessMax = (): Promise<GetBusinessMaxResponseType> => {
    return axios.get(`/api/businesses/max`);
};

type QueryFnType = typeof getBusinessMax;

interface UseBusinessMaxOptions {
    config?: QueryConfig<QueryFnType>;
}

export const useBusinessMax = ({config}: UseBusinessMaxOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['businessMax'],
        queryFn: () => getBusinessMax(),
        ...config,
    });
};
