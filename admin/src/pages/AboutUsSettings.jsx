import React from "react";
import { Button, Card, CardBody } from "@windmill/react-ui";
import PageTitle from "@/components/Typography/PageTitle";
import Loading from "@/components/preloader/Loading";
import Uploader from "@/components/image-uploader/Uploader";
import useAboutUsSubmit from "@/hooks/useAboutUsSubmit";

const ImageCard = ({ title, description, imageUrl, setImageUrl, targetWidth = 800, targetHeight = 800 }) => (
  <Card className="mb-6 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
    <CardBody className="p-5 md:p-6">
      <div className="mb-4">
        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 mb-1">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <Uploader
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        folder="about"
        targetWidth={targetWidth}
        targetHeight={targetHeight}
      />
    </CardBody>
  </Card>
);

const AboutUsSettings = () => {
  const { aboutUs, loading, isSubmitting, updateAboutUsImage, onSubmit } =
    useAboutUsSubmit();

  if (loading || !aboutUs) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <PageTitle>About Us Page Images</PageTitle>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 -mt-4">
        Manage images displayed across all sections of the live About Us page. Updates take effect immediately after saving.
      </p>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            title="1. Managing Director Photo"
            description="Used in both 'Company Profile' (Section 2) and 'Board of Management' (Section 7)."
            imageUrl={aboutUs.founder_one_img}
            setImageUrl={(val) => updateAboutUsImage("founder_one_img", val)}
            targetWidth={600}
            targetHeight={800}
          />

          <ImageCard
            title="2. Warehouse / Facility Photo"
            description="Used in 'One of India's Fastest-Growing Healthcare Entities' (Section 5)."
            imageUrl={aboutUs.content_middle_Img}
            setImageUrl={(val) => updateAboutUsImage("content_middle_Img", val)}
            targetWidth={800}
            targetHeight={600}
          />

          <ImageCard
            title="3. Startup India Recognition Certificate (Full Document)"
            description="Main certificate image preview (Section 11.5) and Lightbox modal view."
            imageUrl={aboutUs.startup_india_cert}
            setImageUrl={(val) => updateAboutUsImage("startup_india_cert", val)}
            targetWidth={1000}
            targetHeight={1414}
          />

          <ImageCard
            title="4. Startup India Recognition Certificate (Grid Thumbnail)"
            description="Thumbnail image card shown in 'Certifications & Recognitions' grid (Section 9)."
            imageUrl={aboutUs.startup_india_thumb}
            setImageUrl={(val) => updateAboutUsImage("startup_india_thumb", val)}
            targetWidth={800}
            targetHeight={600}
          />

          <ImageCard
            title="5. Udyam Registration Certificate (Grid Thumbnail)"
            description="Thumbnail image card shown in 'Certifications & Recognitions' grid (Section 9)."
            imageUrl={aboutUs.udyam_cert}
            setImageUrl={(val) => updateAboutUsImage("udyam_cert", val)}
            targetWidth={800}
            targetHeight={600}
          />

          <ImageCard
            title="6. About Us Hero Banner Background"
            description="Top Hero section background image behind header text (Section 1)."
            imageUrl={aboutUs.header_bg}
            setImageUrl={(val) => updateAboutUsImage("header_bg", val)}
            targetWidth={1600}
            targetHeight={900}
          />
        </div>

        <div className="flex justify-end mt-4 mb-10">
          <Button type="submit" disabled={isSubmitting} className="h-12 px-8 font-bold text-sm">
            {isSubmitting ? "Saving Changes..." : "Save About Us Changes"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AboutUsSettings;
