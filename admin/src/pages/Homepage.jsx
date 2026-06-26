import { Button, Card, CardBody, Input } from "@windmill/react-ui";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import PageTitle from "@/components/Typography/PageTitle";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Loading from "@/components/preloader/Loading";
import useHomepageSubmit from "@/hooks/useHomepageSubmit";

const Field = ({ label, children }) => (
  <div className="mb-4">
    <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder = "" }) => (
  <Input className="h-10" value={value || ""} onChange={onChange} placeholder={placeholder} />
);

const Homepage = () => {
  const {
    settings,
    loading,
    isSubmitting,
    onSubmit,
    updateNested,
    updateListItem,
    addListItem,
    removeListItem,
    updateHeroSlide,
    addHeroSlide,
    removeHeroSlide,
  } = useHomepageSubmit();

  if (loading || !settings) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <PageTitle>Homepage</PageTitle>

      <form onSubmit={onSubmit}>
        <Card className="mb-5">
          <CardBody>
            <Tabs>
              <TabList className="flex flex-wrap gap-2 mb-6 border-b pb-3">
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">SEO</Tab>
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">Hero</Tab>
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">Quality Bar</Tab>
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">Categories</Tab>
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">Promo Banners</Tab>
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">Therapeutics</Tab>
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">Sections</Tab>
                <Tab className="cursor-pointer px-3 py-2 text-sm font-semibold">Bottom CTA</Tab>
              </TabList>

              <TabPanel>
                <Field label="Page Title">
                  <TextInput
                    value={settings.seo?.title}
                    onChange={(e) => updateNested("seo", "title", e.target.value)}
                  />
                </Field>
                <Field label="Meta Description">
                  <textarea
                    className="w-full border border-gray-200 rounded-md p-2 text-sm"
                    rows={3}
                    value={settings.seo?.description || ""}
                    onChange={(e) => updateNested("seo", "description", e.target.value)}
                  />
                </Field>
              </TabPanel>

              <TabPanel>
                <div className="flex items-center justify-between mb-4">
                  <SwitchToggle
                    processOption={settings.hero?.enabled}
                    handleProcess={(v) => updateNested("hero", "enabled", v)}
                  />
                  <Button type="button" size="small" onClick={addHeroSlide}>
                    <FiPlus className="mr-1" /> Add Slide
                  </Button>
                </div>
                {(settings.hero?.slides || []).map((slide, index) => (
                  <Card key={index} className="mb-4 border border-gray-100">
                    <CardBody>
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold">Slide {index + 1}</h4>
                        <button type="button" onClick={() => removeHeroSlide(index)}>
                          <FiTrash2 className="text-red-500" />
                        </button>
                      </div>
                      {[
                        ["tagline", "Tagline"],
                        ["titleLine1", "Title Line 1"],
                        ["titleHighlight", "Highlighted Text"],
                        ["titleLine2", "Title Line 2"],
                        ["subtitle", "Subtitle"],
                        ["bgImage", "Background Image URL"],
                      ].map(([key, label]) => (
                        <Field key={key} label={label}>
                          <TextInput
                            value={slide[key]}
                            onChange={(e) => updateHeroSlide(index, key, e.target.value)}
                          />
                        </Field>
                      ))}
                    </CardBody>
                  </Card>
                ))}
              </TabPanel>

              <TabPanel>
                <SwitchToggle
                  processOption={settings.qualityBar?.enabled}
                  handleProcess={(v) => updateNested("qualityBar", "enabled", v)}
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    size="small"
                    onClick={() =>
                      addListItem("qualityBar", {
                        icon: "FiShield",
                        title: "",
                        description: "",
                      })
                    }
                  >
                    <FiPlus className="mr-1" /> Add Item
                  </Button>
                </div>
                {(settings.qualityBar?.items || []).map((item, index) => (
                  <Card key={index} className="mb-3 border border-gray-100">
                    <CardBody>
                      <Field label="Icon (FiShield, FiAward, FiHeadphones, FiUsers)">
                        <TextInput
                          value={item.icon}
                          onChange={(e) =>
                            updateListItem("qualityBar", index, "icon", e.target.value)
                          }
                        />
                      </Field>
                      <Field label="Title">
                        <TextInput
                          value={item.title}
                          onChange={(e) =>
                            updateListItem("qualityBar", index, "title", e.target.value)
                          }
                        />
                      </Field>
                      <Field label="Description">
                        <TextInput
                          value={item.description}
                          onChange={(e) =>
                            updateListItem("qualityBar", index, "description", e.target.value)
                          }
                        />
                      </Field>
                      <button type="button" onClick={() => removeListItem("qualityBar", index)}>
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </CardBody>
                  </Card>
                ))}
              </TabPanel>

              <TabPanel>
                <Field label="Section Title">
                  <TextInput
                    value={settings.popularCategories?.title}
                    onChange={(e) =>
                      updateNested("popularCategories", "title", e.target.value)
                    }
                  />
                </Field>
                <div className="flex justify-end mb-3">
                  <Button
                    type="button"
                    size="small"
                    onClick={() =>
                      addListItem("popularCategories", {
                        name: "",
                        bgColor: "#F3EEFF",
                        textColor: "#7C3AED",
                        category: "",
                        image: "",
                      })
                    }
                  >
                    <FiPlus className="mr-1" /> Add Category
                  </Button>
                </div>
                {(settings.popularCategories?.items || []).map((item, index) => (
                  <Card key={index} className="mb-3 border border-gray-100">
                    <CardBody>
                      {[
                        ["name", "Display Name"],
                        ["category", "Category Filter Value"],
                        ["image", "Image URL"],
                        ["bgColor", "Background Color"],
                        ["textColor", "Text Color"],
                      ].map(([key, label]) => (
                        <Field key={key} label={label}>
                          <TextInput
                            value={item[key]}
                            onChange={(e) =>
                              updateListItem("popularCategories", index, key, e.target.value)
                            }
                          />
                        </Field>
                      ))}
                      <button
                        type="button"
                        onClick={() => removeListItem("popularCategories", index)}
                      >
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </CardBody>
                  </Card>
                ))}
              </TabPanel>

              <TabPanel>
                <div className="flex justify-end mb-3">
                  <Button
                    type="button"
                    size="small"
                    onClick={() =>
                      addListItem("promoBanners", {
                        label: "",
                        title: "",
                        titleLine2: "",
                        emoji: "",
                        gradientFrom: "#FFD1A9",
                        gradientTo: "#FFBE85",
                        linkText: "",
                        linkUrl: "",
                        labelColor: "#9A3412",
                        titleColor: "#7A3B00",
                        linkColor: "#7C2D12",
                      })
                    }
                  >
                    <FiPlus className="mr-1" /> Add Banner
                  </Button>
                </div>
                {(settings.promoBanners?.items || []).map((item, index) => (
                  <Card key={index} className="mb-3 border border-gray-100">
                    <CardBody>
                      {[
                        ["label", "Label"],
                        ["title", "Title"],
                        ["titleLine2", "Title Line 2"],
                        ["emoji", "Emoji"],
                        ["gradientFrom", "Gradient From"],
                        ["gradientTo", "Gradient To"],
                        ["linkText", "Link Text"],
                        ["linkUrl", "Link URL"],
                      ].map(([key, label]) => (
                        <Field key={key} label={label}>
                          <TextInput
                            value={item[key]}
                            onChange={(e) =>
                              updateListItem("promoBanners", index, key, e.target.value)
                            }
                          />
                        </Field>
                      ))}
                      <button type="button" onClick={() => removeListItem("promoBanners", index)}>
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </CardBody>
                  </Card>
                ))}
              </TabPanel>

              <TabPanel>
                {[
                  ["badge", "Badge"],
                  ["title", "Title"],
                  ["titleHighlight", "Highlight"],
                  ["titleSuffix", "Suffix"],
                  ["description", "Description"],
                  ["image", "Image URL"],
                  ["imageLabel", "Image Label"],
                ].map(([key, label]) => (
                  <Field key={key} label={label}>
                    <TextInput
                      value={settings.therapeutics?.[key]}
                      onChange={(e) => updateNested("therapeutics", key, e.target.value)}
                    />
                  </Field>
                ))}
                <Field label="Bullet Points (one per line)">
                  <textarea
                    className="w-full border border-gray-200 rounded-md p-2 text-sm"
                    rows={6}
                    value={(settings.therapeutics?.bullets || []).join("\n")}
                    onChange={(e) =>
                      updateNested(
                        "therapeutics",
                        "bullets",
                        e.target.value.split("\n").filter(Boolean)
                      )
                    }
                  />
                </Field>
              </TabPanel>

              <TabPanel>
                <Field label="Best Deals Title">
                  <TextInput
                    value={settings.bestDeals?.title}
                    onChange={(e) => updateNested("bestDeals", "title", e.target.value)}
                  />
                </Field>
                <Field label="Featured Brands Title">
                  <TextInput
                    value={settings.featuredBrands?.title}
                    onChange={(e) => updateNested("featuredBrands", "title", e.target.value)}
                  />
                </Field>
                <p className="text-xs text-gray-500 mb-4">
                  Brand logos are managed from Catalog → Brands (enable &quot;Featured on Homepage&quot;).
                </p>
                <Field label="Trending Products Title">
                  <TextInput
                    value={settings.trendingProducts?.title}
                    onChange={(e) => updateNested("trendingProducts", "title", e.target.value)}
                  />
                </Field>
                <Field label="Trending Products Subtitle">
                  <TextInput
                    value={settings.trendingProducts?.subtitle}
                    onChange={(e) => updateNested("trendingProducts", "subtitle", e.target.value)}
                  />
                </Field>
              </TabPanel>

              <TabPanel>
                {[
                  ["title", "Title"],
                  ["subtitle", "Subtitle"],
                  ["phone", "Phone Display"],
                  ["phoneHref", "Phone Link (tel:...)"],
                  ["enquiryButtonText", "Enquiry Button Text"],
                ].map(([key, label]) => (
                  <Field key={key} label={label}>
                    <TextInput
                      value={settings.bottomCta?.[key]}
                      onChange={(e) => updateNested("bottomCta", key, e.target.value)}
                    />
                  </Field>
                ))}
              </TabPanel>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="h-12 px-8">
                {isSubmitting ? "Saving..." : "Save Homepage"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </form>
    </>
  );
};

export default Homepage;
