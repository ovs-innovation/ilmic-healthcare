const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}) => {
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  const mxClass = align === "center" ? "mx-auto" : align === "left" ? "mr-auto" : "ml-auto";

  return (
    <div className={`mb-10 lg:mb-12 ${alignClass}`}>
      {eyebrow ? (
        <span className={`kure-eyebrow ${light ? "!text-[#FF9933]" : ""}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`kure-section-title ${light ? "!text-white" : ""} ${mxClass} max-w-3xl`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`kure-section-subtitle ${mxClass} ${light ? "!text-blue-100/80" : ""}`}
        >
          {subtitle}
        </p>
      ) : null}
      {align === "center" ? <div className="kure-gold-rule" /> : null}
    </div>
  );
};

export default SectionHeader;
