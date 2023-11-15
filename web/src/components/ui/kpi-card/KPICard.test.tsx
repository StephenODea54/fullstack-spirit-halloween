// Module Imports
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

// Component
import { KPICard } from '.';

// Constants
const TITLE = 'Unit Testing the KPI Card';
const METRIC = 10;

describe('<KPICard />', () => {
    afterEach(() => {
        cleanup();
    });

    it('KPI Card should correctly display title and metric props', () => {
        render(<KPICard title={TITLE} metric={METRIC} />);

        const titleElement = screen.queryByText('Unit Testing the KPI Card');
        const metricElement = screen.queryByText('10');

        expect(titleElement).not.toBeNull();
        expect(metricElement).not.toBeNull();
    });
});
