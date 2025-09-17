import React, { useState } from 'react'
import { HeroSection } from './HeroSection'
import { HighlightsCarousel } from './HighlightsCarousel'
import { FiltersSection } from './FiltersSection';
import { EventCard } from './Eventcard';

function Eventzone() {
    const dummyEvents = [
        {
            id: 1,
            title: "Smart India Hackathon (SIH) 2025",
            date: "Sep 28, 2025",
            time: "9:00 AM - 9:00 PM",
            venue: "Innovation Hub, JUIT",
            attendees: 300,
            organizer: "Department of CSE & ECE",
            category: "Technical",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=11"
        },
        {
            id: 2,
            title: "Le Fiestus - Cultural Fest",
            date: "Oct 10, 2025",
            time: "6:00 PM - 11:00 PM",
            venue: "Open Air Theatre, JUIT",
            attendees: 1500,
            organizer: "Cultural Council, JYC",
            category: "Cultural",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=12"
        },
        {
            id: 3,
            title: "Parakram - Annual Sports Meet",
            date: "Oct 18, 2025",
            time: "8:00 AM - 6:00 PM",
            venue: "Sports Ground, JUIT",
            attendees: 1000,
            organizer: "Sports Council",
            category: "Sports",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=13"
        },
        {
            id: 4,
            title: "Startup Expo & Pitch Day",
            date: "Nov 2, 2025",
            time: "2:00 PM - 7:00 PM",
            venue: "Innovation Lab",
            attendees: 250,
            organizer: "E-Cell JUIT",
            category: "Entrepreneurship",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=14"
        },
        {
            id: 5,
            title: "Rhythm Night - Music & Dance Show",
            date: "Nov 8, 2025",
            time: "7:00 PM - 11:00 PM",
            venue: "Central Lawn, JUIT",
            attendees: 900,
            organizer: "Music & Dance Club",
            category: "Entertainment",
            isFeatured: true,
            image: "https://picsum.photos/800/400?random=15"
        }
    ];

    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const events = [
        {
            id: "1",
            title: "Cultural Night - Fresher’s Welcome",
            date: "Sep 20, 2025",
            time: "6:00 PM",
            venue: "Main Auditorium",
<<<<<<< HEAD
            organizer: "Cultural Committee",
=======
            organizer: "College Bawa Cultural Committee",
>>>>>>> 0a913a18854d67eaad13addb5c19e636fb8f905d
            category: "Cultural",
            image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
            attendees: 500,
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
            attendees: 120,
            isFeatured: true,
        },
        {
            id: "3",
            title: "Inter-Department Football Tournament",
            date: "Oct 2, 2025",
            time: "3:00 PM",
            venue: "JUIT Sports Ground",
            organizer: "Sports Club",
            category: "Sports",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ysWDcM1PN8w1ZSErYFhQY0BHsZherUi33g&s",
            attendees: 300,
            isFeatured: false,
        },
        {
            id: "4",
            title: "TechFest 2025 - Innovators Meet",
            date: "Oct 5, 2025",
            time: "9:30 AM",
            venue: "Seminar Hall A",
            organizer: "Tech Club, JYC",
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
            organizer: "Code Warriors, JUIT",
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
