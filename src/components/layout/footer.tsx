import Link from 'next/link';
import { Mountain, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">VEER TRAVELS</span>
            </Link>
            <p className="text-sm">
              Crafting unforgettable group travel experiences.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#destinations" className="hover:text-primary">Destinations</Link></li>
              <li><Link href="/#inspirations" className="hover:text-primary">Trip Inspirations</Link></li>
              <li><Link href="/#about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/#contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@veertravels.com</li>
              <li>Phone: +91 12345 67890</li>
              <li>Address: 123 Travel Lane, New Delhi, India</li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-600 hover:text-blue-800 transition-colors"><Facebook size={24} /></Link>
              <Link href="#" className="text-sky-500 hover:text-sky-700 transition-colors"><Twitter size={24} /></Link>
              <Link href="#" className="text-pink-600 hover:text-pink-800 transition-colors"><Instagram size={24} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Veer Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
