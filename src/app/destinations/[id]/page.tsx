import { getDestinationById, destinations } from '@/lib/data/destinations';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getImageById } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

type DestinationPageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const destination = getDestinationById(params.id);

  if (!destination) {
    return {
      title: 'Destination Not Found',
    };
  }

  return {
    title: `${destination.name} | Veer Travels`,
    description: `Explore the best of ${destination.name}. ${destination.description}`,
  };
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestinationById(params.id);

  if (!destination) {
    notFound();
  }

  const heroImage = getImageById(destination.image);

  return (
    <div className="bg-background">
      <header className="relative h-[40vh] md:h-[50vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">{destination.name}</h1>
        </div>
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <Button asChild variant="secondary" className="bg-white/80 backdrop-blur-sm hover:bg-white">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Overview</h2>
            <p className="text-muted-foreground text-base md:text-lg">{destination.description}</p>
          </div>
          
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">Top Attractions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {destination.topPlaces.map((place) => {
                const placeImage = getImageById(place.image);
                return (
                  <Card key={place.name} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48 w-full">
                        {placeImage && (
                          <Image
                            src={placeImage.imageUrl}
                            alt={placeImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={placeImage.imageHint}
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/>{place.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="text-center bg-secondary p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">Ready to explore {destination.name}?</h2>
            <p className="text-muted-foreground mt-2 mb-6">Let us plan the perfect group trip for you.</p>
            <Button asChild size="lg">
              <Link href="/#contact">Plan a Trip Here</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
