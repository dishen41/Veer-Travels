'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { destinations } from '@/lib/data/destinations';
import { getImageById } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Destination } from '@/lib/types';

const domesticDestinations = destinations.filter(d => d.category === 'domestic');
const internationalDestinations = destinations.filter(d => d.category === 'international');

const DestinationCard = ({ destination, onClick }: { destination: Destination, onClick: (dest: Destination) => void }) => {
    const imageData = getImageById(destination.image);
    return (
        <div onClick={() => onClick(destination)} className="block group cursor-pointer">
            <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-0">
                    <div className="relative h-64 w-full">
                        {imageData && (
                             <Image
                                src={imageData.imageUrl}
                                alt={imageData.description}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={imageData.imageHint}
                            />
                        )}
                    </div>
                    <div className="p-4 bg-card">
                        <h3 className="font-headline text-lg font-semibold">{destination.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{destination.description}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function Destinations({ onDestinationClick }: { onDestinationClick: (dest: Destination) => void }) {
  return (
    <section id="destinations" className="bg-background container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Explore Our Destinations</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">From the serene backwaters of India to the bustling cities of the world, your next adventure awaits.</p>
        </div>

        <div>
            <h3 className="text-2xl font-bold font-headline mb-6 text-center md:text-left">Domestic Gems</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {domesticDestinations.map(dest => <DestinationCard key={dest.id} destination={dest} onClick={onDestinationClick} />)}
            </div>
        </div>

        <div className="mt-16">
            <h3 className="text-2xl font-bold font-headline mb-6 text-center md:text-left">International Hotspots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {internationalDestinations.map(dest => <DestinationCard key={dest.id} destination={dest} onClick={onDestinationClick} />)}
            </div>
        </div>
    </section>
  );
}
