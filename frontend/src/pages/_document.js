import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Default SEO settings - API call removed to prevent blocking errors
    const setting = {
      favicon: "/favicon.png",
      meta_title: "ILMIC Health Care Pvt. Ltd. – Oncology, Pharma & Surgical",
      meta_description:
        "ILMIC Health Care Pvt. Ltd. — Oncology, General Pharma & Surgical products. Exporter and supplier with offices in Delhi (India) and Luanda (Angola).",
      meta_keywords:
        "ILMIC, ILMIC Health Care, oncology medicines, general pharma, surgical products, pharmaceutical exporter, hospital supplies",
      meta_url: "https://ilmichealthcare.com/",
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
          <link
            rel="preload"
            href="/preloader/preloadervideo.mp4"
            as="fetch"
            type="video/mp4"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <meta
            property="og:title"
            content={
              setting?.meta_title ||
              "ILMIC Health Care Pvt. Ltd. – Oncology, Pharma & Surgical"
            }
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content={
              setting?.meta_description ||
              "ILMIC Health Care Pvt. Ltd. — Oncology, General Pharma & Surgical products."
            }
          />
          <meta
            name="keywords"
            content={setting?.meta_keywords || "ecommenrce online store"}
          />
          <meta
            property="og:url"
            content={
              setting?.meta_url || "https://ilmichealthcare.com/"
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
