export interface GetBusinessResponseType {
    id: string;
    formerBusiness: string;
}

export interface GetBusinessMaxResponseType {
    formerBusiness: string;
    totalLocations: number;
}

export interface GetBusinessCountsReturnType {
    id: string;
    formerBusiness: string;
    totalLocations: number;
}
