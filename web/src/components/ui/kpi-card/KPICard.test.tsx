// Module Imports
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

// Component
import { KPICard } from '.';

describe('<KPICard />', () => {
    afterEach(() => {
        cleanup();
    });

    it('KPI Card should correctly display title and metric props', () => {
        const title = 'Unit Testing the KPI Card';
        const metric = 10;

        render(<KPICard title={title} metric={metric} />);

        const titleElement = screen.queryByText('Unit Testing the KPI Card');
        const metricElement = screen.queryByText('10');

        expect(titleElement).not.toBeNull();
        expect(metricElement).not.toBeNull();
    });
});
