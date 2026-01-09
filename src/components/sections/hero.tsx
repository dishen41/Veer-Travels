'use client';

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
  { id: 'hero-kerala', title: 'Enchanting Kerala Backwaters', subtitle: 'Domestic Gems' },
  { id: 'hero-dubai', title: 'Futuristic Dubai Skyline', subtitle: 'International Hotspots' },
  { id: 'hero-kashmir', title: 'Pristine Valleys of Kashmir', subtitle: 'Domestic Gems' },
  { id: 'hero-bali', title: 'Spiritual Sanctuaries of Bali', subtitle: 'International Hotspots' },
];

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-screen p-0">
      <Carousel
        className="w-full h-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {heroImages.map((hero, index) => {
            const imageData = getImageById(hero.id);
            return (
              <CarouselItem key={hero.id}>
                <div className="relative w-full h-[70vh] md:h-screen">
                  {imageData && (
                    <Image
                      src={imageData.imageUrl}
                      alt={imageData.description}
                      fill
                      className="object-cover"
                      data-ai-hint={imageData.imageHint}
                      priority={index === 0}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-6 md:p-12">
                    <div className="max-w-4xl mb-12">
                      <p className="text-md md:text-xl font-semibold text-accent mb-2">{hero.subtitle}</p>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight tracking-tighter">
                        {hero.title}
                      </h1>
                      <p className="mt-4 max-w-2xl mx-auto text-sm md:text-lg text-gray-200">
                        Discover customized group trips planned to perfection.
                      </p>
                      <Button asChild size="lg" className="mt-6 md:mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/#contact">Start Planning Your Trip</Link>
                      </Button>
                    </div>
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
