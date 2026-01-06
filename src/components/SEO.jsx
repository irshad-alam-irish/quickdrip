import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
    return (
        <Helmet>
            <title>{title} | Quickdrip</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
}
