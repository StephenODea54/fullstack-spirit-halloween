// Module Imports
import {useQuery} from 'react-query';

// Utils
import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

// Types
import type {MostFormerBusiness} from '../types';

export const getMostFormerBusiness = (): Promise<MostFormerBusiness> => {
    return axios.get(`/api/businesses/max`);
};

type QueryFnType = typeof getMostFormerBusiness;

interface UseMostFormerBusinessOptions {
    config?: QueryConfig<QueryFnType>;
}

export const useMostFormerBusiness = ({config}: UseMostFormerBusinessOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['mostFormerBusiness'],
        queryFn: () => getMostFormerBusiness(),
        ...config,
    });
};
