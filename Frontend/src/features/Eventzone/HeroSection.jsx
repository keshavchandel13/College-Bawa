import React from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[500px] flex items-center bg-[#f0f2f5] dark:bg-[#1a1a1a]">

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#f0f2f5] dark:bg-[#1a1a1a]">
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0 opacity-10">
          <defs>
            <pattern id="eventPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#5387f5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eventPattern)" />
        </svg>

        {/* Floating shapes */}
        <div className="absolute rounded-full opacity-20 bg-[#f1c40f] dark:opacity-15 w-16 h-16 top-10 left-10" />
        <div className="absolute rounded-full opacity-20 bg-[#e74c3c] dark:opacity-15 w-12 h-12 top-32 right-20" />
        <div className="absolute rounded-full opacity-20 bg-[#5387f5] dark:opacity-15 w-20 h-20 bottom-20 left-1/4" />
        <div className="absolute rounded-full opacity-20 bg-[#f1c40f] dark:opacity-15 w-14 h-14 bottom-32 right-10" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 py-20 text-center w-full">
        <h1 className="text-5xl md:text-[4.5rem] font-bold mb-6 text-[#5387f5] dark:text-white">
          Event Zone
        </h1>
        <p className="text-xl text-[#374151] dark:text-gray-300 mb-8 max-w-[700px] mx-auto leading-relaxed">
          Discover amazing events, connect with your community, and make memories that
          last a lifetime at College Bawa
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
          <button className="
            flex items-center gap-2 text-base font-medium px-8 py-3 rounded-full cursor-pointer
            bg-[#5387f5] dark:bg-[#2563eb] text-white border-none
            shadow-[0px_4px_12px_rgba(0,0,0,0.2)]
            hover:bg-[#003af8] dark:hover:bg-[#1d4ed8]
            hover:shadow-[0px_6px_14px_rgba(0,0,0,0.3)]
            transition-all duration-300
          ">
            <FaCalendarAlt className="w-5 h-5" /> Browse Events
          </button>
          <button className="
            flex items-center gap-2 text-base font-medium px-8 py-3 rounded-full cursor-pointer
            bg-transparent border-2 border-[#5387f5] text-[#5387f5]
            dark:border-[#60a5fa] dark:text-[#60a5fa]
            hover:bg-[#f9fafb] dark:hover:bg-[rgba(96,165,250,0.1)]
            transition-all duration-300
          ">
            <FaUsers className="w-5 h-5" /> Join Community
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0px_6px_16px_rgba(0,0,0,0.15)] dark:shadow-[0px_6px_16px_rgba(0,0,0,0.6)]">
            <div className="text-[2rem] font-bold mb-2 text-[#5387f5] dark:text-[#60a5fa]">150+</div>
            <p className="text-[#4b5563] dark:text-[#9ca3af]">Events This Month</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0px_6px_16px_rgba(0,0,0,0.15)] dark:shadow-[0px_6px_16px_rgba(0,0,0,0.6)]">
            <div className="text-[2rem] font-bold mb-2 text-[#e74c3c] dark:text-[#f87171]">2.5K+</div>
            <p className="text-[#4b5563] dark:text-[#9ca3af]">Active Students</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0px_6px_16px_rgba(0,0,0,0.15)] dark:shadow-[0px_6px_16px_rgba(0,0,0,0.6)]">
            <div className="text-[2rem] font-bold mb-2 text-[#f1c40f] dark:text-[#facc15]">50+</div>
            <p className="text-[#4b5563] dark:text-[#9ca3af]">Student Clubs</p>
          </div>
        </div>
      </div>
    </section>
  );
}