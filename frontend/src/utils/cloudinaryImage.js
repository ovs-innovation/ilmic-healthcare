/** Fallback when Cloudinary or remote image fails */
export const IMAGE_PLACEHOLDER = "/no-result.svg";

export const isCloudinaryUrl = (src) =>
  typeof src === "string" && src.includes("res.cloudinary.com");
