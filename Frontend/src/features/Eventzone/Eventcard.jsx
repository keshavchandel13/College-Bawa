import React from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";
import "../../styles/EventZone/eventcard.css";

export function EventCard({ event, variant = "default" }) {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "cultural":
        return "#e74c3c";
      case "technical":
        return "#5387f5";
      case "sports":
        return "#f1c40f";
      case "workshops":
        return "#9b59b6";
      case "fests":
        return "#e67e22";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div
      className={`ez-event-card ${variant === "featured" ? "ez-featured" : ""}`}
      style={variant === "featured" ? { borderColor: "#5387f5" } : {}}
    >
      {/* Image Section */}
      <div className="ez-event-image-wrapper">
        <img src={event.image} alt={event.title} className="ez-event-image" />

        {/* Category Badge */}
        <div
          className="ez-event-badge"
          style={{ backgroundColor: getCategoryColor(event.category) }}
        >
          {event.category}
        </div>

        {/* Featured Badge */}
        {variant === "featured" && (
          <div className="ez-event-badge ez-featured-badge">
            <FaStar style={{ marginRight: "4px" }} /> Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="ez-event-content">
        <h3 className="ez-event-title">{event.title}</h3>

        <div className="ez-event-details">
          <div className="ez-event-detail">
            <FaCalendarAlt /> <span>{event.date}</span>
          </div>
          <div className="ez-event-detail">
            <FaClock /> <span>{event.time}</span>
          </div>
          <div className="ez-event-detail">
            <FaMapMarkerAlt /> <span>{event.venue}</span>
          </div>
          <div className="ez-event-detail">
            <FaUsers /> <span>{event.attendees} attending</span>
          </div>
        </div>

        <div className="ez-event-footer">
          <span className="ez-event-organizer">by {event.organizer}</span>
          <button className="ez-event-button">Register</button>
        </div>
      </div>
    </div>
  );
}
