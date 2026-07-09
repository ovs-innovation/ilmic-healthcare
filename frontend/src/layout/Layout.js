import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import { ILMIC_LOGO } from "@utils/ilmicDefaults";

const Layout = ({ title, description, children }) => (
  <>
    <ToastContainer />
      <div className="font-sans overflow-x-hidden min-h-screen flex flex-col bg-white text-[#0F3A66]">
      <Head>
        <title>{title ? `ILMIC Health Care | ${title}` : "ILMIC Health Care | Oncology, General Pharma & Surgical"}</title>
        <meta
          name="description"
          content={description || "ILMIC Health Care Pvt. Ltd. — Oncology, General Pharma, Surgical products, hospital management & medical tourism. Delhi, India & Luanda, Angola."}
        />
        <link rel="icon" href={ILMIC_LOGO} />
      </Head>

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>

      <div className="fixed right-4 bottom-6 z-30">
        <a href="https://wa.me/918810272080" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-105" aria-label="WhatsApp">
          <FaWhatsapp className="w-7 h-7" />
        </a>
      </div>

      <Footer />
    </div>
  </>
);

export default Layout;
