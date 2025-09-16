import React from 'react'
import { HeroSection } from './HeroSection'
import { HighlightsCarousel } from './HighlightsCarousel'
import { FiltersSection } from './FiltersSection';
import { useState } from 'react';
import { EventCard } from './Eventcard';
function Eventzone() {
    const dummyEvents = [
        {
            id: 1,
            title: "Tech Fest 2025",
            date: "Sep 25, 2025",
            time: "10:00 AM - 5:00 PM",
            venue: "Main Auditorium",
            attendees: 450,
            organizer: "Computer Science Club",
            category: "Technical",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=1"
        },
        {
            id: 2,
            title: "Cultural Night",
            date: "Oct 3, 2025",
            time: "6:00 PM - 11:00 PM",
            venue: "Open Air Theatre",
            attendees: 700,
            organizer: "Cultural Committee",
            category: "Cultural",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=2"
        },
        {
            id: 3,
            title: "Sports Meet",
            date: "Oct 12, 2025",
            time: "9:00 AM - 6:00 PM",
            venue: "Sports Ground",
            attendees: 1200,
            organizer: "Sports Club",
            category: "Sports",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=3"
        },
        {
            id: 4,
            title: "Startup Pitch Day",
            date: "Oct 20, 2025",
            time: "2:00 PM - 6:00 PM",
            venue: "Innovation Lab",
            attendees: 250,
            organizer: "Entrepreneurship Cell",
            category: "Entrepreneurship",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=4"
        },
        {
            id: 5,
            title: "Music Fest",
            date: "Nov 1, 2025",
            time: "5:00 PM - 11:00 PM",
            venue: "Central Lawn",
            attendees: 950,
            organizer: "Music Club",
            category: "Entertainment",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=5"
        }
    ];
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const events = [
        {
            id: "1",
            title: "Cultural Night 2025",
            date: "Sep 25, 2025",
            time: "6:00 PM",
            venue: "Main Auditorium",
            organizer: "Bawa College Cultural Committee",
            category: "Cultural",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
            attendees: 120,
            isFeatured: true,
        },
        {
            id: "2",
            title: "AI & Machine Learning Workshop",
            date: "Sep 28, 2025",
            time: "10:00 AM",
            venue: "Tech Block, Lab 4",
            organizer: "Department of Computer Science",
            category: "Workshops",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
            attendees: 85,
            isFeatured: true,
        },
        {
            id: "3",
            title: "Inter-College Football Tournament",
            date: "Oct 2, 2025",
            time: "3:00 PM",
            venue: "College Sports Ground",
            organizer: "Sports Club",
            category: "Sports",
            image: "https://images.unsplash.com/photo-1609337463519-4264c022cf2c",
            attendees: 300,
            isFeatured: false,
        },
        {
            id: "4",
            title: "TechFest 2025 - Innovators Meet",
            date: "Oct 5, 2025",
            time: "9:30 AM",
            venue: "Seminar Hall A",
            organizer: "Tech Club",
            category: "Fests",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
            attendees: 450,
            isFeatured: true,
        },
        {
            id: "5",
            title: "Classical Dance Workshop",
            date: "Oct 8, 2025",
            time: "4:00 PM",
            venue: "Dance Studio",
            organizer: "Fine Arts Club",
            category: "Cultural",
            image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
            attendees: 60,
            isFeatured: false,
        },
        {
            id: "6",
            title: "Coding Hackathon 24-Hours",
            date: "Oct 12, 2025",
            time: "8:00 AM",
            venue: "Innovation Hub",
            organizer: "Code Warriors",
            category: "Technical",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            attendees: 200,
            isFeatured: true,
        }
    ];


    const filteredEvents = events.filter((event) => {
        const matchesCategory =
            activeCategory === "All" || event.category === activeCategory;
        const matchesSearch = event.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            <HeroSection />
            <HighlightsCarousel events={dummyEvents} />
            <div>
                <FiltersSection
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <div className="ez-event-grid">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="no-results">No events found.</div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Eventzone
