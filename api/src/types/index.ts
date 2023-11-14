// Module Imports
import type { Request } from 'express';

export interface FormerBusiness {
    id: string;
    formerBusiness: string;
    totalLocations: number;
}

export interface Location {
    id: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    formerBusiness: string;
}

export type TypedRequestQuery<TOutput, TInput> = Request<
    Record<string, never>,
    TOutput,
    Record<string, never>,
    TInput
>;
