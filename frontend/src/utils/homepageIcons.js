import {
  FiAward,
  FiGlobe,
  FiHeadphones,
  FiPackage,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

export const homepageIconMap = {
  FiShield: FiShield,
  FiAward: FiAward,
  FiHeadphones: FiHeadphones,
  FiUsers: FiUsers,
  FiTruck: FiTruck,
  FiPackage: FiPackage,
  FiGlobe: FiGlobe,
};

export const renderHomepageIcon = (name, className = "w-5 h-5 text-blue-400") => {
  const Icon = homepageIconMap[name] || FiShield;
  return <Icon className={className} />;
};
