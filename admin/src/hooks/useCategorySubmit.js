import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import CategoryServices from "@/services/CategoryServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useImageUploadContext } from "@/context/ImageUploadContext";

const useCategorySubmit = (id, data, mode = "child", defaultParentId = "") => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState([]);
  const [language, setLanguage] = useState("en");
  const [published, setPublished] = useState(true);
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isUploading } = useImageUploadContext();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  // console.log("lang", lang, language);

  // console.log("resData", resData);

  const buildLocalizedField = (value, language, existing) => {
    const base =
      existing && typeof existing === "object" && !Array.isArray(existing)
        ? { ...existing }
        : {};

    base[language] = value ? value : "";
    return base;
  };

  const onSubmit = async ({ name, description }) => {
    try {
      if (isUploading) {
        notifyError("Please wait for image uploads to finish.");
        return;
      }

      if (!id && mode === "child" && !checked) {
        notifyError("Please select a parent category first.");
        return;
      }

      setIsSubmitting(true);

      const isParentCategory = mode === "parent";

      const categoryData = {
        name: buildLocalizedField(name, language, id ? resData?.name : undefined),
        description: buildLocalizedField(
          description,
          language,
          id ? resData?.description : undefined
        ),
        parentId: isParentCategory || !checked ? undefined : checked,
        parentName: isParentCategory
          ? undefined
          : selectCategoryName || undefined,
        icon: imageUrl,
        status: published ? "show" : "hide",
        lang: language,
      };

      // console.log("category submit", categoryData);
      // setIsSubmitting(false);
      // return;

      if (id) {
        const res = await CategoryServices.updateCategory(id, categoryData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await CategoryServices.addCategory(categoryData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("parentId");
      setValue("parentName");
      setValue("description");
      setValue("icon");
      setImageUrl("");
      setPublished(true);
      clearErrors("name");
      clearErrors("parentId");
      clearErrors("parentName");
      clearErrors("description");
      setSelectCategoryName("");
      setLanguage(lang);
      setValue("language", language);
      setChecked("");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await CategoryServices.getCategoryById(id);
          // console.log("res category", res);

          if (res) {
            setResData(res);
            setValue("name", res.name[language ? language : "en"]);
            setValue(
              "description",
              res.description[language ? language : "en"]
            );
            setValue("language", language);
            setValue("parentId", res.parentId);
            setValue("parentName", res.parentName);
            setSelectCategoryName(res.parentName || "Home");
            setChecked(res.parentId || "");
            setImageUrl(res.icon);
            setPublished(res.status === "show" ? true : false);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
      return;
    }

    setChecked("");
    setSelectCategoryName("");
    setValue("name", "");
    setValue("description", "");

    if (mode === "child" && defaultParentId && Array.isArray(data)) {
      const selectedParent = data.find((cat) => cat._id === defaultParentId);
      if (selectedParent) {
        setChecked(defaultParentId);
        const label =
          selectedParent.name?.[lang] ||
          selectedParent.name?.en ||
          Object.values(selectedParent.name || {})[0] ||
          "";
        setSelectCategoryName(label);
      }
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, data, lang, mode, defaultParentId]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
    published,
    setPublished,
    checked,
    setChecked,
    isSubmitting,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
  };
};

export default useCategorySubmit;
