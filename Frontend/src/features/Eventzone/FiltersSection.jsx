import React from "react";
import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import "../../styles/EventZone/filtersSection.css";

export function FiltersSection({ activeCategory, onCategoryChange, searchTerm, onSearchChange }) {
  const categories = [
    { name: "All", color: "#95a5a6" },
    { name: "Cultural", color: "#e74c3c" },
    { name: "Technical", color: "#5387f5" },
    { name: "Sports", color: "#f1c40f" },
    { name: "Workshops", color: "#9b59b6" },
    { name: "Fests", color: "#e67e22" },
  ];

  return (
    <div className="filters-container">
      {/* Search Bar + Button */}
      <div className="filters-top">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button className="filter-btn">
          <FaFilter /> More Filters
        </button>
      </div>

      {/* Category Buttons */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`category-btn ${activeCategory === category.name ? "active" : ""}`}
            style={
              activeCategory === category.name
                ? { backgroundColor: category.color, color: "#fff" }
                : { borderColor: category.color, color: category.color }
            }
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div className="results-info">
        {activeCategory === "All" ? "Showing all events" : `Filtered by ${activeCategory}`}
        {searchTerm && ` • Search: "${searchTerm}"`}
      </div>
    </div>
  );
}
