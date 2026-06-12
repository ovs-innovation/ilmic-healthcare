import React from "react";

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.85,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Svg = ({ children, className, size = 24 }) => (
  <svg {...base} width={size} height={size} className={className}>
    {children}
  </svg>
);

/** Section badge — chunky power bolt */
export const IconPowerBadge = ({ className }) => (
  <Svg className={className} size={16}>
    <path
      d="M13.2 2.5L8.4 12.2h4.1L10.5 21.5l7.8-10.4h-4.2L13.2 2.5z"
      fill="currentColor"
      stroke="none"
    />
  </Svg>
);

/** Shield + tick — genuine products */
export const IconGenuine = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3.2L5.5 6.2v5.4c0 4.1 2.8 7.2 6.5 8.9 3.7-1.7 6.5-4.8 6.5-8.9V6.2L12 3.2z" />
    <path d="M9.2 12.1l1.9 1.9 4.2-4.4" strokeWidth={2.1} />
  </Svg>
);

/** Delivery truck — side profile */
export const IconDelivery = ({ className }) => (
  <Svg className={className}>
    <path d="M2.5 7.5h11v8.5H2.5z" />
    <path d="M13.5 10h3.2l2.8 3.2v2.8h-6V10z" />
    <circle cx="6.5" cy="17.5" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="17.2" cy="17.5" r="1.6" fill="currentColor" stroke="none" />
    <path d="M8.2 17.5h7.5" />
  </Svg>
);

/** Wrench + chip — technical support */
export const IconTechnical = ({ className }) => (
  <Svg className={className}>
    <path d="M5.2 14.8l-1.4 1.4a2.2 2.2 0 003.1 3.1l1.4-1.4" />
    <path d="M9.8 10.2l4.2-4.2a2.8 2.8 0 014 4l-4.2 4.2" />
    <rect x="11.5" y="11.5" width="7.5" height="5.5" rx="1" />
    <path d="M13.2 13.2h4.2M13.2 15.2h2.8" strokeWidth={1.5} />
  </Svg>
);

/** Warranty medal */
export const IconWarranty = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="9.5" r="4.6" />
    <path d="M12 14.2v2.2" />
    <path d="M8.8 20.2l3.2-1.8 3.2 1.8" />
    <path d="M9.6 9.8l1.6 1.6 3-3.2" strokeWidth={2} />
  </Svg>
);

/** Battery pack — prismatic + cell */
export const IconBatteryPack = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="7" width="11" height="10" rx="1.2" />
    <path d="M15 10.5h1.8c.6 0 1 .4 1 .9v4.2c0 .5-.4.9-1 .9H15" />
    <path d="M7 10v5M10 10v5" strokeWidth={1.4} />
    <rect x="17.5" y="9" width="2.5" height="6" rx="1.2" fill="currentColor" stroke="none" opacity="0.35" />
  </Svg>
);

/** Solar / EV energy */
export const IconEnergyUse = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="3.8" />
    <path d="M12 2.8v2.2M12 18.8v2.2M2.8 12h2.2M18.8 12h2.2" strokeWidth={1.6} />
    <path d="M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" strokeWidth={1.5} />
  </Svg>
);

/** Happy customers — two people */
export const IconCustomers = ({ className }) => (
  <Svg className={className}>
    <circle cx="9" cy="8.2" r="2.6" />
    <path d="M4.5 18.5c.6-2.8 2.4-4.2 4.5-4.2s3.9 1.4 4.5 4.2" />
    <circle cx="16.8" cy="9" r="2.1" />
    <path d="M14.2 18.5c.5-2.1 1.8-3.2 3.4-3.2 1.2 0 2.2.7 2.9 2" strokeWidth={1.6} />
  </Svg>
);

/** Packed order box */
export const IconOrderBox = ({ className }) => (
  <Svg className={className}>
    <path d="M4 8.5l8-3.8 8 3.8v8.2l-8 3.8-8-3.8V8.5z" />
    <path d="M12 4.7v16.8" strokeWidth={1.5} />
    <path d="M4 8.5l8 4.2 8-4.2" strokeWidth={1.5} />
  </Svg>
);

/** Hand-drawn style star */
export const IconSatisfaction = ({ className }) => (
  <Svg className={className}>
    <path
      d="M12 3.8l2.1 4.5 4.9.8-3.5 3.6.8 5-4.3-2.4-4.3 2.4.8-5-3.5-3.6 4.9-.8L12 3.8z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.8}
    />
  </Svg>
);

