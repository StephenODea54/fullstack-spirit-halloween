export interface GetLocationsReturnType {
    id: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    formerBusiness: string;
}

export interface GetLocationCountsReturnType {
    totalLocations: number;
}
