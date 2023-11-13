// Module Imports
import {useQuery} from 'react-query';

// Utils
import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

// Types
import type {TotalFormerBusinesses} from '../types';

export const getFormerBusinessCounts = ({
    limit,
    sort,
}: {
    limit: number;
    sort: 'ASC' | 'DESC';
}): Promise<TotalFormerBusinesses[]> => {
    return axios.get(`/api/businesses/counts`, {
        params: {   
            limit: limit,
            sort: sort,
        },
    });
};

type QueryFnType = typeof getFormerBusinessCounts;

type UseFormerBusinessCountsOptions = {
    config?: QueryConfig<QueryFnType>;
    limit: number;
    sort: 'ASC' | 'DESC';
};

export const useFormerBusinessCounts = ({ config = {}, limit, sort }: UseFormerBusinessCountsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['formerBusinessCounts', limit, sort],
        queryFn: () => getFormerBusinessCounts({ limit, sort }),
        ...config,
    });
};
