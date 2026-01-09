'use server';

/**
 * @fileOverview Provides AI-powered travel recommendations based on user preferences.
 *
 * - getTravelRecommendations - A function that generates personalized travel recommendations.
 * - TravelRecommendationsInput - The input type for the getTravelRecommendations function.
 * - TravelRecommendationsOutput - The return type for the getTravelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TravelRecommendationsInputSchema = z.object({
  preferences: z
    .string()
    .describe(
      'A detailed description of the user travel preferences, including desired destinations, activities, travel style, budget, and group type (e.g., corporate, family, students).'
    ),
});
export type TravelRecommendationsInput = z.infer<typeof TravelRecommendationsInputSchema>;

const TravelRecommendationsOutputSchema = z.object({
  destinations: z
    .array(z.string())
    .describe('A list of recommended travel destinations based on the user preferences.'),
  itinerarySuggestions: z
    .string()
    .describe('Detailed itinerary suggestions tailored to the user preferences and chosen destinations.'),
  additionalNotes: z
    .string()
    .optional()
    .describe('Any additional notes or recommendations, such as travel tips or potential challenges.'),
});
export type TravelRecommendationsOutput = z.infer<typeof TravelRecommendationsOutputSchema>;

export async function getTravelRecommendations(
  input: TravelRecommendationsInput
): Promise<TravelRecommendationsOutput> {
  return travelRecommendationsFlow(input);
}

const travelRecommendationsPrompt = ai.definePrompt({
  name: 'travelRecommendationsPrompt',
  input: {schema: TravelRecommendationsInputSchema},
  output: {schema: TravelRecommendationsOutputSchema},
  prompt: `You are an expert travel agent specializing in customized group trips. Based on the user's preferences, provide a list of recommended travel destinations and detailed itinerary suggestions.

User Preferences: {{{preferences}}}

Respond in the following format:
```json
{
  "destinations": ["Destination 1", "Destination 2", ...],
  "itinerarySuggestions": "Detailed itinerary suggestions for the user's trip.",
  "additionalNotes": "Any additional notes or recommendations."
}
```',
});

const travelRecommendationsFlow = ai.defineFlow(
  {
    name: 'travelRecommendationsFlow',
    inputSchema: TravelRecommendationsInputSchema,
    outputSchema: TravelRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await travelRecommendationsPrompt(input);
    return output!;
  }
);
