"use client"; // This is required for Next.js to work like React

import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Calendar, Star, Phone, Mail, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DATA ---
const DESTINATIONS = [
  {
    id: 1,
    name: "Kerala",
    type: "Domestic",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9947?q=80&w=1000&auto=format&fit=crop",
    description: "God's Own Country. Experience the serene backwaters and lush greenery.",
    topPlaces: [
      { name: "Alleppey", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
      { name: "Munnar", image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: 2,
    name: "Dubai",
    type: "International",
    image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1000&auto=format&fit=crop",
    description: "The City of Gold. Futuristic skyline, desert safaris, and luxury shopping.",
    topPlaces: [
      { name: "Burj Khalifa", image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=600&auto=format&fit=crop" },
      { name: "Palm Jumeirah", image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=600&auto=format&fit=crop" }
    ]
  }
];

// --- MAIN COMPONENT ---
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-900">VEER TRAVELS</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-600 transition">Home</a>
              <a href="#destinations" className="hover:text-blue-600 transition">Destinations</a>
              <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
                Request Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-4">
            <a href="#" className="block py-2">Home</a>
            <a href="#destinations" className="block py-2">Destinations</a>
            <a href="#contact" className="block py-2">Contact</a>
          </div>
        )}
      </nav>

      {/* Simple Hero */}
      <div className="relative h-screen flex items-center justify-center bg-blue-900 text-white">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the World with Veer Travels</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Custom Group Trips | Corporate | Family</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
            Start Planning
          </button>
        </div>
      </div>

    </div>
  );
}
