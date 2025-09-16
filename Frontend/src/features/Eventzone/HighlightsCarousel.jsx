import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import "../../styles/EventZone/highlightsCarousel.css";

export function HighlightsCarousel({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 5);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  if (featuredEvents.length === 0) return null;

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        {/* Header */}
        <div className="carousel-header">
          <div>
            <h2 className="carousel-title">
              <FaStar className="star-icon" /> Featured Events
            </h2>
            <p className="carousel-subtitle">
              Don't miss these exciting upcoming events
            </p>
          </div>

          <div className="carousel-nav desktop-only">
            <button className="nav-btn" onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            <button className="nav-btn" onClick={nextSlide}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Slides */}
        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredEvents.map((event) => (
              <div key={event.id} className="carousel-slide">
                <div className="event-card">
                  {/* Left side */}
                  <div className="event-details">
                    <div className="event-tags">
                      <span className="tag featured">Featured</span>
                      <span className="tag category">{event.category}</span>
                    </div>

                    <h3 className="event-title">{event.title}</h3>

                    <div className="event-info">
                      <div>📅 {event.date}</div>
                      <div>⏰ {event.time}</div>
                      <div>📍 {event.venue}</div>
                      <div>👥 {event.attendees} attending</div>
                    </div>

                    <p className="event-organizer">Organized by {event.organizer}</p>

                    <button className="register-btn">Register Now</button>
                  </div>

                  {/* Right side (image) */}
                  <div className="event-image-wrapper">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`dot ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>

        {/* Mobile nav */}
        <div className="carousel-mobile-nav mobile-only">
          <button className="mobile-btn" onClick={prevSlide}>
            <FaChevronLeft className="icon" /> Previous
          </button>
          <button className="mobile-btn" onClick={nextSlide}>
            Next <FaChevronRight className="icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
