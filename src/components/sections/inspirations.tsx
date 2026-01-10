'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { inspirations } from '@/lib/data/inspirations';
import { getImageById } from '@/lib/placeholder-images';
import type { Inspiration } from '@/lib/types';

const InspirationCard = ({ inspiration, onClick }: { inspiration: Inspiration, onClick: (item: Inspiration) => void }) => {
    const imageData = getImageById(inspiration.image);
    return (
        <div onClick={() => onClick(inspiration)} className="block group cursor-pointer">
            <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-0">
                    <div className="relative h-80 w-full">
                       {imageData && (
                         <Image
                            src={imageData.imageUrl}
                            alt={imageData.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={imageData.imageHint}
                        />
                       )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="font-headline text-2xl font-bold text-white">{inspiration.title}</h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function Inspirations({ onInspirationClick }: { onInspirationClick: (item: Inspiration) => void }) {
  return (
    <section id="inspirations" className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Trip Inspirations</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Get inspired for your next group journey with our curated travel themes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {inspirations.map(item => <InspirationCard key={item.id} inspiration={item} onClick={onInspirationClick} />)}
        </div>
    </section>
  );
}
