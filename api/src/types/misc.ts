// Module Imports
import type { Request } from 'express';

export type TypedRequestQuery<TOutput, TInput> = Request<
    Record<string, never>,
    TOutput,
    Record<string, never>,
    TInput
>;
