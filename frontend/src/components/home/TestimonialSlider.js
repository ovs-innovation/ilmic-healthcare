import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaStar, FaCheckCircle } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Dayana Hernandez",
    date: "2022-01-27",
    avatar: "D",
    avatarBg: "bg-red-800",
    text: "We use Kure Pharma Test and Tag Services. They are very professional, reliable, always on time, and send the reports usually the next day. Very Happy with their Service",
    hasImage: false,
  },
  {
    id: 2,
    name: "Lucinda Gulliver",
    date: "2021-02-26",
    avatar: "L",
    avatarBg: "bg-purple-700",
    text: "Professional, quick and very easy to deal with. Lovely communication",
    hasImage: false,
  },
  {
    id: 3,
    name: 'Max "The Big Fundamental" Powers',
    date: "2020-05-01",
    avatar: "M",
    avatarBg: "bg-amber-800",
    text: "Very prompt and Professional service. Urgently needed a job done first thing the following day. The Boys at Kure Pharma moved some jobs around to help me out. Will definitely use again.",
    hasReadMore: false,
  },
  {
    id: 4,
    name: "Bon C",
    date: "2020-01-31",
    avatar: "B",
    avatarBg: "bg-blue-800",
    text: "Arrived on time even on a short notice. Excellent workmanship, timing and clear communication. Very professional, polite and respectful. They kept their work area clean. Pleased with price. Couldn't recommend them more highly.",
  },
  {
    id: 5,
    name: "Jason Tan",
    date: "2020-01-25",
    avatar: "J",
    avatarBg: "bg-green-800",
    text: "Great service, very flexible times and efficient. Thanks! Good price too.",
  },
  {
    id: 6,
    name: "Punardeep Singh",
    date: "2020-01-20",
    avatar: "P",
    avatarBg: "bg-indigo-800",
    text: "Good chaps with 'take your time' and 'do it properly' approach. Recommendable experience.",
  },
];

const getCardsPerView = (width) => {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
};

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const autoScrollRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isVisibleRef = useRef(false);
  const isPausedRef = useRef(false);

  const totalTestimonials = testimonials.length;
  const maxIndex = Math.max(totalTestimonials - cardsPerView, 0);

  const updateCardsPerView = useCallback(() => {
    setCardsPerView(getCardsPerView(window.innerWidth));
  }, []);

  const scrollToIndex = useCallback((index) => {
    const container = scrollRef.current;
    if (!container) return;

    const safeIndex = Math.min(Math.max(index, 0), maxIndex);
    const card = container.children[safeIndex];
    if (card) {
      // Only scroll inside the carousel — never scroll the whole page
      container.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth",
      });
    }
    currentIndexRef.current = safeIndex;
    setCurrentIndex(safeIndex);
  }, [maxIndex]);

  const next = useCallback(() => {
    scrollToIndex(currentIndexRef.current >= maxIndex ? 0 : currentIndexRef.current + 1);
  }, [maxIndex, scrollToIndex]);

  const prev = useCallback(() => {
    scrollToIndex(currentIndexRef.current <= 0 ? maxIndex : currentIndexRef.current - 1);
  }, [maxIndex, scrollToIndex]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, [updateCardsPerView]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Pause auto-slide when section is off-screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-slide only while section is visible and user is not interacting
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      if (!isVisibleRef.current || isPausedRef.current || document.hidden) return;
      next();
    }, 6000);

    return () => clearInterval(autoScrollRef.current);
  }, [next]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || !container.children.length) return;

    const containerLeft = container.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft - containerLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(Math.min(closestIndex, maxIndex));
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8fafc] py-10 sm:py-16 overflow-hidden"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
      onTouchStart={() => { isPausedRef.current = true; }}
      onTouchEnd={() => { isPausedRef.current = false; }}
    >
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-4 lg:px-12 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-5 rounded-full bg-amber-50 border border-amber-100">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-400 text-xs" />
              ))}
            </div>
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
              5-Star Reviews
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight px-2">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-ilmic-blue">
              Happy Clients
            </span>{" "}
            Say
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 sm:mt-5 rounded-full" />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-100 rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-xl transition-all hidden sm:flex items-center justify-center"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft className="text-amber-500 text-sm" />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 testimonial-scroll"
          >
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="relative flex-shrink-0 snap-start bg-white rounded-2xl border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-4 sm:p-6 lg:p-7 flex flex-col min-h-[220px] w-full min-w-full sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.75rem)]"
              >
                <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H14.017C13.4647 8 13.017 8.44772 13.017 9V15C13.017 17.7614 15.2556 20 18.017 20H18.517C19.0693 20 19.517 19.5523 19.517 19C19.517 18.4477 19.0693 18 18.517 18H18.017C17.4647 18 17.017 17.5523 17.017 17H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H5.017C4.46472 8 4.017 8.44772 4.017 9V15C4.017 17.7614 6.25558 20 9.017 20H9.517C10.0693 20 10.517 19.5523 10.517 19C10.517 18.4477 10.0693 18 9.517 18H9.017C8.46472 18 8.017 17.5523 8.017 17H5.017V21Z" />
                  </svg>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-xs" />
                  ))}
                  <FaCheckCircle className="text-green-500 ml-1 text-xs" />
                </div>

                <p className="text-gray-600 text-sm leading-relaxed font-medium flex-grow break-words">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-50">
                  <div
                    className={`relative w-10 h-10 rounded-full ${testimonial.avatarBg} flex items-center justify-center flex-shrink-0 overflow-hidden`}
                  >
                    {testimonial.hasImage ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-gray-900 text-sm tracking-tight leading-snug truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-0.5">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-100 rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-xl transition-all hidden sm:flex items-center justify-center"
            aria-label="Next testimonials"
          >
            <FaChevronRight className="text-amber-500 text-sm" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-6 bg-amber-400" : "w-1.5 bg-gray-200"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .testimonial-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;
