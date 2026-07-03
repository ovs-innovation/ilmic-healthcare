import { useState } from "react";

const BrandLogo = ({ logo, name }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !logo) {
    return (
      <span className="text-xs font-black tracking-tight text-center leading-tight text-gray-500 px-1">
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      className="w-full h-full object-contain"
      loading="lazy"
      onError={() => setImgError(true)}
    />
  );
};

const BrandCard = ({ brand }) => (
  <div className="kure-brands-marquee-item kure-card flex flex-col items-center justify-center p-3">
    <BrandLogo logo={brand.logo} name={brand.name} />
  </div>
);

const FeaturedBrands = ({ brands }) => {
  if (!brands?.length) return null;

  const loopBrands = [...brands, ...brands];

  return (
    <>
      {/* Mobile & tablet — auto scroll */}
      <div className="kure-brands-marquee lg:hidden" aria-label="Featured brands">
        <div className="kure-brands-marquee-fade kure-brands-marquee-fade--left" />
        <div className="kure-brands-marquee-fade kure-brands-marquee-fade--right" />
        <div className="kure-brands-marquee-track">
          {loopBrands.map((brand, idx) => (
            <BrandCard key={`${brand._id || brand.name}-${idx}`} brand={brand} />
          ))}
        </div>
      </div>

      {/* Desktop — static grid */}
      <div className="hidden lg:flex flex-wrap items-center justify-center gap-4">
        {brands.map((brand, idx) => (
          <div
            key={brand._id || idx}
            className="kure-card w-32 h-32 flex flex-col items-center justify-center p-4 flex-shrink-0"
          >
            <BrandLogo logo={brand.logo} name={brand.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedBrands;
