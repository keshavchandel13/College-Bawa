import React from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import "../../styles/EventZone/herosection.css";

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background Pattern */}
      <div className="hero-bg">
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="hero-pattern">
          <defs>
            <pattern
              id="eventPattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="#5387f5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eventPattern)" />
        </svg>

        {/* Floating shapes */}
        <div className="shape yellow top-left"></div>
        <div className="shape red top-right"></div>
        <div className="shape blue bottom-left"></div>
        <div className="shape yellow bottom-right"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Event Zone</h1>
          <p className="hero-subtitle">
            Discover amazing events, connect with your community, and make memories that
            last a lifetime at College Bawa
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary">
              <FaCalendarAlt className="icon" /> Browse Events
            </button>
            <button className="btn btn-outline">
              <FaUsers className="icon" /> Join Community
            </button>
          </div>

          {/* Quick Stats */}
          <div className="hero-stats">
            <div className="stat-box">
              <div className="stat-number blue">150+</div>
              <p className="stat-text">Events This Month</p>
            </div>
            <div className="stat-box">
              <div className="stat-number red">2.5K+</div>
              <p className="stat-text">Active Students</p>
            </div>
            <div className="stat-box">
              <div className="stat-number yellow">50+</div>
              <p className="stat-text">Student Clubs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
