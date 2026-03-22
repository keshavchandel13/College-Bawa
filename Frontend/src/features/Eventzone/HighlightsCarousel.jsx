import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

export function HighlightsCarousel({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 5);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  if (featuredEvents.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-white dark:bg-[#111827]">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-[2rem] font-bold text-[#5387f5] dark:text-[#60a5fa] flex items-center gap-3">
              <FaStar className="w-8 h-8" /> Featured Events
            </h2>
            <p className="text-[#4b5563] dark:text-gray-300 text-lg">
              Don't miss these exciting upcoming events
            </p>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              className="border-2 border-[#5387f5] dark:border-[#60a5fa] text-[#5387f5] dark:text-[#60a5fa] bg-white dark:bg-[#1f2937] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#f0f2f5] dark:hover:bg-[#374151] transition-all duration-200"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="border-2 border-[#5387f5] dark:border-[#60a5fa] text-[#5387f5] dark:text-[#60a5fa] bg-white dark:bg-[#1f2937] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#f0f2f5] dark:hover:bg-[#374151] transition-all duration-200"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredEvents.map((event) => (
              <div key={event.id} className="flex-shrink-0 w-full px-2">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-center bg-white dark:bg-[#1f2937] rounded-2xl p-8 shadow-[0_6px_16px_rgba(0,0,0,0.15)] dark:shadow-[0_6px_16px_rgba(0,0,0,0.6)]">

                  {/* Left: details */}
                  <div>
                    <div className="flex gap-3 mb-4">
                      <span className="px-3 py-1.5 rounded-full text-sm font-medium text-white bg-[#f1c40f] dark:bg-[#facc15]">
                        Featured
                      </span>
                      <span className="px-3 py-1.5 rounded-full text-sm font-medium text-white bg-[#e74c3c] dark:bg-[#ef4444]">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-[2rem] font-bold mb-4 text-gray-900 dark:text-white">
                      {event.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#4b5563] dark:text-gray-300 mb-3">
                      <div>📅 {event.date}</div>
                      <div>⏰ {event.time}</div>
                      <div>📍 {event.venue}</div>
                      <div>👥 {event.attendees} attending</div>
                    </div>

                    <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm mb-4">
                      Organized by {event.organizer}
                    </p>

                    <button className="
                      bg-[#5387f5] dark:bg-[#2563eb] text-white
                      px-8 py-3 rounded-full border-none text-base font-medium cursor-pointer
                      shadow-[0px_6px_14px_rgba(0,0,0,0.2)] dark:shadow-[0px_6px_14px_rgba(0,0,0,0.6)]
                      hover:bg-[#003af8] dark:hover:bg-[#1d4ed8]
                      hover:shadow-[0px_8px_18px_rgba(0,0,0,0.25)] dark:hover:shadow-[0px_8px_18px_rgba(0,0,0,0.8)]
                      transition-all duration-300
                    ">
                      Register Now
                    </button>
                  </div>

                  {/* Right: image */}
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[280px] lg:h-[320px] object-cover rounded-xl shadow-[0px_6px_16px_rgba(0,0,0,0.15)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full bg-[#5387f5] dark:bg-[#60a5fa] transition-all duration-300
                ${index === currentIndex ? "scale-125 opacity-100" : "opacity-50"}`}
            />
          ))}
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="border-2 border-[#5387f5] dark:border-[#60a5fa] text-[#5387f5] dark:text-[#60a5fa] bg-white dark:bg-[#1f2937] rounded-full px-6 py-2 text-sm font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#f0f2f5] dark:hover:bg-[#374151] transition-all duration-200"
          >
            <FaChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={nextSlide}
            className="border-2 border-[#5387f5] dark:border-[#60a5fa] text-[#5387f5] dark:text-[#60a5fa] bg-white dark:bg-[#1f2937] rounded-full px-6 py-2 text-sm font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#f0f2f5] dark:hover:bg-[#374151] transition-all duration-200"
          >
            Next <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}