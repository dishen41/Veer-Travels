import { z } from 'zod';

export const ItinerarySchema = z.object({
  destination: z.string().describe('The destination of the trip.'),
  groupInfo: z.string().describe('Information about the group and their requirements.'),
});

export const ItineraryRecommendation = z.object({
  itinerary: z.array(z.object({
    day: z.number().describe('The day number of the itinerary.'),
    activities: z.array(z.string()).describe('A list of activities for the day.'),
  })),
  suggestions: z.array(z.string()).describe('Additional suggestions for the trip.'),
});
