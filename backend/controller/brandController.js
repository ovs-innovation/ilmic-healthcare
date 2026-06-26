const Brand = require("../models/Brand");

const slugifyBrandName = (name) => {
  if (!name) return "";
  const text = typeof name === "string" ? name : String(name);
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const resolveBrandSlug = (body = {}, existingSlug = "") => {
  if (body.slug && String(body.slug).trim()) {
    return String(body.slug).trim().toLowerCase();
  }
  const fromName = slugifyBrandName(body.name);
  return fromName || existingSlug || "";
};

const addBrand = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      slug: resolveBrandSlug(req.body),
    };

    const newBrand = new Brand(payload);
    await newBrand.save();
    res.status(200).send({ message: "Brand Added Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getShowingBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ status: "show" }).sort({
      sortOrder: 1,
      _id: 1,
    });
    res.send(brands);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getFeaturedBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ status: "show", featured: true }).sort({
      sortOrder: 1,
      _id: 1,
    });
    res.send(brands);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).sort({ _id: -1 });
    res.send(brands);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getBrandBySlug = async (req, res) => {
  try {
    const slug = String(req.params.slug || "")
      .toLowerCase()
      .trim();
    if (!slug) {
      return res.status(400).send({ message: "Brand slug is required." });
    }

    const brand = await Brand.findOne({ slug, status: "show" });
    if (!brand) {
      return res.status(404).send({ message: "Brand not found." });
    }

    res.send(brand);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).send({ message: "Brand not found." });
    }
    res.send(brand);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).send({ message: "Brand not found." });
    }

    brand.name = req.body.name || brand.name;
    brand.slug = resolveBrandSlug(req.body, brand.slug);
    brand.logo = req.body.logo !== undefined ? req.body.logo : brand.logo;
    brand.description =
      req.body.description !== undefined
        ? req.body.description
        : brand.description;
    brand.country =
      req.body.country !== undefined ? req.body.country : brand.country;
    brand.website =
      req.body.website !== undefined ? req.body.website : brand.website;
    brand.status = req.body.status || brand.status;
    brand.featured =
      req.body.featured !== undefined ? Boolean(req.body.featured) : brand.featured;
    brand.sortOrder =
      req.body.sortOrder !== undefined
        ? Number(req.body.sortOrder) || 0
        : brand.sortOrder;

    if (req.body.manufacturer !== undefined) {
      brand.manufacturer = req.body.manufacturer || null;
    }

    await brand.save();
    res.send({ message: "Brand Updated Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;
    await Brand.updateOne(
      { _id: req.params.id },
      { $set: { status: newStatus } },
    );
    res.status(200).send({
      message: `Brand ${newStatus === "show" ? "Published" : "Un-Published"} Successfully!`,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    await Brand.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "Brand Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addBrand,
  getShowingBrands,
  getFeaturedBrands,
  getAllBrands,
  getBrandBySlug,
  getBrandById,
  updateBrand,
  updateStatus,
  deleteBrand,
};
