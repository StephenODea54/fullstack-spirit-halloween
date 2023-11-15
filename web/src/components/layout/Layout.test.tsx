// Module Imports
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

// Component
import { Layout } from '.';

describe('<Layout />', () => {
    afterEach(() => {
        cleanup();
    });

    it('Layout component should render successfully', () => {
        expect(() => {
            render(
                <Layout>
                    Hello, World!
                </Layout>
            );
        }).not.toThrow();
    });
});
