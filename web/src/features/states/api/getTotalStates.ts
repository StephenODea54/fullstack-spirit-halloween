// Module Imports
import {useQuery} from 'react-query';

// Utils
import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

// Types
import {GetStateCountReturnType} from '../types';

export const getStateCount = (): Promise<GetStateCountReturnType> => {
    return axios.get(`/api/states/total`);
};

type QueryFnType = typeof getStateCount;

interface UseStateCountOptions {
    config?: QueryConfig<QueryFnType>;
}

export const useStateCount = ({config}: UseStateCountOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['stateCount'],
        queryFn: () => getStateCount(),
        ...config,
    });
};
