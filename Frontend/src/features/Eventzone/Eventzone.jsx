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
            venue: "Auditorium, JUIT",
            attendees: 300,
            organizer: "Department of CSE & ECE",
            category: "Technical",
            isFeatured: true,
            image: "https://imgs.search.brave.com/j88sKPB14xTYSVa-MKmr4NyWUXaOO42DkwxW9SQOs3Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2xpZGVzaGFyZWNk/bi5jb20vc3NfdGh1/bWJuYWlscy9zbWFy/dHBlc3RpY2lkZXNp/aDIwMjUtMjUwOTEw/MTUzOTQ0LTFmNzdi/N2U0LXRodW1ibmFp/bC5qcGc_d2lkdGg9/NTYwJmZpdD1ib3Vu/ZHM" // your updated SIH image
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
            image: "https://imgs.search.brave.com/90HJC7Obs494rfvlLvF1CIEy_kli9Caz7n2V3eMPEXQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL2FzYXJu/ZXd6LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wNC9J/TUdfMTE2MS0yODB4/MzAwLmpwZWc"
        },
        {
            id: 3,
            title: "Parakram - Annual Sports Meet",
            date: "Oct 18, 2025",
            time: "8:00 AM - 6:00 PM",
            venue: "JUIT",
            attendees: 1000,
            organizer: "Sports Council",
            category: "Sports",
            isFeatured: true,
            image: "https://imgs.search.brave.com/0cgpudbybL6J0lUWxJ3I6cAcQXG1WAVPgN2LqIJgEPM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/anVpdC5hYy5pbi9m/cm9udC9pbWFnZXMv/cGFyYWtyYW0tMi53/ZWJw"
        },
        {
            id: 4,
            title: "Startup Expo & Pitch Day",
            date: "Nov 2, 2025",
            time: "2:00 PM - 7:00 PM",
            venue: "TIEDC cell",
            attendees: 250,
            organizer: "E-Cell JUIT",
            category: "Entrepreneurship",
            isFeatured: true,
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0"
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
            image: "https://imgs.search.brave.com/9ditq5vbvzfRrd8crVgfEJHkI1tkemYIwLXVBVNmzu4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE2/OTI5OTM1MS9waG90/by93b21hbi1pbi1k/YW5jaW5nLWVsZWdh/bnQtZmxhbWVuY28t/cG9zaXRpb24taW4t/YS12aXJ0dWFsLWFu/ZC1jb25uZWN0ZWQt/ZW52aXJvbm1lbnQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUNVTmMzbm5CNDln/ZUxyblRQWDBDYjJr/aDgwRVI4U1QzdEhP/TDFiWDctUTQ9"
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
            organizer: "College Bawa Cultural Committee",
            category: "Cultural",
            image: "https://imgs.search.brave.com/b1ZihO1xQmRG3uJRsj8wRVDruinTMvMbo6PaLR3bPzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/anVpdC5hYy5pbi9p/bWFnZXMvZGlrc2hh/NS5qcGc",
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
            image: "https://imgs.search.brave.com/DhHe2rOYZ0gGLR1Z64ZjemQKlCyxrSiKhreymNUN2Ws/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC8wdnZhbG1t/OThzbHcvMVpOVXc2/OUhHRDF1OURQUXlv/eGdkLzZjOTZlMzhm/OTA1ODdjYmM3ZWU3/OGVmMGJkOWVkNDY4/L0FJLURXRlQucG5n/P3c9MTM3NCZoPTEy/ODMmcT0xMDAmZm09/cG5n",
            attendees: 120,
            isFeatured: true,
        },
        {
            id: "3",
            title: "Inter-Department Basketball Tournament",
            date: "Oct 2, 2025",
            time: "3:00 PM",
            venue: "JUIT Sports Ground",
            organizer: "Sports Club",
            category: "Sports",
            image: "https://imgs.search.brave.com/xW48DE5vUODi_OoYIeN91Ub6eLZVe5BHB46WNvCU0mI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS1zdGF0aWMuY29s/bGVnZWR1bmlhLmNv/bS9wdWJsaWMvcmV2/aWV3UGhvdG9zLzk3/ODE3Ny9TY3JlZW5z/aG90JTIwMjAyMy0w/OS0wNCUyMDE4MjQw/OC5wbmc",
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
            image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51",
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
            image: "https://imgs.search.brave.com/17dZ110VJc0sJ47MTPrDhmvaVdV4icano2Q0pJ1BYcE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkzLzc5/LzBkLzkzNzkwZGYz/MTNmOGJkZDNjZTBm/NTgxNzFmNmZhYzll/LmpwZw",
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
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
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
