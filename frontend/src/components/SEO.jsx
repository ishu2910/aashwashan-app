import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords,
  url,
  image = "https://res.cloudinary.com/qqjn11uq/image/upload/v1784209957/logo_h9mmmb.jpg",
}) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {keywords && (
        <meta name="keywords" content={keywords} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />

<meta property="og:site_name" content="Aashwashan" />
<meta property="og:locale" content="en_IN" />

<meta name="robots" content="index, follow" />

<link rel="canonical" href={url} />
    </Helmet>
  );
}