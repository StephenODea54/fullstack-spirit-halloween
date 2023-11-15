// Module Imports
import { Helmet } from 'react-helmet-async';

// Types
interface HeadProps {
    title: string;
    description: string;
}

export const Head = ({ title, description }: HeadProps) => {
    return (
        <Helmet title={title}>
            <meta name='description' content={description} />
        </Helmet>
    );
};
