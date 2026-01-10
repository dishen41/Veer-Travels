'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/sections/hero';
import Destinations from '@/components/sections/destinations';
import Inspirations from '@/components/sections/inspirations';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import SocialFollow from '@/components/sections/social-follow';
import { Globe, Menu, X, ArrowRight, Calendar, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { destinations as DESTINATIONS } from '@/lib/data/destinations';
import { inspirations as INSPIRATIONS } from '@/lib/data/inspirations';
import { HERO_SLIDES } from '@/lib/data/hero';
import type { Destination } from '@/lib/types';
import type { Inspiration } from '@/lib/types';
import { getImageById } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function Home() {
  const [activeView, setActiveView] = useState('home');
  const [selectedItem, setSelectedItem] = useState<Destination | Inspiration | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goHome = () => {
    setActiveView('home');
    setSelectedItem(null);
    window.scrollTo(0, 0);
  };

  const openDestination = (destination: Destination) => {
    setActiveView('destination');
    setSelectedItem(destination);
    window.scrollTo(0, 0);
  };

  const openInspiration = (inspiration: Inspiration) => {
    setActiveView('inspiration');
    setSelectedItem(inspiration);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* 1. NAVBAR - This is now handled by the main layout */}
      
      {/* --- CONDITIONAL RENDERING --- */}

      {activeView === 'home' && (
        <>
          {/* 2. HERO SLIDER */}
          <Hero />

          {/* 3. DESTINATIONS GRID */}
           <section id="destinations" className="py-20 px-4">
              <Destinations onDestinationClick={openDestination} />
           </section>

          {/* 4. TRIP INSPIRATIONS */}
           <section id="inspirations" className="py-20 bg-secondary px-4">
            <Inspirations onInspirationClick={openInspiration} />
          </section>

          {/* 5. SERVICE / PROCESS */}
          <Services />

          {/* 6. ABOUT US */}
          <About />

          {/* 7. CONTACT FORM */}
          <Contact />
          
          {/* 8. SOCIAL FOLLOW */}
          <SocialFollow />
        </>
      )}

      {/* DETAIL VIEW: DESTINATIONS */}
      {activeView === 'destination' && selectedItem && (
        <div className="pt-20 min-h-screen animate-in fade-in zoom-in duration-300">
          <div className="relative h-[50vh]">
            <Image src={getImageById(selectedItem.image)!.imageUrl} className="w-full h-full object-cover" fill alt={selectedItem.title || (selectedItem as Destination).name}/>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-2">{(selectedItem as Destination).name}</h1>
                <p className="text-xl">{(selectedItem as Destination).category}</p>
              </div>
            </div>
            <button onClick={goHome} className="absolute top-24 left-4 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/40 transition">
              <ChevronLeft /> Back to Home
            </button>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Top Places to Visit in {(selectedItem as Destination).name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(selectedItem as Destination).topPlaces.map((place: any, index: number) => {
                const placeImage = getImageById(place.image);
                return (
                  <div key={index} className="rounded-xl overflow-hidden shadow-md">
                    {placeImage && <Image src={placeImage.imageUrl} className="h-48 w-full object-cover" width={600} height={400} alt={place.name} />}
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-lg">{place.name}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-12 text-center">
               <p className="text-muted-foreground mb-4">Interested in a group trip to {(selectedItem as Destination).name}?</p>
               <a href="#contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90">Get Custom Quote</a>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL VIEW: INSPIRATIONS */}
      {activeView === 'inspiration' && selectedItem && (
        <div className="pt-20 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="bg-primary/80 text-primary-foreground py-16 px-4 text-center relative">
              <button onClick={goHome} className="absolute top-24 left-4 flex items-center gap-2 opacity-70 hover:opacity-100">
                <ChevronLeft /> Back
              </button>
              <h1 className="text-4xl font-bold mb-2">{selectedItem.title}</h1>
           </div>
           <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="bg-card rounded-xl shadow-lg p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
                 <Image src={getImageById(selectedItem.image)!.imageUrl} className="w-full md:w-1/2 rounded-lg" width={600} height={400} alt={selectedItem.title} />
                 <div>
                    <h3 className="text-2xl font-bold mb-4">About this Experience</h3>
                    <p className="text-muted-foreground mb-6">{selectedItem.description}</p>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
