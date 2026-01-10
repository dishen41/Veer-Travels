'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { recommendItinerary } from '@/ai/flows/recommend';
import { useState } from 'react';

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleInquiry(formData: FormData) {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const destination = formData.get('destination') as string;
    const requirements = formData.get('requirements') as string;

    if (!name || !phone || !destination) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill out all required fields.',
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await recommendItinerary({
        destination,
        groupInfo: requirements,
      });

      console.log('AI Response:', response);

      toast({
        title: 'Inquiry Sent!',
        description: "We'll be in touch shortly. We've also recommended an itinerary for you.",
      });
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.message || 'Could not send inquiry.',
      });
    } finally {
        setLoading(false);
    }

  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Plan Your Perfect Trip</h2>
            <p className="text-muted-foreground mt-2">
              Fill out the form below and our travel experts will get back to you with a customized quote.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <form action={handleInquiry} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" placeholder="+91 9016665048" required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="destination">Desired Destination</Label>
                <Input id="destination" name="destination" placeholder="e.g., Kerala, Dubai" required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="requirements">Tell Us Your Requirements</Label>
                <Textarea id="requirements" name="requirements" placeholder="Number of people, duration, specific interests..." />
              </div>
              <div className="md:col-span-2 text-center">
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? 'Sending...' : 'Request a Quote'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
