"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Calendar, Users, Star, 
  Phone, Mail, ArrowRight, ChevronLeft, ChevronRight, 
  Instagram, Facebook, Globe 
} from 'lucide-react';

// --- DATA ---
// 1. Hero Slides
const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1920&auto=format&fit=crop",
    title: "Dubai, UAE",
    subtitle: "Experience the impossible skyline."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9947?q=80&w=1920&auto=format&fit=crop",
    title: "Kerala, India",
    subtitle: "Serenity in the backwaters."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1920&auto=format&fit=crop",
    title: "Bali, Indonesia",
    subtitle: "Tropical paradise for your group."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1566329433434-2e9eb51c07bd?q=80&w=1920&auto=format&fit=crop",
    title: "Manali, India",
    subtitle: "Snow-capped adventures await."
  }
];

// 2. Destinations Data
const DESTINATIONS = [
  {
    id: 101,
    name: "Goa",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    description: "The party capital of India. Perfect for bachelor trips and corporate offsites.",
    topPlaces: [
      { name: "Baga Beach", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format" },
      { name: "Fort Aguada", image: "https://images.unsplash.com/photo-1596716766432-881db2023e1c?q=80&w=600&auto=format" },
      { name: "Dudhsagar", image: "https://images.unsplash.com/photo-1544893188-46554c00037a?q=80&w=600&auto=format" }
    ]
  },
  {
    id: 102,
    name: "Rajasthan",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop",
    description: "Royal palaces, desert safaris, and vibrant culture for a grand experience.",
    topPlaces: [
      { name: "Jaipur", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format" },
      { name: "Udaipur", image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=600&auto=format" },
      { name: "Jaisalmer", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format" }
    ]
  },
  {
    id: 103,
    name: "Thailand",
    category: "International",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=800&auto=format&fit=crop",
    description: "From Bangkok nightlife to Phuket beaches, the ultimate group destination.",
    topPlaces: [
      { name: "Phuket", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=600&auto=format" },
      { name: "Bangkok", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600&auto=format" },
      { name: "Pattaya", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format" }
    ]
  },
  {
    id: 104,
    name: "Singapore",
    category: "International",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
    description: "A blend of nature and future. Great for family and premium corporate groups.",
    topPlaces: [
      { name: "Marina Bay", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format" },
      { name: "Sentosa", image: "https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=600&auto=format" },
      { name: "Gardens", image: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?q=80&w=600&auto=format" }
    ]
  }
];

// 3. Inspirations Data
const INSPIRATIONS = [
  {
    id: 201,
    title: "Corporate Retreats",
    tag: "Team Building",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    details: "Boost morale with our curated offsites. Includes conference setup, gala dinners, and DJ nights.",
    reviews: [
      { name: "TechCorp Inc.", text: "Best offsite we ever had!", rating: 5 }
    ]
  },
  {
    id: 202,
    title: "Family Vacations",
    tag: "Relaxation",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    details: "Hassle-free travel for large families. We handle transport, kid-friendly meals, and comfortable stays.",
    reviews: [
      { name: "The Sharma Family", text: "Grandparents and kids all loved it.", rating: 5 }
    ]
  },
  {
    id: 203,
    title: "Student Groups",
    tag: "Adventure",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop",
    details: "Budget-friendly industrial visits and adventure camps. Safety is our #1 priority.",
    reviews: [
      { name: "University of Delhi", text: "Seamless logistics for 50 students.", rating: 4 }
    ]
  }
];

// --- COMPONENTS ---

export default function Page() {
  const [activeView, setActiveView] = useState('home'); // 'home', 'destination', 'inspiration'
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation Handler
  const goHome = () => {
    setActiveView('home');
    setSelectedItem(null);
    window.scrollTo(0, 0);
  };

  const openDestination = (dest: any) => {
    setSelectedItem(dest);
    setActiveView('destination');
    window.scrollTo(0, 0);
  };

  const openInspiration = (insp: any) => {
    setSelectedItem(insp);
    setActiveView('inspiration');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand */}
            <div 
              onClick={goHome} 
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-blue-900 tracking-tight">VEER TRAVELS</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={goHome} className="font-medium hover:text-blue-600 transition">Home</button>
              <a href="#destinations" onClick={(e) => { if(activeView!=='home') goHome(); }} className="font-medium hover:text-blue-600 transition">Destinations</a>
              <a href="#inspirations" onClick={(e) => { if(activeView!=='home') goHome(); }} className="font-medium hover:text-blue-600 transition">Inspirations</a>
              <a href="#service" onClick={(e) => { if(activeView!=='home') goHome(); }} className="font-medium hover:text-blue-600 transition">Service</a>
              <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Request Quote
              </a>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-xl">
            <button onClick={() => {goHome(); setMobileMenuOpen(false)}} className="block w-full text-left py-2 font-medium">Home</button>
            <button onClick={() => {goHome(); setMobileMenuOpen(false)}} className="block w-full text-left py-2 font-medium">Destinations</button>
            <button onClick={() => {goHome(); setMobileMenuOpen(false)}} className="block w-full text-left py-2 font-medium">Inspirations</button>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 font-medium text-orange-600">Contact Us</a>
          </div>
        )}
      </nav>

      {/* --- CONDITIONAL RENDERING --- */}

      {activeView === 'home' && (
        <>
          {/* 2. HERO SLIDER */}
          <HeroSlider />

          {/* 3. DESTINATIONS GRID */}
          <section id="destinations" className="py-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Destinations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Handpicked locations for your next group adventure. Choose from Domestic gems or International hotspots.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {DESTINATIONS.map((dest) => (
                <div 
                  key={dest.id} 
                  onClick={() => openDestination(dest)}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {dest.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                      {dest.name}
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{dest.description}</p>
                    <div className="mt-4 text-blue-600 font-semibold text-sm">View Top Places</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. TRIP INSPIRATIONS */}
          <section id="inspirations" className="py-20 bg-blue-50 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trip Inspirations</h2>
                <p className="text-gray-600">We don't sell packages; we build experiences. What's your group vibe?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {INSPIRATIONS.map((insp) => (
                  <div key={insp.id} onClick={() => openInspiration(insp)} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition">
                    <div className="h-56 relative">
                      <img src={insp.image} alt={insp.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-white text-xl font-bold">{insp.title}</h3>
                        <p className="text-gray-200 text-sm">{insp.tag}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. SERVICE / PROCESS */}
          <section id="service" className="py-20 px-4 max-w-7xl mx-auto">
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold">How We Work</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                   <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8"/>
                   </div>
                   <h3 className="text-xl font-bold mb-2">1. You Tell Us</h3>
                   <p className="text-gray-600">Group size, dates, and budget.</p>
                </div>
                <div className="p-6">
                   <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8"/>
                   </div>
                   <h3 className="text-xl font-bold mb-2">2. We Plan</h3>
                   <p className="text-gray-600">Custom itinerary & best rates.</p>
                </div>
                <div className="p-6">
                   <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8"/>
                   </div>
                   <h3 className="text-xl font-bold mb-2">3. You Travel</h3>
                   <p className="text-gray-600">Seamless execution & support.</p>
                </div>
             </div>
          </section>
        </>
      )}

      {/* DETAIL VIEW: DESTINATIONS */}
      {activeView === 'destination' && selectedItem && (
        <div className="pt-20 min-h-screen animate-in fade-in zoom-in duration-300">
          <div className="relative h-[50vh]">
            <img src={selectedItem.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-2">{selectedItem.name}</h1>
                <p className="text-xl">{selectedItem.category}</p>
              </div>
            </div>
            <button onClick={goHome} className="absolute top-4 left-4 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/40 transition">
              <ChevronLeft /> Back to Home
            </button>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Top Places to Visit in {selectedItem.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedItem.topPlaces.map((place: any, index: number) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-md">
                  <img src={place.image} className="h-48 w-full object-cover" />
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">{place.name}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
               <p className="text-gray-600 mb-4">Interested in a group trip to {selectedItem.name}?</p>
               <a href="#contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700">Get Custom Quote</a>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL VIEW: INSPIRATIONS */}
      {activeView === 'inspiration' && selectedItem && (
        <div className="pt-20 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="bg-blue-900 text-white py-16 px-4 text-center relative">
              <button onClick={goHome} className="absolute top-4 left-4 flex items-center gap-2 opacity-70 hover:opacity-100">
                <ChevronLeft /> Back
              </button>
              <h1 className="text-4xl font-bold mb-2">{selectedItem.title}</h1>
              <p className="opacity-80">Curated for: {selectedItem.tag}</p>
           </div>
           <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
                 <img src={selectedItem.image} className="w-full md:w-1/2 rounded-lg" />
                 <div>
                    <h3 className="text-2xl font-bold mb-4">About this Experience</h3>
                    <p className="text-gray-600 mb-6">{selectedItem.details}</p>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                       <p className="text-sm text-gray-800 italic">"{selectedItem.reviews[0].text}"</p>
                       <p className="text-xs text-gray-500 mt-2 font-bold">- {selectedItem.reviews[0].name}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 6. CONTACT FORM (Always visible at bottom unless in detail view, or just shared) */}
      <section id="contact" className="py-20 bg-gray-900 text-white px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Planning Your Group Trip</h2>
            <p className="text-gray-400">Fill the form below and our expert will call you.</p>
          </div>

          <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div className="col-span-1">
                 <label className="block text-sm font-semibold mb-2">Phone Number</label>
                 <input type="text" placeholder="+91 XXXXX XXXXX" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div className="col-span-1">
                 <label className="block text-sm font-semibold mb-2">Group Size</label>
                 <select className="w-full p-3 border rounded-lg outline-none">
                    <option>10-20 People</option>
                    <option>20-50 People</option>
                    <option>50+ People</option>
                 </select>
              </div>
              <div className="col-span-1">
                 <label className="block text-sm font-semibold mb-2">Destination</label>
                 <input type="text" placeholder="e.g. Goa, Dubai" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div className="col-span-1 md:col-span-2">
                 <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-lg">
                    Send Inquiry
                 </button>
              </div>
            </form>
          </div>
          
          <div className="mt-12 text-center text-gray-500 text-sm">
             <p>© 2024 Veer Travels. All rights reserved.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Text at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white pb-32">
             <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-in slide-in-from-bottom-10 fade-in duration-700">{slide.title}</h1>
                <p className="text-xl md:text-2xl font-light opacity-90">{slide.subtitle}</p>
             </div>
          </div>
        </div>
      ))}
      
      {/* Controls */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-md transition">
         <ChevronLeft className="w-8 h-8" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-md transition">
         <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}