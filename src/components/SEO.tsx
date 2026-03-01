import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    noindex?: boolean;
    author?: string;
    datePublished?: string;
    dateModified?: string;
}

export const SEO = ({
    title = "InStep PC - Mental Health Group Practice | Community Support & Therapy",
    description = "Walking in step with you on your journey. Comprehensive mental health services including individual therapy, group programs, reentry support, and domestic violence services.",
    image,
    url,
    type = "website",
    noindex = false,
    author,
    datePublished,
    dateModified,
}: SEOProps) => {
    const siteUrl = "https://insteppc.com";
    const normalizedPath = url?.startsWith("/") ? url : url ? `/${url}` : "";
    const fullUrl = normalizedPath ? `${siteUrl}${normalizedPath}` : siteUrl;
    const fullTitle = title.includes("InStep") ? title : `${title} | InStep PC`;
    const defaultImage = `${siteUrl}/wp-content/themes/instep-community-connect/assets/logo.png`;
    const fullImage = image
        ? image.startsWith("http")
            ? image
            : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
        : defaultImage;

    // Generate appropriate schema based on content type
    const jsonLd = type === "article" && datePublished
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "image": fullImage,
            "author": {
                "@type": author === "In Step Team" || author === "In Step PC Team" || !author ? "Organization" : "Person",
                "name": author || "InStep PC",
            },
            "publisher": {
                "@type": "Organization",
                "name": "InStep PC",
                "logo": {
                    "@type": "ImageObject",
                    "url": defaultImage
                }
            },
            "url": fullUrl,
            "datePublished": datePublished,
            "dateModified": dateModified || datePublished,
            "description": description,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": fullUrl
            }
        }
        : {
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "InStep PC",
            "url": siteUrl,
            "logo": defaultImage,
            "image": fullImage,
            "email": "admin@insteppc.com",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-703-876-8480",
                "contactType": "customer support",
                "areaServed": ["Fairfax", "Northern Virginia", "DC Metro Area"]
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "8500 Executive Park Avenue, Suite 204",
                "addressLocality": "Fairfax",
                "addressRegion": "VA",
                "postalCode": "22031",
                "addressCountry": "US"
            },
            "sameAs": ["https://www.facebook.com/Insteppc/"],
            "priceRange": "$$",
            "specialty": ["Mental Health", "Counselling", "Psychotherapy", "Group Therapy"]
        };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="InStep PC" />
            <meta property="og:locale" content="en_US" />
            {type === "article" && datePublished && (
                <>
                    <meta property="article:published_time" content={datePublished} />
                    {dateModified && <meta property="article:modified_time" content={dateModified} />}
                    {author && <meta property="article:author" content={author} />}
                </>
            )}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Structured Data */}
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet >
    );
};
