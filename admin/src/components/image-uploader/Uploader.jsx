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
        className={`border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md px-6 pt-5 pb-6 ${
          loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-green-500" />
        </span>
        <p className="text-sm mt-2">{t("DragYourImage")}</p>
        <em className="text-xs text-gray-400">
          {t("imageFormat")}
          {` (${targetWidth}x${targetHeight})`}
        </em>
        {isDragActive && (
          <p className="text-xs text-green-500 mt-2">Drop images here...</p>
        )}
      </div>

      {loading && (
        <div className="text-green-500 text-sm mt-2">
          {statusMessage} {uploadProgress > 0 ? `(${uploadProgress}%)` : ""}
        </div>
      )}

      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="relative">
            <img
              className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
              src={imageUrl}
              alt="product"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 focus:outline-none"
              onClick={() => handleRemoveImage(imageUrl)}
            >
              <FiXCircle />
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
};

export default Uploader;
