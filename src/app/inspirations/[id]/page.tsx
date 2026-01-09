import { getInspirationById, inspirations } from '@/lib/data/inspirations';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getImageById } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

type InspirationPageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  return inspirations.map((inspiration) => ({
    id: inspiration.id,
  }));
}

export async function generateMetadata({ params }: InspirationPageProps): Promise<Metadata> {
  const inspiration = getInspirationById(params.id);

  if (!inspiration) {
    return {
      title: 'Inspiration Not Found',
    };
  }

  return {
    title: `${inspiration.title} | Veer Travels`,
    description: `Trip inspiration for ${inspiration.title}. ${inspiration.details}`,
  };
}


export default function InspirationPage({ params }: InspirationPageProps) {
  const inspiration = getInspirationById(params.id);

  if (!inspiration) {
    notFound();
  }

  const coverImage = getImageById(inspiration.coverImage);

  return (
    <div className="bg-background">
       <header className="relative w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto h-full flex flex-col justify-center relative z-10 px-4">
           <h1 className="text-4xl md:text-5xl font-bold font-headline">{inspiration.title}</h1>
           <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{inspiration.details}</p>
        </div>
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
                <section id="gallery" className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">Happy Group Photos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {inspiration.groupImages.map((imgId, index) => {
                            const img = getImageById(imgId);
                            if (!img) return null;
                            return (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                                    <Image src={img.imageUrl} alt={img.description} fill className="object-cover" data-ai-hint={img.imageHint} />
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section id="testimonials">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">Client Stories</h2>
                    <div className="space-y-6">
                        {inspiration.testimonials.map((testimonial, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <blockquote className="italic text-muted-foreground">"{testimonial.comment}"</blockquote>
                                    <p className="mt-4 font-semibold text-right">- {testimonial.name}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>

            <aside className="lg:col-span-1">
                <div className="sticky top-24">
                     <Card className="bg-secondary">
                        <CardContent className="p-6">
                            <h3 className="text-xl md:text-2xl font-bold font-headline mb-4">Trip Details</h3>
                            <ul className="space-y-3">
                                {inspiration.included.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <div className="mt-6">
                         <Button asChild size="lg" className="w-full">
                           <Link href="/#contact">Plan a Similar Trip</Link>
                         </Button>
                    </div>
                </div>
            </aside>
        </div>
      </main>
    </div>
  );
}
