const CatalogProductImage = ({ src, alt, className = "" }) => {
  if (!src) return null;

  return (
    <div className={`ilmic-catalog-img-frame ${className}`}>
      <img src={src} alt={alt || "Product"} loading="lazy" decoding="async" />
    </div>
  );
};

export default CatalogProductImage;
