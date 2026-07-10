import { renderHomepageIcon } from "@utils/homepageIcons";
import { credentials } from "@utils/ilmicHomepageRichContent";

const CredentialsStrip = () => (
  <section className="ilmic-credentials">
    <div className="ilmic-container">
      <div className="ilmic-credentials__header">
        <span className="ilmic-eyebrow !text-[#FF9933]">Our Standards</span>
        <h2 className="ilmic-credentials__title">
          Certificates &amp; Compliance
        </h2>
        <p className="ilmic-credentials__subtitle">
          Government-approved pharmaceutical wholesaler operating within Indian
          regulations — GDP practices, licensed distribution &amp; ethical supply.
        </p>
      </div>
      <div className="ilmic-credentials__grid">
        {credentials.map((item) => (
          <div key={item.title} className="ilmic-credentials__card">
            <span className="ilmic-credentials__icon">
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
