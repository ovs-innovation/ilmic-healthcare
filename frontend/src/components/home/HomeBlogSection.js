import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiBookOpen, FiArrowRight } from "react-icons/fi";
import BlogServices from "@services/BlogServices";
import CMSkeleton from "@components/preloader/CMSkeleton";

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanLeft(scrollLeft > 10);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await BlogServices.getShowingBlogs();
        setBlogs(data?.slice(0, 10) || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const t = setTimeout(checkScroll, 100);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", checkScroll);
    };
  }, [blogs]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (dir === "left" ? -400 : 400),
      behavior: "smooth",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getTitle = (titleObj) => {
    if (typeof titleObj === "string") return titleObj;
    if (typeof titleObj === "object" && titleObj !== null) {
      return titleObj.en || titleObj[Object.keys(titleObj)[0]] || "";
    }
    return "";
  };

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="bg-[#f8fafc] py-10 sm:py-16 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0b1d3d] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0b1d3d]/20">
              <FiBookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Latest Insights</h2>
              <div className="w-8 h-0.5 bg-[#ED1C24] mt-1.5 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1.5 text-[11px] font-black text-gray-500 hover:text-[#0b1d3d] transition-colors uppercase tracking-widest mr-2"
            >
              View All <FiArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center
                         text-gray-400 hover:border-[#0b1d3d] hover:text-[#0b1d3d] hover:bg-white
                         disabled:opacity-20 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center
                         text-gray-400 hover:border-[#0b1d3d] hover:text-[#0b1d3d] hover:bg-white
                         disabled:opacity-20 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-5 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm" style={{ width: 290 }}>
                <CMSkeleton count={1} height={175} loading={true} />
                <div className="p-4">
                  <CMSkeleton count={1} height={16} loading={true} />
                  <CMSkeleton count={1} height={14} loading={true} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth blog-scroll"
          >
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100/80 flex flex-col w-[85vw] max-w-[320px] sm:w-[280px] lg:w-[290px]"
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative w-full h-[175px] overflow-hidden bg-gray-50">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={getTitle(blog.title)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                         <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#ED1C24] text-white text-[8px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                        Compliance
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                   <p className="text-[9px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
                     {formatDate(blog.publishedAt || blog.createdAt)}
                   </p>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="text-[13px] font-black text-gray-900 mb-3 group-hover:text-[#0b1d3d] transition-colors duration-300 line-clamp-2 leading-snug">
                      {getTitle(blog.title)}
                    </h3>
                  </Link>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-auto inline-flex items-center text-[#ED1C24] font-black text-[10px] tracking-widest hover:gap-2 gap-1 transition-all uppercase"
                  >
                    Read More <FiArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <style jsx>{`
          .blog-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .blog-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div className="mt-6 flex md:hidden justify-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[11px] font-black text-gray-500 hover:text-[#0b1d3d] transition-all uppercase tracking-widest"
          >
            View All Insights <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
