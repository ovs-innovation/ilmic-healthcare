import { renderHomepageIcon } from "@utils/homepageIcons";
import { credentials } from "@utils/kureHomepageRichContent";

const CredentialsStrip = () => (
  <section className="kure-credentials">
    <div className="kure-container">
      <div className="kure-credentials__header">
        <span className="kure-eyebrow !text-[#FF9933]">Our Standards</span>
        <h2 className="kure-credentials__title">
          Certificates &amp; Compliance
        </h2>
        <p className="kure-credentials__subtitle">
          Government-approved pharmaceutical wholesaler operating within Indian
          regulations — GDP practices, licensed distribution &amp; ethical supply.
        </p>
      </div>
      <div className="kure-credentials__grid">
        {credentials.map((item) => (
          <div key={item.title} className="kure-credentials__card">
            <span className="kure-credentials__icon">
              {renderHomepageIcon(item.icon, "w-5 h-5")}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CredentialsStrip;
