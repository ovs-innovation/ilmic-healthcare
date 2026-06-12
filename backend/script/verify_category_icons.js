require("dotenv").config();
const https = require("https");
const http = require("http");
const { connectDB } = require("../config/db");
const Category = require("../models/Category");
const mongoose = require("mongoose");

const getName = (n) =>
  !n ? "" : typeof n === "string" ? n : n.en || Object.values(n).find(Boolean) || "";

const head = (url) =>
  new Promise((resolve) => {
    if (!url) return resolve(0);
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(url, { method: "HEAD" }, (res) => resolve(res.statusCode));
    req.on("error", () => resolve(0));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(0);
    });
    req.end();
  });

const getJson = (url) =>
  new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });

const flattenRoots = (tree) => {
  if (!tree?.length) return [];
  if (tree.length === 1 && tree[0].children?.length && !tree[0].parentId) {
    return tree[0].children.filter((c) => {
      const n = getName(c.name).toLowerCase();
      return n && !["home", "all categories", "all departments"].includes(n);
    });
  }
  return tree.filter((c) => {
    const n = getName(c.name).toLowerCase();
    return n && !["home", "all categories", "all departments"].includes(n);
  });
};

(async () => {
  await connectDB();

  const all = await Category.find({}).lean();
  const roots = all.filter((c) => !c.parentId);

  console.log("=== ROOT CATEGORIES (homepage / carousel) ===");
  for (const c of roots) {
    const status = await head(c.icon);
    console.log(`${getName(c.name)} | HTTP ${status} | ${c.icon || "(empty)"}`);
  }

  console.log("\n=== ALL CATEGORIES WITH ICONS ===");
  for (const c of all) {
    const status = await head(c.icon);
    console.log(`[${status}] ${getName(c.name)} (${c.slug})`);
  }

  const apiPort = process.env.PORT || 5055;
  const apiBase = `http://localhost:${apiPort}/api`;
  try {
    const tree = await getJson(`${apiBase}/category/show`);
    const homepageCats = flattenRoots(tree);
    console.log("\n=== API /category/show (frontend carousel source) ===");
    for (const c of homepageCats) {
      const status = await head(c.icon);
      console.log(`${getName(c.name)} | icon=${c.icon ? "set" : "empty"} | HTTP ${status}`);
    }
  } catch (e) {
    console.log("\nAPI check skipped:", e.message);
  }

  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
