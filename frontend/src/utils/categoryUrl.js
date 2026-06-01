export const getCategorySlug = (name) => {
  if (!name || typeof name !== "string") return "";
  return name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
};

export const getCategorySearchUrl = (id, name) => {
  const slug = getCategorySlug(name);
  return slug ? `/search?category=${slug}&_id=${id}` : `/search?_id=${id}`;
};
