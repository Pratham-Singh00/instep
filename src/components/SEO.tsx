import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export const SEO = ({
    title = "InStep PC - Mental Health Group Practice | Community Support & Therapy",
    description = "Walking in step with you on your journey. Comprehensive mental health services including individual therapy, group programs, reentry support, and domestic violence services.",
    image = "/og-image.jpg",
    url,
    type = "website",
}: SEOProps) => {
    const siteUrl = "https://insteppc.com";
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullTitle = title.includes("InStep") ? title : `${title} | InStep PC`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "InStep PC",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-703-865-9810",
            "contactType": "customer service",
            "areaServed": ["Fairfax", "Northern Virginia", "DC Metro Area"]
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "3930 Pender Dr, Suite 50",
            "addressLocality": "Fairfax",
            "addressRegion": "VA",
            "postalCode": "22030",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "38.868",
            "longitude": "-77.365"
        },
        "priceRange": "$$",
        "specialty": ["Mental Health", "Counselling", "Psychotherapy", "Group Therapy"]
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            < title > {fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet >
    );
};
