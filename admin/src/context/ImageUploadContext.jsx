import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const ImageUploadContext = createContext({
  isUploading: false,
  tryBeginUpload: () => true,
  endUpload: () => {},
});

export const ImageUploadProvider = ({ children }) => {
  const uploadLockRef = useRef(false);
  const [isUploading, setIsUploading] = useState(false);

  const tryBeginUpload = useCallback(() => {
    if (uploadLockRef.current) {
      return false;
    }

    uploadLockRef.current = true;
    setIsUploading(true);
    return true;
  }, []);

  const endUpload = useCallback(() => {
    uploadLockRef.current = false;
    setIsUploading(false);
  }, []);

  const value = useMemo(
    () => ({
      isUploading,
      tryBeginUpload,
      endUpload,
    }),
    [isUploading, tryBeginUpload, endUpload]
  );

  return (
    <ImageUploadContext.Provider value={value}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUploadContext = () => useContext(ImageUploadContext);

export const useFormSubmitBusy = (isSubmitting = false) => {
  const { isUploading } = useImageUploadContext();
  return isSubmitting || isUploading;
};
