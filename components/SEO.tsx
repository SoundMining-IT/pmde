// components/SeoMeta.tsx
import Head from "next/head";
import { useRouter } from "next/router";

interface SeoMetaProps {
  title: string; // Page-specific title
  description: string; // Page-specific description
  ogImage?: string; // URL for the Open Graph image (absolute URL preferred)
  ogImageAlt?: string; // Alt text for the OG image
  ogTitle?: string;
  ogDescription?: string;
  siteName?: string; // Your website's name
  twitterHandle?: string;
  favicon?: string;
}

const SeoMeta: React.FC<SeoMetaProps> = ({
  title,
  description,
  ogImage,
  ogImageAlt,
  ogTitle,
  ogDescription,
  siteName = "PMDE", // Set a sensible default for your site
  twitterHandle,
  favicon = "/images/PMDEIcon.svg", // Update default if using the favicons folder
}) => {
  const router = useRouter();

  const siteBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://pmde-site.netlify.app/";
  const canonicalUrl = `${siteBaseUrl}${
    router.asPath === "/" ? "" : router.asPath
  }`.split("?")[0];

  // --- Construct the full page title ---
  const pageTitleWithSite = siteName ? `${title} | ${siteName}` : title;

  // Use specific OG title if provided, otherwise use the combined page title
  const effectiveOgTitle = ogTitle || pageTitleWithSite;
  const effectiveOgDescription = ogDescription || description;

  // --- Absolute OG Image URL logic (Revised) ---
  let absoluteOgImageUrl = ogImage;
  if (ogImage && !ogImage.startsWith("http")) {
    // Only construct if ogImage is provided and relative
    console.warn(
      "SeoMeta: ogImage URL should be relative or absolute. Constructing absolute URL from relative path.",
      ogImage
    );

    // 1. Ensure siteBaseUrl does NOT end with a slash
    const base = siteBaseUrl.endsWith("/")
      ? siteBaseUrl.slice(0, -1)
      : siteBaseUrl;

    // 2. Ensure ogImage path starts WITH a slash
    const path = ogImage.startsWith("/") ? ogImage : `/${ogImage}`;

    // 3. Combine them
    absoluteOgImageUrl = base + path;
  } else if (ogImage) {
    // If ogImage is already absolute, use it directly
    absoluteOgImageUrl = ogImage;
  } else {
    // If ogImage is not provided at all
    absoluteOgImageUrl = undefined; // Or set a default absolute fallback image URL if desired
  }
  // --- End Revised OG Image Logic ---

  const twitterCardType = absoluteOgImageUrl
    ? "summary_large_image"
    : "summary"; // Check absoluteOgImageUrl

  return (
    <Head>
      {/* --- Standard SEO --- */}
      {/* --- Use the combined title here --- */}
      <title>{pageTitleWithSite}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href={favicon} />

      {/* --- Open Graph --- */}
      {/* Use effectiveOgTitle which defaults to pageTitleWithSite */}
      <meta property="og:title" content={effectiveOgTitle} />
      <meta property="og:description" content={effectiveOgDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {/* siteName is used directly here for og:site_name */}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {absoluteOgImageUrl && ( // Check if we have a valid URL after processing
        <meta property="og:image" content={absoluteOgImageUrl} />
      )}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}

      {/* --- Twitter Card --- */}
      <meta name="twitter:card" content={twitterCardType} />
      {/* Use effectiveOgTitle which defaults to pageTitleWithSite */}
      <meta name="twitter:title" content={effectiveOgTitle} />
      <meta name="twitter:description" content={effectiveOgDescription} />
      {absoluteOgImageUrl && ( // Check if we have a valid URL after processing
        <meta name="twitter:image" content={absoluteOgImageUrl} />
      )}
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
    </Head>
  );
};

export default SeoMeta;
