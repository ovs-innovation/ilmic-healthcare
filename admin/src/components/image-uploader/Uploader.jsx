import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { t } from "i18next";
import { useDropzone } from "react-dropzone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import Pica from "pica";

import useUtilsFunction from "@/hooks/useUtilsFunction";
import { notifyError, notifySuccess } from "@/utils/toast";
import Container from "@/components/image-uploader/Container";
import { useImageUploadContext } from "@/context/ImageUploadContext";
import {
  getAdminCloudinaryConfig,
  getCloudinaryErrorMessage,
  uploadToCloudinary,
  validateImageFile,
} from "@/utils/cloudinaryUpload";

const Uploader = ({
  setImageUrl,
  imageUrl,
  product,
  folder,
  targetWidth = 800,
  targetHeight = 800,
  maxFilesOverride,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const pica = useMemo(() => Pica(), []);
  const { globalSetting } = useUtilsFunction();
  const { tryBeginUpload, endUpload, isUploading: isGlobalUploading } =
    useImageUploadContext();
  const uploadSessionRef = useRef(0);
  const abortControllerRef = useRef(null);

  const cloudinaryConfig = useMemo(() => getAdminCloudinaryConfig(), []);
  const maxFiles =
    Number(maxFilesOverride) > 0
      ? Number(maxFilesOverride)
      : globalSetting?.number_of_image_per_product || 10;

  const resizeImageToFixedDimensions = useCallback(
    async (file, width, height) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();

      try {
        img.src = objectUrl;
        await img.decode();

        let ratio = Math.min(width / img.width, height / img.height);
        if (ratio > 1) ratio = 1;

        const canvasWidth = Math.round(img.width * ratio);
        const canvasHeight = Math.round(img.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const result = await pica.resize(img, canvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        });
        const blob = await pica.toBlob(result, file.type || "image/jpeg", 0.9);
        return new File([blob], file.name, {
          type: file.type || "image/jpeg",
        });
      } catch (error) {
        throw new Error(
          `Could not process "${file.name}". Please try a different image.`
        );
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    },
    [pica]
  );

  const uploadFiles = useCallback(
    async (rawFiles) => {
      if (!cloudinaryConfig.valid) {
        notifyError(cloudinaryConfig.error);
        return;
      }

      if (!tryBeginUpload()) {
        notifyError("Please wait for the current upload to finish.");
        return;
      }

      const existingCount = Array.isArray(imageUrl) ? imageUrl.length : imageUrl ? 1 : 0;

      if (product && existingCount + rawFiles.length > maxFiles) {
        endUpload();
        notifyError(`Maximum ${maxFiles} images can be uploaded.`);
        return;
      }

      for (const file of rawFiles) {
        const validationError = validateImageFile(file);
        if (validationError) {
          endUpload();
          notifyError(`${file.name}: ${validationError}`);
          return;
        }
      }

      uploadSessionRef.current += 1;
      const sessionId = uploadSessionRef.current;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setLoading(true);
      setUploadProgress(0);
      setStatusMessage("Uploading...");

      try {
        const preparedFiles = [];
        for (const file of rawFiles) {
          try {
            const resizedFile = await resizeImageToFixedDimensions(
              file,
              targetWidth,
              targetHeight
            );
            preparedFiles.push(resizedFile);
          } catch (error) {
            throw new Error(error.message || `Failed to prepare ${file.name}.`);
          }
        }

        const uploadedUrls = [];

        for (let index = 0; index < preparedFiles.length; index += 1) {
          if (sessionId !== uploadSessionRef.current) {
            return;
          }

          const file = preparedFiles[index];
          const secureUrl = await uploadToCloudinary({
            file,
            folder,
            config: cloudinaryConfig,
            signal: abortController.signal,
            onProgress: (fileProgress) => {
              const overallProgress = Math.round(
                ((index + fileProgress / 100) / preparedFiles.length) * 100
              );
              setUploadProgress(overallProgress);
            },
          });

          uploadedUrls.push(secureUrl);
        }

        if (sessionId !== uploadSessionRef.current) {
          return;
        }

        if (product) {
          setImageUrl((currentUrls) => [...(currentUrls || []), ...uploadedUrls]);
        } else if (uploadedUrls.length > 0) {
          setImageUrl(uploadedUrls[uploadedUrls.length - 1]);
        }

        setUploadProgress(100);
        setStatusMessage("Upload complete");
        notifySuccess(
          uploadedUrls.length > 1
            ? `${uploadedUrls.length} images uploaded successfully!`
            : "Image uploaded successfully!"
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.code === "ERR_CANCELED" ||
          sessionId !== uploadSessionRef.current
        ) {
          return;
        }

        notifyError(getCloudinaryErrorMessage(error));
        setStatusMessage("Upload failed");
      } finally {
        if (sessionId === uploadSessionRef.current) {
          endUpload();
          setLoading(false);
          abortControllerRef.current = null;
        }
      }
    },
    [
      cloudinaryConfig,
      endUpload,
      folder,
      imageUrl,
      maxFiles,
      product,
      resizeImageToFixedDimensions,
      setImageUrl,
      targetHeight,
      targetWidth,
      tryBeginUpload,
    ]
  );

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      multiple: Boolean(product),
      maxSize: 5242880,
      maxFiles: product ? maxFiles : 1,
      disabled: loading || isGlobalUploading,
      onDrop: async (acceptedFiles) => {
        if (!acceptedFiles.length) return;
        await uploadFiles(acceptedFiles);
      },
    });

  useEffect(() => {
    if (!fileRejections.length) return;

    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        if (error.code === "too-many-files") {
          notifyError(`Maximum ${maxFiles} images can be uploaded.`);
          return;
        }
        notifyError(`${file.name}: ${error.message}`);
      });
    });
  }, [fileRejections, maxFiles]);

  useEffect(
    () => () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    },
    []
  );

  const handleRemoveImage = (img) => {
    try {
      if (product) {
        setImageUrl((currentUrls) => currentUrls?.filter((item) => item !== img));
      } else {
        setImageUrl("");
      }
    } catch (error) {
      notifyError(getCloudinaryErrorMessage(error));
    }
  };

  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className={`premium-upload-area relative overflow-hidden rounded-xl p-8 transition-all duration-300 ${
          isDragActive
            ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/10 shadow-inner scale-[0.99]"
            : "border-slate-300 dark:border-slate-700 bg-slate-50/40 hover:bg-slate-50 dark:bg-slate-800/20 dark:hover:bg-slate-800/40 hover:border-slate-400 dark:hover:border-slate-600"
        } ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className={`p-4 rounded-full transition-transform duration-300 ${isDragActive ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 scale-110" : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"}`}>
            <FiUploadCloud className="text-3xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Click or Drag Images Here
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
              Only JPG, PNG, and WebP images accepted (Max 5MB)
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
              Ideal resolution: {targetWidth}x{targetHeight}
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-xl space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>{statusMessage}</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <aside className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="group relative aspect-square w-24 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <img
              className="w-full h-full object-cover"
              src={imageUrl}
              alt="product"
            />
            <button
              type="button"
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 focus:outline-none"
              onClick={() => handleRemoveImage(imageUrl)}
            >
              <FiXCircle className="text-base" />
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
};

export default Uploader;
