import React from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";

export function EventCard({ event, variant = "default" }) {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "cultural":     return "#e74c3c";
      case "technical":    return "#5387f5";
      case "sports":       return "#f1c40f";
      case "workshops":    return "#9b59b6";
      case "fests":        return "#e67e22";
      default:             return "#95a5a6";
    }
  };

  const isFeatured = variant === "featured";

  return (
    <div
      className={`
        flex flex-col overflow-hidden rounded-2xl
        bg-white dark:bg-[#1f2937]
        border dark:border-[#374151]
        shadow-[0_2px_6px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.6)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_6px_14px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_14px_rgba(0,0,0,0.6)]
        ${isFeatured ? "border-2 border-[#5387f5]" : "border-[#ddd]"}
      `}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-[190px] object-cover rounded-tl-2xl rounded-tr-2xl dark:brightness-[0.85]"
        />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
          style={{ backgroundColor: getCategoryColor(event.category) }}
        >
          {event.category}
        </div>

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#f1c40f]">
            <FaStar className="mr-1" /> Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-5 py-4">
        <h3 className="text-lg font-semibold mb-3 leading-snug text-[#222] dark:text-[#f3f4f6]">
          {event.title}
        </h3>

        {/* Details grid */}
        <div className="grid gap-2 mb-4 dark:text-[#d1d5db]">
          <div className="flex items-center gap-2 text-[#555] dark:text-[#d1d5db] text-sm">
            <FaCalendarAlt className="text-[#5387f5] flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#555] dark:text-[#d1d5db] text-sm">
            <FaClock className="text-[#5387f5] flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-[#555] dark:text-[#d1d5db] text-sm">
            <FaMapMarkerAlt className="text-[#5387f5] flex-shrink-0" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-[#555] dark:text-[#d1d5db] text-sm">
            <FaUsers className="text-[#5387f5] flex-shrink-0" />
            <span>{event.attendees} attending</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto border-t border-transparent dark:border-t dark:border-[#374151] pt-2">
          <span className="text-[13px] text-[#777] dark:text-[#9ca3af]">
            by {event.organizer}
          </span>
          <button className="
            bg-[#5387f5] text-white border-none
            px-4 py-2 text-sm rounded-full cursor-pointer font-medium
            hover:bg-[#003af8] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]
            dark:hover:shadow-[0_4px_8px_rgba(0,0,0,0.5)]
            transition-all duration-200
          ">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}