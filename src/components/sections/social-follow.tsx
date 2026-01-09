import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SocialFollow() {
  return (
    <section id="social-follow" className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Follow Our Journey</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Stay updated with our latest trips, offers, and travel tips on social media.
            </p>
            <div className="flex space-x-6 mt-6">
              <Link href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <Facebook size={36} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-sky-500 hover:text-sky-700 transition-colors">
                <Twitter size={36} />
                 <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                <Instagram size={36} />
                 <span className="sr-only">Instagram</span>
              </Link>
            </div>
             <Button asChild size="lg" className="mt-8">
              <Link href="/#contact">Customize Your Trip Plan</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
