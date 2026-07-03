import AnimatedContent from "@/components/common/AnimatedContent";
import Faq from "@/components/store-home/Faq";
import PageTitle from "@/components/Typography/PageTitle";
import useStoreHomeSubmit from "@/hooks/useStoreHomeSubmit";

const FaqSettings = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSave,
    faqStatus,
    setFaqStatus,
    faqHeaderBg,
    setFaqHeaderBg,
    faqLeftColImage,
    setFaqLeftColImage,
    faqLeftColStatus,
    setFaqLeftColStatus,
    faqRightColStatus,
    setFaqRightColStatus,
    isSubmitting,
  } = useStoreHomeSubmit();

  return (
    <>
      <PageTitle>FAQ</PageTitle>
      <AnimatedContent>
        <div className="sm:container md:p-6 p-4 mx-auto w-full bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Faq
              isSave={isSave}
              errors={errors}
              register={register}
              setFaqStatus={setFaqStatus}
              faqStatus={faqStatus}
              setFaqHeaderBg={setFaqHeaderBg}
              faqHeaderBg={faqHeaderBg}
              setFaqLeftColImage={setFaqLeftColImage}
              faqLeftColImage={faqLeftColImage}
              setFaqLeftColStatus={setFaqLeftColStatus}
              faqLeftColStatus={faqLeftColStatus}
              setFaqRightColStatus={setFaqRightColStatus}
              faqRightColStatus={faqRightColStatus}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </AnimatedContent>
    </>
  );
};

export default FaqSettings;
