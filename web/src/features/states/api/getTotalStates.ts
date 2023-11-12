// Module Imports
import { useQuery } from 'react-query';

// Utils
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

// Types
import { TotalStates } from '../types';

export const getTotalStates = (): Promise<TotalStates> => {
  return axios.get(`/api/states/total`);
};

type QueryFnType = typeof getTotalStates;

interface UseTotalStatesOptions {
  config?: QueryConfig<QueryFnType>;
};

export const useTotalStates = ({ config }: UseTotalStatesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['totalStates'],
    queryFn: () => getTotalStates(),
    ...config,
  });
};
