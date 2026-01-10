import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/placeholder-images';

export default function About() {
  const aboutImage = getImageById('insp-family');

  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              About Veer Travels
            </h2>
            <p className="mt-4 text-muted-foreground">
              At Veer Travels, we believe that travel is more than just visiting
              new places. It's about creating shared experiences and lasting
              memories. We specialize in crafting customized group trips that
              cater to the unique needs of corporate teams, student groups, and
              families.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our team of expert travel planners is dedicated to handling every
              detail, from complex logistics to curated local experiences. With
              a focus on both domestic and international destinations, we are
              your trusted partner in creating journeys that inspire.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/#contact">Plan with Us</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-80 w-full md:h-96 rounded-lg overflow-hidden shadow-lg">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
