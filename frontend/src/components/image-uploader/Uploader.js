import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

import {
  getCloudinaryErrorMessage,
  getFrontendCloudinaryConfig,
  uploadToCloudinary,
  validateImageFile,
} from "@utils/cloudinaryUpload";

const Uploader = ({
  setImageUrl,
  imageUrl,
  isCompact,
  multiple,
  onUploadingChange,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const uploadSessionRef = useRef(0);
  const abortControllerRef = useRef(null);
  const isUploadingRef = useRef(false);

  const cloudinaryConfig = useMemo(() => getFrontendCloudinaryConfig(), []);

  const setUploadingState = useCallback(
    (value) => {
      isUploadingRef.current = value;
      setIsUploading(value);
      if (typeof onUploadingChange === "function") {
        onUploadingChange(value);
      }
    },
    [onUploadingChange]
  );

  const uploadFiles = useCallback(
    async (rawFiles) => {
      if (!cloudinaryConfig.valid) {
        toast.error(cloudinaryConfig.error);
        return;
      }

      if (isUploadingRef.current) {
        toast.error("Please wait for the current upload to finish.");
        return;
      }

      for (const file of rawFiles) {
        const validationError = validateImageFile(file);
        if (validationError) {
          toast.error(`${file.name}: ${validationError}`);
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

      setUploadingState(true);
      setUploadProgress(0);

      try {
        const uploadedUrls = [];

        for (let index = 0; index < rawFiles.length; index += 1) {
          if (sessionId !== uploadSessionRef.current) {
            return;
          }

          const file = rawFiles[index];
          const secureUrl = await uploadToCloudinary({
            file,
            config: cloudinaryConfig,
            signal: abortController.signal,
            onProgress: (fileProgress) => {
              const overallProgress = Math.round(
                ((index + fileProgress / 100) / rawFiles.length) * 100
              );
              setUploadProgress(overallProgress);
            },
          });

          uploadedUrls.push(secureUrl);
        }

        if (sessionId !== uploadSessionRef.current) {
          return;
        }

        if (multiple) {
          setImageUrl((current) => {
            const existing = Array.isArray(current)
              ? current
              : current
                ? [current]
                : [];
            return [...existing, ...uploadedUrls];
          });
        } else if (uploadedUrls.length > 0) {
          setImageUrl(uploadedUrls[0]);
        }

        setUploadProgress(100);
        toast.success(
          uploadedUrls.length > 1
            ? `${uploadedUrls.length} images uploaded successfully`
            : "Image uploaded successfully"
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.code === "ERR_CANCELED" ||
          sessionId !== uploadSessionRef.current
        ) {
          return;
        }

        toast.error(getCloudinaryErrorMessage(error));
      } finally {
        if (sessionId === uploadSessionRef.current) {
          setUploadingState(false);
          abortControllerRef.current = null;
        }
      }
    },
    [cloudinaryConfig, multiple, setImageUrl, setUploadingState]
  );

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      multiple: multiple || false,
      maxSize: 2000000,
      disabled: isUploading,
      onDrop: async (acceptedFiles) => {
        if (!acceptedFiles.length) return;
        await uploadFiles(acceptedFiles);
      },
    });

  useEffect(() => {
    if (!fileRejections.length) return;

    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        toast.error(`${file.name}: ${error.message}`);
      });
    });
  }, [fileRejections]);

  useEffect(
    () => () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    },
    []
  );

  const removeImage = (index) => {
    if (multiple) {
      const newImages = imageUrl.filter((_, i) => i !== index);
      setImageUrl(newImages);
    } else {
      setImageUrl("");
    }
  };

  if (isCompact) {
    const images = multiple
      ? Array.isArray(imageUrl)
        ? imageUrl
        : imageUrl
          ? [imageUrl]
          : []
      : imageUrl
        ? [imageUrl]
        : [];

    return (
      <div className="flex flex-wrap items-center gap-2">
        <div
          {...getRootProps()}
          className={`bg-white/10 hover:bg-white/20 px-3 h-[38px] rounded-lg flex items-center justify-center gap-2 border border-white/10 transition-all group shrink-0 ${
            isUploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className="text-white text-base group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            {isUploading ? `${uploadProgress}%` : "Add Photo"}
          </span>
        </div>

        {images.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="relative w-[38px] h-[38px] border border-white/20 rounded-lg overflow-hidden shadow-lg group"
          >
            <img
              src={url}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(i);
              }}
              className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
            >
              ×
            </button>
          </div>
        ))}

        {isUploading && images.length === 0 && (
          <div className="w-[38px] h-[38px] border border-white/20 rounded-lg flex items-center justify-center bg-white/5 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
        {isDragActive && (
          <span className="text-[10px] text-white/70 uppercase tracking-widest">
            Drop here
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`px-4 py-8 border-2 border-gray-200 border-dashed rounded-xl transition-colors bg-gray-50/50 ${
          isUploading
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:border-gray-300"
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-2xl text-gray-400 mb-2" />
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          {isUploading ? `Uploading ${uploadProgress}%` : "Upload Images"}
        </p>
      </div>

      {imageUrl && (
        <div className="flex flex-wrap gap-2 mt-4">
          {(multiple ? imageUrl : [imageUrl]).map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100 group"
            >
              <img
                src={url}
                className="w-full h-full object-cover"
                alt="preview"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Uploader;
