import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaStar, FaCheckCircle } from 'react-icons/fa';

const TestimonialSlider = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialScrollRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Dayana Hernandez",
      date: "2022-01-27",
      avatar: "D",
      avatarBg: "bg-red-800",
      text: "We use PowerQ Test and Tag Services. They are very professional, reliable, always on time, and send the reports usually the next day. Very Happy with their Service",
      hasImage: false,
    },
    {
      id: 2,
      name: "Lucinda Gulliver",
      date: "2021-02-26",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      avatarBg: "bg-purple-200",
      text: "Professional, quick and very easy to deal with. Lovely communication",
      hasImage: true,
    },
    {
      id: 3,
      name: 'Max "The Big Fundamental" Powers',
      date: "2020-05-01",
      avatar: "M",
      avatarBg: "bg-amber-800",
      text: "Very prompt and Professional service. Urgently needed a job done first thing the following day. The Boys at PowerQ moved some jobs around to help me out. Will...",
      hasReadMore: true,
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

  const totalTestimonials = testimonials.length;
  const cardsPerView = 3;

  const scrollToTestimonial = (index) => {
    if (testimonialScrollRef.current) {
      const cardWidth = 320 + 24;
      const scrollPosition = index * cardWidth;
      testimonialScrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
    setCurrentTestimonialIndex(index);
  };

  const nextTestimonial = () => {
    const maxIndex = Math.max(totalTestimonials - cardsPerView, 0);
    const nextIndex =
      currentTestimonialIndex >= maxIndex ? 0 : currentTestimonialIndex + 1;
    scrollToTestimonial(nextIndex);
  };

  const prevTestimonial = () => {
    const maxIndex = Math.max(totalTestimonials - cardsPerView, 0);
    const prevIndex =
      currentTestimonialIndex === 0 ? maxIndex : currentTestimonialIndex - 1;
    scrollToTestimonial(prevIndex);
  };

  useEffect(() => {
    autoScrollIntervalRef.current = setInterval(() => {
      const maxIndex = Math.max(totalTestimonials - cardsPerView, 0);
      setCurrentTestimonialIndex((prevIndex) => {
        const nextIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1;
        if (testimonialScrollRef.current) {
          const cardWidth = 320 + 24;
          testimonialScrollRef.current.scrollTo({
            left: nextIndex * cardWidth,
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(autoScrollIntervalRef.current);
  }, [totalTestimonials]);

  return (
    <div className="bg-[#f8fafc] py-16 relative overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full bg-amber-50 border border-amber-100">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-400 text-xs" />)}
            </div>
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">5-Star Reviews</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">Happy Clients</span> Say
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-5 rounded-full" />
        </div>

        <div className="relative">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 z-20 bg-white border border-gray-100 rounded-full p-3.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hidden lg:flex items-center justify-center group"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft className="text-amber-500 group-hover:scale-110 transition-transform text-sm" />
          </button>

          <div
            ref={testimonialScrollRef}
            className="overflow-x-hidden pb-4 mx-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%',
              maxWidth: '1056px'
            }}
          >
            <div
              className="flex gap-4 transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonialIndex * 0}px)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative overflow-hidden bg-white rounded-2xl border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 sm:p-7 flex-shrink-0 flex flex-col space-y-4 hover:shadow-[0_15px_40px_rgba(251,191,36,0.1)] transition-all duration-400 hover:-translate-y-1 group testimonial-card-wrap"
                >
                  {/* Quote Mark */}
                  <div className="absolute top-5 right-5 opacity-[0.06] group-hover:opacity-10 transition-opacity">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H14.017C13.4647 8 13.017 8.44772 13.017 9V15C13.017 17.7614 15.2556 20 18.017 20H18.517C19.0693 20 19.517 19.5523 19.517 19C19.517 18.4477 19.0693 18 18.517 18H18.017C17.4647 18 17.017 17.5523 17.017 17H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H5.017C4.46472 8 4.017 8.44772 4.017 9V15C4.017 17.7614 6.25558 20 9.017 20H9.517C10.0693 20 10.517 19.5523 10.517 19C10.517 18.4477 10.0693 18 9.517 18H9.017C8.46472 18 8.017 17.5523 8.017 17H5.017V21Z" />
                    </svg>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-400 text-xs" />)}
                    <FaCheckCircle className="text-green-500 ml-2 text-xs" />
                  </div>

                  {/* Review text */}
                  <p className="text-gray-600 text-sm leading-relaxed font-medium flex-grow">
                    "{testimonial.text}"
                  </p>
                  {testimonial.hasReadMore && (
                    <button className="text-amber-500 text-[10px] font-black uppercase tracking-wider hover:underline text-left">
                      Read full story
                    </button>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                    <div className={`relative w-10 h-10 rounded-full ${testimonial.avatarBg} flex items-center justify-center flex-shrink-0 ${testimonial.hasImage ? 'overflow-hidden' : ''}`}>
                      {testimonial.hasImage ? (
                        <Image src={testimonial.avatar} alt={testimonial.name} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-100">
                        <span className="text-[7px] font-black text-gray-700">PQ</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-sm tracking-tight leading-none">{testimonial.name}</h4>
                      <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-0.5">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 z-20 bg-white border border-gray-100 rounded-full p-3.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hidden lg:flex items-center justify-center group"
            aria-label="Next testimonials"
          >
            <FaChevronRight className="text-amber-500 group-hover:scale-110 transition-transform text-sm" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(totalTestimonials - cardsPerView + 1, 1) }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToTestimonial(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentTestimonialIndex === i ? 'w-6 bg-amber-400' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card-wrap { min-width: 260px; max-width: 260px; }
        @media (min-width: 480px)  { .testimonial-card-wrap { min-width: 290px; max-width: 290px; } }
        @media (min-width: 640px)  { .testimonial-card-wrap { min-width: 310px; max-width: 310px; } }
        @media (min-width: 1024px) { .testimonial-card-wrap { min-width: 320px; max-width: 320px; } }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
