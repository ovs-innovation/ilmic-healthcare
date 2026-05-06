import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiInfo, FiTag, FiShoppingCart, FiSettings, FiChevronRight } from 'react-icons/fi';
import ServiceServices from '@services/ServiceServices';
import ProductServices from '@services/ProductServices';
import useUtilsFunction from '@hooks/useUtilsFunction';
import MainModal from '@components/modal/MainModal';
import ProductCard from '@components/product/ProductCard';
import ProductEnquiryModal from '@components/modal/ProductEnquiryModal';

const ServicesSection = () => {
    const [services, setServices] = useState([]);
    const [activeService, setActiveService] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showingTranslateValue, currency, getNumber } = useUtilsFunction();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await ServiceServices.getShowingServices();
                setServices(data || []);
                if (data && data.length > 0) {
                    setActiveService(data[0]);
                }
            } catch (err) {
                console.error("Error fetching services:", err);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        if (activeService) {
            const fetchProducts = async () => {
                try {
                    setLoading(true);
                    const data = await ProductServices.getProductsByService({ serviceSlug: activeService.slug });
                    setProducts(data || []);
                } catch (err) {
                    console.error("Error fetching products:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }
    }, [activeService]);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <section className="bg-[#0b1d3d] py-12 sm:py-16 md:py-20 overflow-hidden relative">
            {/* Subtle background accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">
                            What We Offer
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">
                            Explore Our Services
                        </h2>
                        <div className="w-12 h-1 bg-[#ED1C24] rounded-full mb-10" />
                    </motion.div>
                    
                    {/* Service Tabs — wraps correctly on all screens */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14">
                        {services.map((service) => (
                            <button
                                key={service._id}
                                onClick={() => setActiveService(service)}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 active:scale-95 border ${
                                    activeService?._id === service._id
                                        ? "bg-white text-[#0b1d3d] border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                        : "bg-white/0 text-white/70 border-white/15 hover:bg-white/8 hover:text-white hover:border-white/30"
                                }`}
                            >
                                {showingTranslateValue(service.name)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid — 1 col mobile, 2 sm, 3 md, 4 lg, 5 xl */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                    <AnimatePresence mode="sync">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={`skeleton-${i}`} className="bg-white/5 rounded-2xl h-[320px] animate-pulse border border-white/5" />
                            ))
                        ) : (
                            products.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="h-full"
                                >
                                    <ProductCard 
                                        product={product} 
                                        onEnquire={(p) => handleViewDetails(p)} 
                                        overrideCategoryName={showingTranslateValue(activeService?.name)}
                                        hideHoverActions={true}
                                        hideAddToCart={true}
                                        forceEnquiry={true}
                                    />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {products.length === 0 && !loading && (
                    <div className="text-center py-20 bg-white/[0.03] rounded-2xl border border-white/8">
                        <FiSettings className="w-12 h-12 mx-auto mb-4 text-white/20 animate-spin-slow" />
                        <h3 className="text-xl font-bold text-white/70 mb-2">No Products Found</h3>
                        <p className="text-white/40 text-sm">We're updating our products for {showingTranslateValue(activeService?.name)}. Check back soon!</p>
                    </div>
                )}
            </div>

            {/* Product Enquiry Modal */}
            <ProductEnquiryModal
                modalOpen={isModalOpen}
                setModalOpen={setIsModalOpen}
                product={selectedProduct}
                selectedVariant={selectedProduct?.variants?.[0]}
            />

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default ServicesSection;
