'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { getImageById } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const heroImages = [
  { id: 'hero-kerala', title: 'Discover the Serene Backwaters of Kerala', description: 'Your journey to tranquility begins here.' },
  { id: 'hero-kashmir', title: 'Experience the Paradise of Kashmir', description: 'Where majestic mountains meet pristine valleys.' },
  { id: 'hero-dubai', title: 'Explore the Futuristc Skyline of Dubai', description: 'A city of wonders, luxury, and adventure.' },
  { id: 'hero-bali', title: 'Find Your Peace in Beautiful Bali', description: 'The island of gods awaits you.' },
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="relative w-full h-[60vh] md:h-screen overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroImages.map((heroItem) => {
            const imageData = getImageById(heroItem.id);
            return (
              <CarouselItem key={heroItem.id}>
                <div className="relative w-full h-[60vh] md:h-screen">
                  {imageData && (
                    <Image
                      src={imageData.imageUrl}
                      alt={imageData.description}
                      fill
                      className="object-cover"
                      priority={heroImages.indexOf(heroItem) === 0}
                      data-ai-hint={imageData.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
                      {heroItem.title}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
                      {heroItem.description}
                    </p>
                    <Button asChild size="lg" className="mt-8">
                       <Link href="/#contact">Plan Your Trip</Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
