import ReactTagInput from "@pathofdev/react-tag-input";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import ServiceServices from "@/services/ServiceServices";
import CategoryServices from "@/services/CategoryServices";

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import LabelArea from "@/components/form/selectOption/LabelArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import useProductSubmit from "@/hooks/useProductSubmit";
import ActiveButton from "@/components/form/button/ActiveButton";
import Uploader from "@/components/image-uploader/Uploader";
import UploaderThree from "@/components/image-uploader/UploaderThree";
import AttributeOptionTwo from "@/components/attribute/AttributeOptionTwo";
import AttributeListTable from "@/components/attribute/AttributeListTable";
import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";
import QuantityTiersEditor from "@/components/product/QuantityTiersEditor";
import DatasheetUploader from "@/components/product/DatasheetUploader";

// A clean, reusable section header
const SectionHeader = ({ title }) => (
  <div className="border-t border-gray-200 dark:border-gray-600 mt-8 mb-5 pt-5">
    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</h4>
  </div>
);

// A single-select category dropdown
const CategoryDropdown = ({ categories, value, onChange, placeholder }) => {
  const { showingTranslateValue } = useUtilsFunction();
  return (
    <select
      className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder || "-- Select --"}</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {showingTranslateValue(cat.name)}
        </option>
      ))}
    </select>
  );
};

