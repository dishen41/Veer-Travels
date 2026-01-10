import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SocialFollow() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Customize Your Trip Plan</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Follow us on social media for the latest travel inspiration, tips, and exclusive deals. Join our community of explorers!</p>
                <div className="flex justify-center space-x-6 mb-8">
                    <Link href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Facebook size={48} />
                    </Link>
                    <Link href="#" className="text-sky-500 hover:text-sky-700 transition-colors">
                        <Twitter size={48} />
                    </Link>
                    <Link href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                        <Instagram size={48} />
                    </Link>
                </div>
                <Button asChild size="lg">
                    <Link href="/#contact">Start Planning Now</Link>
                </Button>
            </div>
        </section>
    );
}