import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import DrawerButton from "@/components/form/button/DrawerButton";
import useBrandSubmit from "@/hooks/useBrandSubmit";

const BrandDrawer = ({ id }) => {
  const {
    errors,
    onSubmit,
    register,
    status,
    setStatus,
    featured,
    setFeatured,
    isSubmitting,
    handleSubmit,
  } = useBrandSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Brand"
            description="Update the selected brand details."
          />
        ) : (
          <Title
            title="Add Brand"
            description="Create a new brand for your catalog."
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Brand Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Brand name"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Slug" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Slug"
                  name="slug"
                  type="text"
                  placeholder="brand-slug"
                />
                <Error errorName={errors.slug} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Logo URL" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Logo"
                  name="logo"
                  type="text"
                  placeholder="https://..."
                />
                <Error errorName={errors.logo} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Description" />
              <div className="col-span-8 sm:col-span-4">
                <textarea
                  {...register("description")}
                  placeholder="Short brand description"
                  rows="3"
                  className="w-full border border-gray-200 rounded-md p-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Country" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Country"
                  name="country"
                  type="text"
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Website" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Website"
                  name="website"
                  type="text"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Homepage Order" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Sort Order"
                  name="sortOrder"
                  type="number"
                  placeholder="0"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Lower numbers appear first on the homepage brands strip.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Featured on Homepage" />
              <div className="col-span-8 sm:col-span-1 text-align-left">
                <SwitchToggle
                  processOption={featured}
                  handleProcess={setFeatured}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Published" />
              <div className="col-span-8 sm:col-span-1 text-align-left">
                <SwitchToggle
                  processOption={status}
                  handleProcess={setStatus}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Brand" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default BrandDrawer;
