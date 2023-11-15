export interface GetBusinessReturnType {
    id: string;
    formerBusiness: string;
}

export interface GetBusinessCountsReturnType {
    id: string;
    formerBusiness: string;
    totalLocations: number;
}

export type GetBusinessMaxReturnType = Omit<GetBusinessCountsReturnType, 'id'>;
