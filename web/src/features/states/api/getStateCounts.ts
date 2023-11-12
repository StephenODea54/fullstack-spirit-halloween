// Module Imports
import {useQuery} from 'react-query';

// Utils
import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

// Types
import type {TotalStates} from '../types';

export const getStateCounts = ({
    limit,
    sort,
}: {
    limit: number;
    sort: 'ASC' | 'DESC';
}): Promise<TotalStates[]> => {
    return axios.get(`/api/states/counts`, {
        params: {
            limit: limit,
            sort: sort,
        },
    });
};

type QueryFnType = typeof getStateCounts;

type UseStateCountsOptions = {
    config?: QueryConfig<QueryFnType>;
    limit: number;
    sort: 'ASC' | 'DESC';
};

export const useStateCounts = ({ config = {}, limit, sort }: UseStateCountsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['stateCounts', limit, sort],
        queryFn: () => getStateCounts({ limit, sort }),
        ...config,
    });
};
