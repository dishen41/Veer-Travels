'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { runFlow } from '@genkit-ai/next/client';
import { recommendItinerary } from '@/ai/flows/recommend';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Lightbulb, Loader2 } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().optional(),
  groupSize: z.string().min(1, {message: 'Group size is required'}),
  destination: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  travelStyle: z.string().optional(),
  interests: z.string().optional(),
});

export default function Contact() {
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      groupSize: '',
      destination: '',
      message: '',
      travelStyle: '',
      interests: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Quote Request Submitted!',
      description: 'Thank you for your inquiry. We will get back to you shortly.',
    });
    form.reset();
  }
  
  async function onAiSubmit() {
    setIsAiLoading(true);
    const { travelStyle, interests } = form.getValues();

    if (!travelStyle && !interests) {
        toast({
            variant: 'destructive',
            title: 'Provide Preferences',
            description: 'Please fill in your Travel Style or Interests for AI recommendations.',
        });
        setIsAiLoading(false);
        return;
    }

    try {
        const result = await runFlow(recommendItinerary, { travelStyle, interests });
        
        form.setValue('destination', result.destination, { shouldValidate: true });
        form.setValue('message', result.message, { shouldValidate: true });
        
        toast({
            title: 'AI Recommendations Ready!',
            description: "We've suggested a destination and updated your message. Review and submit!",
        });

    } catch (error) {
        console.error("AI recommendation failed:", error);
        toast({
            variant: 'destructive',
            title: 'AI Assistant Error',
            description: "Sorry, we couldn't generate recommendations at this moment. Please try again later.",
        });
    } finally {
        setIsAiLoading(false);
    }
  }

  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Request a Custom Quote</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Fill out the form below to get started on your next adventure. Or, try our AI assistant to get personalized recommendations!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="groupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 15 people" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-6 border rounded-lg bg-secondary">
                <h3 className="text-lg font-headline font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    AI-Powered Recommendations (Optional)
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mb-4">
                     <FormField
                      control={form.control}
                      name="travelStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Travel Style</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Luxury, Adventure, Relaxation" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interests</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., History, Food, Beaches, Culture" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                </div>
                <Button type="button" onClick={onAiSubmit} disabled={isAiLoading}>
                  {isAiLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Lightbulb className="mr-2 h-4 w-4" />
                  )}
                  Get AI Recommendations
                </Button>
              </div>

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Destination(s)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Kerala, Dubai, or 'Not Sure'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your trip requirements, desired dates, and any other details."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" size="lg" className="w-full md:w-auto">Submit Quote Request</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
