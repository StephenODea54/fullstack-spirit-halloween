export interface Location {
    id: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    formerBusiness: string;
}

export interface State {
    id: string;
    state: string;
    totalLocations: number;
}
