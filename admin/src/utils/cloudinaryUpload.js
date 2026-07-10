import axios from "axios";
import Cookies from "js-cookie";

export const UPLOAD_TIMEOUT_MS = 90000;
export const MAX_IMAGE_SIZE_BYTES = 5242880;
export const MAX_PDF_SIZE_BYTES = 10485760;
export const MAX_UPLOAD_RETRIES = 3;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const ALLOWED_PDF_TYPES = new Set(["application/pdf"]);

const CLOUDINARY_UPLOAD_URL_PATTERN =
  /^https:\/\/api\.cloudinary\.com\/v1_1\/([a-z0-9_-]+)\/image\/upload\/?$/i;

const UPLOAD_PRESET_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

const INVALID_ENV_PLACEHOLDERS = new Set([
  "undefined",
  "null",
  "your_upload_preset",
  "your_cloud_name",
  "changeme",
  "replace_me",
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeEnvValue = (value) =>
  typeof value === "string" ? value.trim() : "";

const isMissingEnvValue = (value) => {
  const normalized = normalizeEnvValue(value);
  if (!normalized) return true;
  return INVALID_ENV_PLACEHOLDERS.has(normalized.toLowerCase());
};

export const parseCloudNameFromUploadUrl = (uploadUrl) => {
  const normalized = normalizeEnvValue(uploadUrl);
  const match = normalized.match(CLOUDINARY_UPLOAD_URL_PATTERN);
  return match ? match[1] : null;
};

const validateCloudinaryEnv = ({ uploadUrl, uploadPreset, cloudName }) => {
  if (isMissingEnvValue(uploadUrl)) {
    return "VITE_APP_CLOUDINARY_URL is missing or invalid. Rebuild admin after setting .env.";
  }

  if (isMissingEnvValue(uploadPreset)) {
    return "VITE_APP_CLOUDINARY_UPLOAD_PRESET is missing or invalid. Rebuild admin after setting .env.";
  }

  if (isMissingEnvValue(cloudName)) {
    return "VITE_APP_CLOUD_NAME or VITE_APP_CLOUDINARY_CLOUD_NAME is missing or invalid. Rebuild admin after setting .env.";
  }

  const normalizedUrl = normalizeEnvValue(uploadUrl);
  const normalizedPreset = normalizeEnvValue(uploadPreset);
  const normalizedCloudName = normalizeEnvValue(cloudName);

  const cloudNameFromUrl = parseCloudNameFromUploadUrl(normalizedUrl);
  if (!cloudNameFromUrl) {
    return "VITE_APP_CLOUDINARY_URL must match https://api.cloudinary.com/v1_1/<cloud_name>/image/upload";
  }

  if (cloudNameFromUrl !== normalizedCloudName) {
    return `Cloudinary config mismatch: URL uses "${cloudNameFromUrl}" but cloud name is "${normalizedCloudName}".`;
  }

  if (!UPLOAD_PRESET_PATTERN.test(normalizedPreset)) {
    return "VITE_APP_CLOUDINARY_UPLOAD_PRESET has an invalid format.";
  }

  return null;
};

export const getAdminCloudinaryConfig = () => {
  const uploadUrl = import.meta.env.VITE_APP_CLOUDINARY_URL;
  const uploadPreset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;
  const cloudName =
    import.meta.env.VITE_APP_CLOUD_NAME ||
    import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
  const validationError = validateCloudinaryEnv({
    uploadUrl,
    uploadPreset,
    cloudName,
  });

  if (validationError) {
    return {
      valid: false,
      error: validationError,
    };
  }

  return {
    valid: true,
    uploadUrl: normalizeEnvValue(uploadUrl),
    uploadPreset: normalizeEnvValue(uploadPreset),
    cloudName: normalizeEnvValue(cloudName),
  };
};

export const validateImageFile = (file, maxSizeBytes = MAX_IMAGE_SIZE_BYTES) => {
  if (!file) {
    return "No file selected.";
  }

  const type = (file.type || "").toLowerCase();
  if (!ALLOWED_IMAGE_TYPES.has(type)) {
    return "Only JPEG, PNG, and WebP images are allowed.";
  }

  if (file.size > maxSizeBytes) {
    const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
    return `Image must be smaller than ${maxMb} MB.`;
  }

  return null;
};

export const generateUniquePublicId = (fileName) => {
  const base =
    (fileName || "image")
      .replace(/\s/g, "")
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 60) || "image";

  return `${base}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

export const isRetryableCloudinaryError = (error) => {
  if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
    return false;
  }

  const status = error?.response?.status;
  if (status === 429 || (status >= 500 && status < 600)) {
    return true;
  }

  if (error?.code === "ECONNABORTED" || error?.message === "Network Error") {
    return true;
  }

  return !error?.response;
};

const getRetryDelayMs = (error, attempt) => {
  const retryAfter = error?.response?.headers?.["retry-after"];
  if (retryAfter) {
    const seconds = Number.parseInt(retryAfter, 10);
    if (!Number.isNaN(seconds) && seconds > 0) {
      return seconds * 1000;
    }
  }

  return 1000 * 2 ** attempt;
};

export const getCloudinaryErrorMessage = (error) => {
  const cloudinaryMessage = error?.response?.data?.error?.message;
  if (cloudinaryMessage) {
    return cloudinaryMessage;
  }

  if (error?.code === "ECONNABORTED") {
    return "Upload timed out. Please check your connection and try again.";
  }

  if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
    return "Upload was cancelled.";
  }

  if (error?.message === "Network Error") {
    return "Network error during upload. Please try again.";
  }

  return error?.message || "Image upload failed. Please try again.";
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const postToCloudinary = async ({
  file,
  folder,
  config,
  onProgress,
  signal,
}) => {
  const base64Data = await fileToBase64(file);
  let adminInfo;
  if (Cookies.get("adminInfo")) {
    adminInfo = JSON.parse(Cookies.get("adminInfo"));
  }
  const token = adminInfo?.token;

  const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:5058/api";
  const response = await axios.post(
    `${apiBaseUrl}/products/upload-image`,
    {
      image: base64Data,
      folder: folder || "product",
    },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      timeout: UPLOAD_TIMEOUT_MS,
      signal,
      onUploadProgress: (progressEvent) => {
        if (!onProgress || !progressEvent.total) return;
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      },
    }
  );

  const secureUrl = response?.data?.secureUrl;
  if (!secureUrl) {
    throw new Error("Backend did not return a valid image URL.");
  }

  return secureUrl;
};

export const uploadToCloudinary = async ({
  file,
  folder,
  config,
  onProgress,
  signal,
}) => {
  let lastError;

  for (let attempt = 0; attempt <= MAX_UPLOAD_RETRIES; attempt += 1) {
    try {
      return await postToCloudinary({
        file,
        folder,
        config,
        onProgress,
        signal,
      });
    } catch (error) {
      lastError = error;

      if (
        signal?.aborted ||
        error?.name === "CanceledError" ||
        error?.code === "ERR_CANCELED"
      ) {
        throw error;
      }

      if (!isRetryableCloudinaryError(error) || attempt === MAX_UPLOAD_RETRIES) {
        throw error;
      }

      await sleep(getRetryDelayMs(error, attempt));
    }
  }

  throw lastError;
};

export const validatePdfFile = (file, maxSizeBytes = MAX_PDF_SIZE_BYTES) => {
  if (!file) {
    return "No file selected.";
  }

  const type = (file.type || "").toLowerCase();
  const isPdf =
    ALLOWED_PDF_TYPES.has(type) ||
    String(file.name || "").toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return "Only PDF files are allowed.";
  }

  if (file.size > maxSizeBytes) {
    const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
    return `PDF must be smaller than ${maxMb} MB.`;
  }

  return null;
};

export const getRawUploadUrl = (imageUploadUrl) =>
  normalizeEnvValue(imageUploadUrl).replace("/image/upload", "/raw/upload");

export const uploadPdfToCloudinary = async ({
  file,
  folder = "datasheets",
  config,
  onProgress,
  signal,
}) => {
  const rawConfig = {
    ...config,
    uploadUrl: getRawUploadUrl(config.uploadUrl),
  };

  let lastError;

  for (let attempt = 0; attempt <= MAX_UPLOAD_RETRIES; attempt += 1) {
    try {
      return await postToCloudinary({
        file,
        folder,
        config: rawConfig,
        onProgress,
        signal,
      });
    } catch (error) {
      lastError = error;

      if (
        signal?.aborted ||
        error?.name === "CanceledError" ||
        error?.code === "ERR_CANCELED"
      ) {
        throw error;
      }

      if (!isRetryableCloudinaryError(error) || attempt === MAX_UPLOAD_RETRIES) {
        throw error;
      }

      await sleep(getRetryDelayMs(error, attempt));
    }
  }

  throw lastError;
};

