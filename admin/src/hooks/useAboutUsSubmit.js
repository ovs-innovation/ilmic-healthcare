import { useEffect, useState } from "react";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const defaultAboutUsState = {
  header_bg: "/about-banner.jpg",
  founder_one_img: "/maroof.jpeg",
  content_right_img: "/maroof.jpeg",
  content_middle_Img: "/about-pharma.png",
  startup_india_cert: "/img3.jpeg",
  startup_india_thumb: "/img2.jpeg",
  udyam_cert: "/img1.jpeg",
};

const useAboutUsSubmit = () => {
  const [aboutUs, setAboutUs] = useState(defaultAboutUsState);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getStoreCustomizationSetting();
        if (res && res.about_us) {
          setAboutUs((prev) => ({
            ...prev,
            ...res.about_us,
            founder_one_img: res.about_us.founder_one_img || res.about_us.content_right_img || prev.founder_one_img,
            content_right_img: res.about_us.content_right_img || res.about_us.founder_one_img || prev.content_right_img,
          }));
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err?.message || "Failed to load About Us settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateAboutUsImage = (field, value) => {
    setAboutUs((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      if (field === "founder_one_img") {
        updated.content_right_img = value;
      } else if (field === "content_right_img") {
        updated.founder_one_img = value;
      }
      return updated;
    });
  };

  const onSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await SettingServices.updateStoreCustomizationSetting({
        setting: {
          about_us: aboutUs,
        },
      });
      notifySuccess(res?.message || "About Us settings updated successfully!");
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to save settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    aboutUs,
    loading,
    isSubmitting,
    updateAboutUsImage,
    onSubmit,
  };
};

export default useAboutUsSubmit;