const ProductDrawer = ({ id }) => {
  const { t } = useTranslation();

  // All categories (flat list from API)
  const [allCategories, setAllCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedMainCatId, setSelectedMainCatId] = useState("");
  const [selectedSubCatId, setSelectedSubCatId] = useState("");

  // Service selection state — MUST be declared before useProductSubmit
  const [allServices, setAllServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    openModal,
    attribue,
    setValues,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    productId,
    onCloseModal,
    isBulkUpdate,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    setValue,
    watch,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
    handleUpdateVariant,
    quantityTiers,
    setQuantityTiers,
    datasheetUrl,
    setDatasheetUrl,
    customSections,
    setCustomSections,
  } = useProductSubmit(id, selectedServices);

  const { showingTranslateValue } = useUtilsFunction();

  // Load all categories
  useEffect(() => {
    CategoryServices.getAllCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          setAllCategories(data);
        }
      })
      .catch(() => setAllCategories([]));
  }, []);

  // When main category changes, filter sub-categories
  useEffect(() => {
    if (selectedMainCatId) {
      const subs = allCategories.filter((c) => c.parentId === selectedMainCatId);
      setSubCategories(subs);
      setSelectedSubCatId("");
    } else {
      setSubCategories([]);
      setSelectedSubCatId("");
    }
  }, [selectedMainCatId, allCategories]);

  // Sync selectedMainCatId → useProductSubmit's selectedCategory & defaultCategory
  useEffect(() => {
    if (!selectedMainCatId) return;
    const cat = allCategories.find((c) => c._id === selectedMainCatId);
    if (!cat) return;
    const catEntry = { _id: cat._id, name: showingTranslateValue(cat.name) };
    setDefaultCategory([catEntry]);
    setSelectedCategory([catEntry]);
    // Also set subCategory text in form
    if (selectedSubCatId) {
      const sub = allCategories.find((c) => c._id === selectedSubCatId);
      if (sub) setValue("subCategory", showingTranslateValue(sub.name));
    }
  }, [selectedMainCatId, selectedSubCatId]);

  // Load all services on mount
  useEffect(() => {
    ServiceServices.getAllServices()
      .then((data) => setAllServices(Array.isArray(data) ? data : []))
      .catch(() => setAllServices([]));
  }, []);

  // When editing a product, pre-populate selected services + category
  useEffect(() => {
    if (id && allCategories.length > 0) {
      import("@/services/ProductServices").then(({ default: PS }) => {
        PS.getProductById(id).then((res) => {
          if (res && res.services && Array.isArray(res.services)) {
            const serviceIds = res.services.map((s) =>
              typeof s === "object" ? s._id : s
            );
            setSelectedServices(serviceIds);
          }
          // Pre-set category dropdown
          if (res && res.category) {
            const catId = typeof res.category === "object" ? res.category._id : res.category;
            setSelectedMainCatId(catId || "");
          }
        }).catch(() => {});
      });
    } else if (!id) {
      setSelectedServices([]);
      setSelectedMainCatId("");
      setSelectedSubCatId("");
    }
  }, [id, allCategories]);

  const handleAddCustomSection = () => {
    setCustomSections((prev) => [...prev, { title: "", content: "" }]);
  };

  const handleRemoveCustomSection = (index) => {
    setCustomSections((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCustomSectionChange = (index, field, val) => {
    setCustomSections((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  // Top-level (parent) categories only
  const parentCategories = allCategories.filter((c) => !c.parentId || c.parentId === "");

  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500  active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateProduct")}
            description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("DrawerAddProduct")}
            description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Basic Info"
              handleProductTap={handleProductTap}
            />
          </li>

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">

              {/* ─────────────────────────────────────────────────────────
                  SECTION 1 — PRODUCT IDENTITY
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="1. Product Identity" />

              {/* Product ID */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductID")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register("productId", {
                      required: "Product ID is required!",
                    })}
                    name="productId"
                    type="text"
                    placeholder={t("ProductID")}
                    defaultValue={productId}
                  />
                  <Error errorName={errors.productId} />
                </div>
              </div>

              {/* Product Name */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Brand / Product Name *" />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title`, {
                      required: "Title is required!",
                    })}
                    name="title"
                    type="text"
                    placeholder="e.g. Darzalex / Herceptin"
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              {/* Generic / Salt Name */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Generic / Salt Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Generic Name"
                    name="composition"
                    type="text"
                    placeholder="e.g. Daratumumab / Trastuzumab"
                  />
                  <p className="text-xs text-gray-400 mt-1">Also known as: Salt Composition / Active Ingredient</p>
                  <Error errorName={errors.composition} />
                </div>
              </div>

              {/* SKU */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductSKU")}
                    name="sku"
                    type="text"
                    placeholder={t("ProductSKU")}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>

              {/* HSN Code */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="HSN Code" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="HSN Code"
                    name="hsnCode"
                    type="text"
                    placeholder="e.g. 30049099 (optional, GST format)"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional. 2–8 alphanumeric characters as per GST HSN/SAC format.
                  </p>
                  <Error errorName={errors.hsnCode} />
                </div>
              </div>

              {/* Barcode */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductBarcode")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductBarcode")}
                    name="barcode"
                    type="text"
                    placeholder={t("ProductBarcode")}
                  />
                  <Error errorName={errors.barcode} />
                </div>
              </div>

              {/* Product Slug */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSlug")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`slug`, {
                      required: "slug is required!",
                    })}
                    className=" mr-2 p-2"
                    name="slug"
                    type="text"
                    defaultValue={slug}
                    placeholder={t("ProductSlug")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.slug} />
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 2 — CLASSIFICATION
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="2. Classification" />

              {/* Main Category — Dropdown */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Main Category *" />
                <div className="col-span-8 sm:col-span-4">
                  <CategoryDropdown
                    categories={parentCategories}
                    value={selectedMainCatId}
                    onChange={setSelectedMainCatId}
                    placeholder="-- Select Main Category --"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    e.g. Oncology, Critical Care, HIV Medicines
                  </p>
                </div>
              </div>

              {/* Sub Category — Dropdown (only shown when parent is selected) */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Sub Category" />
                <div className="col-span-8 sm:col-span-4">
                  {subCategories.length > 0 ? (
                    <select
                      className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                      value={selectedSubCatId}
                      onChange={(e) => {
                        setSelectedSubCatId(e.target.value);
                        const sub = allCategories.find((c) => c._id === e.target.value);
                        if (sub) setValue("subCategory", showingTranslateValue(sub.name));
                      }}
                    >
                      <option value="">-- No Sub Category --</option>
                      {subCategories.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {showingTranslateValue(sub.name)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>
                      {/* Manual text input when no child categories exist */}
                      <InputArea
                        register={register}
                        label="Sub Category"
                        name="subCategory"
                        type="text"
                        placeholder="e.g. Breast Cancer / Monoclonal Antibody"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {selectedMainCatId
                          ? "No sub-categories found for this main category. Type manually."
                          : "Select a main category first, or type a sub-category name."}
                      </p>
                    </>
                  )}
                  <Error errorName={errors.subCategory} />
                </div>
              </div>

              {/* Medicine Type */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Medicine Type" />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("medicineType")}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                  >
                    <option value="">-- Select Medicine Type --</option>
                    <option value="Monoclonal Antibody">Monoclonal Antibody</option>
                    <option value="Targeted Therapy">Targeted Therapy</option>
                    <option value="Immunotherapy">Immunotherapy</option>
                    <option value="Chemotherapy">Chemotherapy</option>
                    <option value="Hormonal Therapy">Hormonal Therapy</option>
                    <option value="CAR-T Cell Therapy">CAR-T Cell Therapy</option>
                    <option value="Biosimilar">Biosimilar</option>
                    <option value="Generics">Generics</option>
                    <option value="Supportive Care">Supportive Care</option>
                    <option value="Antifungal">Antifungal</option>
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Antiretroviral">Antiretroviral</option>
                    <option value="Immunosuppressant">Immunosuppressant</option>
                    <option value="Enzyme / Protein Therapy">Enzyme / Protein Therapy</option>
                    <option value="Lifesaving Emergency">Lifesaving Emergency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Imported / Indian */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Origin" />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("importedOrIndian")}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                  >
                    <option value="">-- Select Origin --</option>
                    <option value="Imported">🌐 Imported</option>
                    <option value="Indian">🇮🇳 Indian</option>
                    <option value="Indian Generics">🇮🇳 Indian Generics</option>
                  </select>
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 3 — MEDICINE INFORMATION
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="3. Medicine Information" />

              {/* Manufacturer */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Manufacturer" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Manufacturer"
                    name="manufacturer"
                    type="text"
                    placeholder="e.g. Roche / Pfizer / Janssen"
                  />
                  <Error errorName={errors.manufacturer} />
                </div>
              </div>

              {/* Strength */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Strength" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Strength"
                    name="strength"
                    type="text"
                    placeholder="e.g. 1800mg / 150mg/ml"
                  />
                  <Error errorName={errors.strength} />
                </div>
              </div>

              {/* Dosage Form */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Dosage Form" />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("dosageForm")}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                  >
                    <option value="">-- Select Dosage Form --</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Soft Gelatin Capsule">Soft Gelatin Capsule</option>
                    <option value="Injection">Injection</option>
                    <option value="IV Infusion">IV Infusion</option>
                    <option value="Vial">Vial</option>
                    <option value="Syringe">Syringe</option>
                    <option value="Lyophilized Powder">Lyophilized Powder</option>
                    <option value="Powder for Injection">Powder for Injection</option>
                    <option value="Liquid Oral">Liquid Oral</option>
                    <option value="Cream / Ointment">Cream / Ointment</option>
                    <option value="Patch">Patch</option>
                    <option value="Other">Other</option>
                  </select>
                  <Error errorName={errors.dosageForm} />
                </div>
              </div>

              {/* Route of Administration */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Route of Administration" />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("route")}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                  >
                    <option value="">-- Select Route --</option>
                    <option value="Oral">Oral</option>
                    <option value="IV Infusion">IV Infusion</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="IM Injection">IM Injection</option>
                    <option value="Intravenous">Intravenous</option>
                    <option value="Intrathecal">Intrathecal</option>
                    <option value="IV / Intracavitary">IV / Intracavitary</option>
                    <option value="Topical">Topical</option>
                    <option value="Transdermal">Transdermal</option>
                    <option value="Inhalation">Inhalation</option>
                    <option value="Other">Other</option>
                  </select>
                  <Error errorName={errors.route} />
                </div>
              </div>

              {/* Cold Chain Required */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Cold Chain" />
                <div className="col-span-8 sm:col-span-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      {...register("coldChain")}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      Requires Cold Chain Logistics (2-8°C)
                    </span>
                  </label>
                  <p className="text-xs text-gray-400 mt-1">
                    Check if this product needs temperature-controlled shipping.
                  </p>
                </div>
              </div>

              {/* Packaging */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Packaging" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Packaging"
                    name="packaging"
                    type="text"
                    placeholder="e.g. 1 Vial of 1800mg / 30 Tablets per Strip"
                  />
                  <Error errorName={errors.packaging} />
                </div>
              </div>

              {/* Storage */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Storage Conditions" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Storage"
                    name="storage"
                    type="text"
                    placeholder="e.g. Store at 2-8°C, protect from light"
                  />
                  <Error errorName={errors.storage} />
                </div>
              </div>

              {/* Sourcing Availability */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Sourcing Availability" />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("availability")}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                  >
                    <option value="Sourcing Available">✅ Sourcing Available</option>
                    <option value="Global Distribution">🌐 Global Distribution</option>
                    <option value="Limited Stock">⚠️ Limited Stock</option>
                    <option value="Pre Order">📦 Pre Order</option>
                    <option value="Coming Soon">🕐 Coming Soon</option>
                    <option value="Made to Order">🏭 Made to Order</option>
                    <option value="Discontinued">🚫 Discontinued</option>
                  </select>
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 4 — DESCRIPTIONS & CLINICAL INFORMATION
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="4. Descriptions & Clinical Information" />

              {/* Short Description */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Short Description" />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm  block w-full bg-gray-100 border-gray-200"
                    {...register("description", {
                      required: false,
                    })}
                    name="description"
                    placeholder="Brief product overview (2-3 lines for product card)"
                    rows="3"
                    spellCheck="false"
                  />
                  <Error errorName={errors.description} />
                </div>
              </div>

              {/* Product Highlights */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Key Highlights" />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm  block w-full bg-gray-100 border-gray-200"
                    {...register("highlights", {
                      required: false,
                    })}
                    name="highlights"
                    placeholder="Enter one highlight per line&#10;e.g. FDA Approved&#10;Cold Chain Maintained&#10;Hospital Grade Packaging"
                    rows="4"
                    spellCheck="false"
                  />
                  <Error errorName={errors.highlights} />
                </div>
              </div>

              {/* Indications */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Indications / Uses" />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm block w-full bg-gray-100 border-gray-200"
                    {...register("indications")}
                    name="indications"
                    placeholder="e.g. Multiple Myeloma, Breast Cancer (HER2+), AL Amyloidosis"
                    rows="3"
                  />
                  <Error errorName={errors.indications} />
                </div>
              </div>

              {/* Dosage Guidelines */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Dosage Guidelines" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Dosage"
                    name="dosage"
                    type="text"
                    placeholder="e.g. As directed by a specialist oncologist"
                  />
                  <Error errorName={errors.dosage} />
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 5 — PRODUCT IMAGE
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="5. Product Image" />

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div>

              {/* Product Video */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Product Video (YouTube)" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Product Video URL"
                    name="videoUrl"
                    type="text"
                    placeholder="Enter YouTube Video URL"
                  />
                  <Error errorName={errors.videoUrl} />
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 6 — PRICING & INVENTORY
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="6. Pricing & Inventory" />

              {/* Base Price */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Base Price (GST Excl.)" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Base Price"
                    name="basePrice"
                    type="number"
                    placeholder="Enter price without GST"
                  />
                  <Error errorName={errors.basePrice} />
                </div>
              </div>

              {/* GST */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="GST Percentage" />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("gstPercentage")}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                    name="gstPercentage"
                  >
                    <option value="0">0% GST</option>
                    <option value="5">5% GST</option>
                    <option value="12">12% GST</option>
                    <option value="18">18% GST</option>
                    <option value="28">28% GST</option>
                  </select>
                  <Error errorName={errors.gstPercentage} />
                </div>
              </div>

              {/* Final Price */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Final Price (GST Incl.)" />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    type="number"
                    className="border text-sm block w-full bg-gray-200 border-gray-200"
                    readOnly
                    value={(Number(watch("basePrice") || 0) * (1 + Number(watch("gstPercentage") || 0) / 100)).toFixed(2)}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Sale price after discount (auto-calculated from base + GST).
                  </p>
                </div>
              </div>

              {/* MRP */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="MRP (Before Discount)" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Price Before Discount"
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 222 (shown as struck-through MRP)"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional. Must be higher than final price. Shown as crossed-out MRP on store.
                  </p>
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              {/* MOQ */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Min Order Qty (MOQ)" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Min Order Quantity"
                    name="minOrderQuantity"
                    type="number"
                    min="1"
                    placeholder="Minimum units per order"
                  />
                  <Error errorName={errors.minOrderQuantity} />
                </div>
              </div>

              {/* Max Order Qty */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Max Order Quantity" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Max Order Quantity"
                    name="maxOrderQuantity"
                    type="number"
                    min="0"
                    placeholder="0 = no limit"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional cap per order. Leave 0 for unlimited.
                  </p>
                  <Error errorName={errors.maxOrderQuantity} />
                </div>
              </div>

              {/* Quantity Discount Slabs */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Quantity Discount Slabs" />
                <div className="col-span-8 sm:col-span-4">
                  <QuantityTiersEditor
                    tiers={quantityTiers}
                    onChange={setQuantityTiers}
                    basePrice={
                      Number(watch("basePrice") || 0) *
                      (1 + Number(watch("gstPercentage") || 0) / 100)
                    }
                  />
                </div>
              </div>

              {/* Delivery Charge */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Delivery Charge" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Delivery Charge"
                    name="deliveryCharge"
                    type="number"
                    placeholder="Delivery Charge"
                  />
                  <Error errorName={errors.deliveryCharge} />
                </div>
              </div>

              {/* Track Inventory */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Track Inventory" />
                <div className="col-span-8 sm:col-span-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("trackInventory")}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      Enable stock tracking for this product
                    </span>
                  </label>
                  <p className="text-xs text-gray-400 mt-1">
                    When disabled, product stays purchasable regardless of stock count.
                  </p>
                </div>
              </div>

              {/* Stock */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Stock Quantity" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="Available inventory units"
                  />
                  <Error errorName={errors.stock} />
                </div>
              </div>

              {/* Low Stock Threshold */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Low Stock Threshold" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Low Stock Threshold"
                    name="lowStockThreshold"
                    type="number"
                    min="0"
                    placeholder="Alert when stock falls to this level"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Default 5. Products at or below this level show as Low Stock.
                  </p>
                  <Error errorName={errors.lowStockThreshold} />
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 7 — DOCUMENTS & DATASHEET
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="7. Documents" />

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Product Datasheet (PDF)" />
                <div className="col-span-8 sm:col-span-4">
                  <DatasheetUploader
                    datasheetUrl={datasheetUrl}
                    setDatasheetUrl={setDatasheetUrl}
                  />
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 8 — PUBLISHING & STATUS
              ───────────────────────────────────────────────────────── */}
              <SectionHeader title="8. Publishing & Labels" />

              {/* Tags */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTag")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("ProductTagPlaseholder")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                  <p className="text-xs text-gray-400 mt-1">e.g. Oncology, Critical Care, Imported, Cold Chain</p>
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductStatus")} />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("status", {
                      required: "Status is required!",
                    })}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                    name="status"
                    defaultValue={values?.status || "show"}
                  >
                    <option value="show">{t("Published")}</option>
                    <option value="hide">{t("Unpublished")}</option>
                  </select>
                  <Error errorName={errors.status} />
                </div>
              </div>

              {/* Product Type / Featured */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Product Label / Type" />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register("type")}
                    className="border text-sm block w-full bg-gray-100 border-gray-200 rounded-md p-2"
                    name="type"
                    defaultValue={values?.type || "normal"}
                  >
                    <option value="normal">Normal</option>
                    <option value="popular">⭐ Popular</option>
                    <option value="trending">🔥 Trending</option>
                    <option value="new">🆕 New Arrival</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Select to feature this product on the homepage.</p>
                </div>
              </div>

              {/* ── Service Selector ── */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Link to Services" />
                <div className="col-span-8 sm:col-span-4">
                  {allServices.length > 0 ? (
                    <div className="border border-gray-200 bg-gray-50 rounded-md p-3 space-y-2 max-h-48 overflow-y-auto">
                      {allServices.map((service) => {
                        const svcName =
                          typeof service.name === "object"
                            ? service.name.en || Object.values(service.name)[0]
                            : service.name;
                        const isChecked = selectedServices.includes(service._id);
                        return (
                          <label
                            key={service._id}
                            className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-white transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setSelectedServices((prev) =>
                                  isChecked
                                    ? prev.filter((id) => id !== service._id)
                                    : [...prev, service._id]
                                );
                              }}
                              className="w-4 h-4 accent-green-600"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {svcName || "Unknown Service"}
                            </span>
                            {service.group && (
                              <span className="text-xs text-gray-400 ml-auto">
                                {service.group}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No services found. Add services first.</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Select the services this product belongs to.
                  </p>
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 9 — SEO METADATA
              ───────────────────────────────────────────────────────── */}
              <div className="border-t border-gray-200 dark:border-gray-600 my-6 pt-6">
                <h4 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-widest">9. SEO Metadata</h4>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="SEO Title" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="SEO Title"
                      name="seoTitle"
                      type="text"
                      placeholder="Meta title for Google search results"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="SEO Description" />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm block w-full bg-gray-100 border-gray-200"
                      {...register("seoDescription")}
                      name="seoDescription"
                      placeholder="Meta description for search snippets"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="SEO Keywords" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="SEO Keywords"
                      name="seoKeywords"
                      type="text"
                      placeholder="e.g. oncology medicine, daratumumab distributor"
                    />
                  </div>
                </div>
              </div>


              {/* ─────────────────────────────────────────────────────────
                  SECTION 10 — CUSTOM INFORMATION SECTIONS
              ───────────────────────────────────────────────────────── */}
              <div className="border-t border-gray-200 dark:border-gray-600 my-6 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">10. Custom Information Tabs / Sections</h4>
                  <button
                    type="button"
                    onClick={handleAddCustomSection}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm transition-colors"
                  >
                    + Add Custom Section
                  </button>
                </div>

                {customSections && customSections.length > 0 ? (
                  <div className="space-y-4 border border-gray-150 rounded-xl p-4 bg-gray-50/50">
                    {customSections.map((sec, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-white space-y-3 relative shadow-xs">
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomSection(idx)}
                          className="absolute top-2 right-2 text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                        <div className="pr-16">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Section Title</label>
                          <input
                            type="text"
                            value={sec.title}
                            onChange={(e) => handleCustomSectionChange(idx, "title", e.target.value)}
                            placeholder="e.g. Clinical Trials / Mechanism of Action"
                            className="w-full border border-gray-250 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#0F4C81]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Section Content</label>
                          <textarea
                            value={sec.content}
                            onChange={(e) => handleCustomSectionChange(idx, "content", e.target.value)}
                            placeholder="HTML or plaintext details for this section..."
                            rows="4"
                            className="w-full border border-gray-250 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#0F4C81]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No custom sections added yet. Click "+ Add Custom Section" to include dynamic metadata tabs.</p>
                )}
              </div>

            </div>
          )}

          {tapValue === "Combination" &&
            isCombination &&
            (attribue.length < 1 ? (
              <div
                className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">
                      {t("AddCombinationsDiscription")}{" "}
                      <Link to="/attributes" className="font-bold">
                        {t("AttributesFeatures")}
                      </Link>
                      {t("AddCombinationsDiscriptionTwo")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
                  <MultiSelect
                    options={attTitle}
                    value={attributes}
                    onChange={(v) => handleAddAtt(v)}
                    labelledBy="Select"
                  />

                  {attributes?.map((attribute, i) => (
                    <div key={attribute._id}>
                      <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200">
                        {"Select"}
                        {showingTranslateValue(attribute?.title)}
                      </div>

                      <AttributeOptionTwo
                        id={i + 1}
                        values={values}
                        lang={language}
                        attributes={attribute}
                        setValues={setValues}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mb-6">
                  {attributes?.length > 0 && (
                    <Button
                      onClick={handleGenerateCombination}
                      type="button"
                      className="mx-2"
                    >
                      <span className="text-xs">{t("GenerateVariants")}</span>
                    </Button>
                  )}

                  {variantTitle.length > 0 && (
                    <Button onClick={handleClearVariant} className="mx-2">
                      <span className="text-xs">{t("ClearVariants")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Product"
              isSubmitting={isSubmitting}
              handleProductTap={handleProductTap}
            />
          ) : (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}

          {tapValue === "Combination" && (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}
        </form>

        {tapValue === "Combination" &&
          isCombination &&
          (variantTitle.length > 0 || variants.length > 0) && (
            <div className="px-6 overflow-x-auto">
              {isCombination && (
                <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>{t("Images")}</TableCell>
                        <TableCell>{t("VariantDetails")}</TableCell>
                        <TableCell className="text-right">
                          {t("Actions")}
                        </TableCell>
                      </tr>
                    </TableHeader>

                    <AttributeListTable
                      lang={language}
                      variants={variants}
                      setTapValue={setTapValue}
                      variantTitle={variantTitle}
                      isBulkUpdate={isBulkUpdate}
                      handleSkuBarcode={handleSkuBarcode}
                      handleRemoveVariant={handleRemoveVariant}
                      handleQuantityPrice={handleQuantityPrice}
                      handleSelectInlineImage={handleSelectInlineImage}
                      handleUpdateVariant={handleUpdateVariant}
                      language={language}
                      errors={errors}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
