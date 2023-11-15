// Module Imports
import { useQuery } from 'react-query';

// Utils
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

// Types
import type { GetBusinessCountsReturnType } from '../types';

export const getBusinessCounts = ({
    limit,
    sort,
}: {
    limit: number;
    sort: 'ASC' | 'DESC';
}): Promise<GetBusinessCountsReturnType[]> => {
    return axios.get(`/api/businesses/counts`, {
        params: {
            limit: limit,
            sort: sort,
        },
    });
};

type QueryFnType = typeof getBusinessCounts;

type UseBusinessCountsOptions = {
    config?: QueryConfig<QueryFnType>;
    limit: number;
    sort: 'ASC' | 'DESC';
};

export const useBusinessCounts = ({ config = {}, limit, sort }: UseBusinessCountsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['businessCounts', limit, sort],
        queryFn: () => getBusinessCounts({ limit, sort }),
        ...config,
    });
};