/** Headset support — 24/7 */
export const IconLiveSupport = ({ className }) => (
  <Svg className={className}>
    <path d="M4.5 12.5v-1.8a7.5 7.5 0 0115 0v1.8" />
    <rect x="3" y="12" width="3.5" height="5.5" rx="1.5" />
    <rect x="17.5" y="12" width="3.5" height="5.5" rx="1.5" />
    <path d="M6.5 17.5h2.2a3.2 3.2 0 006.6 0h2.2" />
  </Svg>
);

/** Browse catalog */
export const IconBrowseCatalog = ({ className }) => (
  <Svg className={className}>
    <circle cx="10.2" cy="10.2" r="5.8" />
    <path d="M14.8 14.8L19 19" strokeWidth={2.1} />
    <path d="M4.5 19.5h4.2M10.2 19.5h4.2" strokeWidth={1.6} opacity="0.45" />
  </Svg>
);

/** Quote & order */
export const IconQuoteOrder = ({ className }) => (
  <Svg className={className}>
    <path d="M6.5 3.5h8.5a1.8 1.8 0 011.8 1.8v12H9a1.8 1.8 0 01-1.8-1.8V3.5z" />
    <path d="M9 3.5v12.5" strokeWidth={1.5} />
    <path d="M11.5 8h4.5M11.5 10.8h3.5" strokeWidth={1.5} />
    <circle cx="17" cy="17.2" r="3" />
    <path d="M15.8 17.2l.9.9 1.8-1.9" strokeWidth={1.9} />
  </Svg>
);

/** Delivered with support */
export const IconDeliverSupport = ({ className }) => (
  <Svg className={className}>
    <path d="M2.5 8h10v7.5H2.5z" />
    <path d="M12.5 10.2h2.8l2.4 2.8v2.5h-5.2V10.2z" />
    <circle cx="6" cy="17" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15.8" cy="17" r="1.5" fill="currentColor" stroke="none" />
    <path d="M17.8 5.5l1.8 1.8-3.2 3.2" strokeWidth={1.9} />
  </Svg>
);

/** CTA — custom battery outline */
export const IconCustomBattery = ({ className }) => (
  <Svg className={className} size={18}>
    <rect x="3" y="7" width="14" height="10" rx="1.5" />
    <path d="M17 10.5h1.5c.5 0 .9.4.9.9v3.2c0 .5-.4.9-.9.9H17" />
    <path d="M7 10.5v6M11 10.5v6" strokeWidth={1.5} />
  </Svg>
);

/** Phone handset */
export const IconPhoneHandset = ({ className }) => (
  <Svg className={className} size={18}>
    <path d="M6.8 4.5c.4-.9 1.5-1.2 2.3-.6l1.6 1.2c.7.5.8 1.5.3 2.2l-.9 1.2c1.2 2.4 3.2 4.4 5.6 5.6l1.2-.9c.7-.5 1.7-.4 2.2.3l1.2 1.6c.6.8.3 1.9-.6 2.3-1.2.5-2.5.7-3.8.5-3.4-.6-6.4-3.6-7-7-.2-1.3 0-2.6.5-3.8z" />
  </Svg>
);

const TILE = {
  blue: "bg-gradient-to-br from-[#0088FF]/18 to-[#0088FF]/6 text-[#006fd6] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
  red: "bg-gradient-to-br from-[#ED1C24]/16 to-[#ED1C24]/6 text-[#c9181f] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
  green: "bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
  navy: "bg-gradient-to-br from-[#0b1d3d]/12 to-[#0b1d3d]/5 text-[#0b1d3d] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
  amber: "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
};

export const WhyIconTile = ({ variant = "blue", size = "md", children, className = "" }) => {
  const sizes = {
    sm: "w-7 h-7 rounded-[9px]",
    md: "w-10 h-10 sm:w-11 sm:h-11 rounded-xl",
    lg: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl",
    stat: "w-10 h-10 rounded-[11px]",
  };

  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center ${sizes[size]} ${TILE[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const WHY_ICON_MAP = {
  genuine: IconGenuine,
  delivery: IconDelivery,
  technical: IconTechnical,
  warranty: IconWarranty,
  battery: IconBatteryPack,
  energy: IconEnergyUse,
  customers: IconCustomers,
  orders: IconOrderBox,
  satisfaction: IconSatisfaction,
  support: IconLiveSupport,
};
