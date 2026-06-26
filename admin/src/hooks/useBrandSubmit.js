import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { SidebarContext } from "@/context/SidebarContext";
import BrandServices from "@/services/BrandServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useBrandSubmit = (id) => {
  const [status, setStatus] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const brandData = {
        ...data,
        status: status ? "show" : "hide",
        featured,
        sortOrder: Number(data.sortOrder) || 0,
      };

      if (id) {
        const res = await BrandServices.updateBrand(id, brandData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await BrandServices.addBrand(brandData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err?.response?.data?.message || err?.message);
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("slug");
      setValue("logo");
      setValue("description");
      setValue("country");
      setValue("website");
      setValue("sortOrder");
      setStatus(true);
      setFeatured(false);
      clearErrors("name");
      clearErrors("slug");
      clearErrors("logo");
      clearErrors("description");
      clearErrors("country");
      clearErrors("website");
      return;
    }

    if (id) {
      (async () => {
        try {
          const res = await BrandServices.getBrandById(id);
          if (res) {
            setValue("name", res.name || "");
            setValue("slug", res.slug || "");
            setValue("logo", res.logo || "");
            setValue("description", res.description || "");
            setValue("country", res.country || "");
            setValue("website", res.website || "");
            setValue("sortOrder", res.sortOrder ?? 0);
            setStatus(res.status === "show");
            setFeatured(Boolean(res.featured));
          }
        } catch (err) {
          notifyError(err?.response?.data?.message || err?.message);
        }
      })();
    }
  }, [clearErrors, id, isDrawerOpen, setValue]);

  return {
    errors,
    onSubmit,
    register,
    status,
    setStatus,
    featured,
    setFeatured,
    isSubmitting,
    handleSubmit,
  };
};

export default useBrandSubmit;
