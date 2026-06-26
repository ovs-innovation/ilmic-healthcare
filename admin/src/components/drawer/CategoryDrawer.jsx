import { Select } from "@windmill/react-ui";
import React, { useMemo } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import { notifyError } from "@/utils/toast";
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import Uploader from "@/components/image-uploader/Uploader";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import CategoryServices from "@/services/CategoryServices";
import DrawerButton from "@/components/form/button/DrawerButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CategoryDrawer = ({ id, data, mode = "child", defaultParentId = "" }) => {
  const { t } = useTranslation();
  const isParentMode = mode === "parent";
  const isEditMode = Boolean(id);

  const {
    checked,
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    setChecked,
    setSelectCategoryName,
    handleSelectLanguage,
    isSubmitting,
  } = useCategorySubmit(id, data, mode, defaultParentId);

  const { showingTranslateValue } = useUtilsFunction();

  const parentOptions = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.map((category) => ({
      id: category._id,
      label: showingTranslateValue(category.name),
    }));
  }, [data, showingTranslateValue]);

  const handleSelect = async (key) => {
    if (!key) {
      setChecked("");
      setSelectCategoryName("");
      return;
    }

    if (id) {
      const parentCategoryId = await CategoryServices.getCategoryById(key);

      if (id === key) {
        return notifyError("This can't be select as a parent category!");
      }
      if (id === parentCategoryId.parentId) {
        return notifyError("This can't be select as a parent category!");
      }
    }

    setChecked(key);
    const selected = parentOptions.find((option) => option.id === key);
    setSelectCategoryName(selected?.label || "");
  };

  const handleSelectChange = (e) => {
    handleSelect(e.target.value);
  };

  const drawerTitle = isEditMode
    ? isParentMode
      ? "Update Parent Category"
      : "Update Sub Category"
    : isParentMode
      ? "Add Parent Category"
      : "Add Sub Category";

  const drawerDescription = isEditMode
    ? t("UpdateCategoryDescription")
    : isParentMode
      ? "Create a new top-level parent category (e.g. Oncology, HIV)."
      : "Add a sub-category under the selected parent category.";

  const showParentPicker = !isParentMode && (!isEditMode || Boolean(checked));

  const parentRequired = !isParentMode && !isEditMode && !checked;

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={drawerTitle}
          description={drawerDescription}
        />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Category title"
                  name="name"
                  type="text"
                  placeholder={
                    isParentMode
                      ? "Parent category name"
                      : t("ParentCategoryPlaceholder")
                  }
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Description")} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Category Description"
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            {showParentPicker ? (
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ParentCategory")} />
                <div className="col-span-8 sm:col-span-4">
                  <Select
                    className="capitalize"
                    value={checked || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Select parent category
                    </option>
                    {parentOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {parentRequired
                      ? "Select a parent category — sub-categories cannot be saved without one."
                      : "This category will be saved under the selected parent."}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CategoryIcon")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="category"
                  targetWidth={238}
                  targetHeight={238}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          <DrawerButton
            id={id}
            title={isParentMode ? "Parent Category" : "Category"}
            isSubmitting={isSubmitting}
          />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
