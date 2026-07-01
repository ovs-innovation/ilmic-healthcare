import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Default SEO settings - API call removed to prevent blocking errors
    const setting = {
      favicon: "/favicon.png",
      meta_title: "Kure Pharma – Trusted Pharmaceutical Distributor",
      meta_description: "Quality medicines and pharmaceutical sourcing across India",
      meta_keywords: "pharma medicines oncology critical care kure pharma",
      meta_url: "https://kurepharma.com/",
      meta_img: "/favicon.png",
    };

    return { ...initialProps, setting };
  }

  render() {
    const setting = this.props.setting;
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={setting?.favicon || "/favicon.png"} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap" rel="stylesheet" />
          <meta
            property="og:title"
            content={
              setting?.meta_title ||
              "Kure Pharma – Trusted Pharmaceutical Distributor"
            }
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content={
              setting?.meta_description ||
              "Quality medicines and pharmaceutical sourcing across India"
            }
          />
          <meta
            name="keywords"
            content={setting?.meta_keywords || "ecommenrce online store"}
          />
          <meta
            property="og:url"
            content={
              setting?.meta_url || "https://kurepharma.com/"
            }
          />
          <meta
            property="og:image"
            content={
              setting?.meta_img ||
              "/favicon.png"
              // "https://res.cloudinary.com/dhqcwkpzp/image/upload/v1750844959/download_wfxk5k.webp"
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
