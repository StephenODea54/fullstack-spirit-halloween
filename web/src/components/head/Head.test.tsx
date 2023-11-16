// Module Imports
import { HelmetProvider } from 'react-helmet-async';
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

// Component
import { Head } from './Head';

// Constants
const TITLE = 'This is a title';
const DESCRIPTION = 'This is a description';

describe('<Head />', () => {
    afterEach(() => {
        cleanup();
    });

    it('Head component should add proper page title and meta description', async () => {
        render(
            <HelmetProvider>
                <Head title={TITLE} description={DESCRIPTION} />
            </HelmetProvider>,
        );
        await waitFor(() => expect(document.title).toEqual(TITLE));

        const metaDescription = document.querySelector("meta[name='description']");

        expect(metaDescription?.getAttribute('content')).toEqual(DESCRIPTION);
    });
});
