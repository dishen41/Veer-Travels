'use server';

/**
 * @fileOverview Provides AI-powered personalized travel recommendations based on user preferences.
 *
 * - getPersonalizedTravelRecommendations - A function that generates personalized travel recommendations.
 * - PersonalizedTravelRecommendationsInput - The input type for the getPersonalizedTravelRecommendations function.
 * - PersonalizedTravelRecommendationsOutput - The return type for the getPersonalizedTravelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTravelRecommendationsInputSchema = z.object({
  preferences: z
    .string()
    .describe(
      'A detailed description of the user travel preferences, including budget, travel style, interests, desired activities, and group type (e.g., corporate, family, students).'
    ),
});
export type PersonalizedTravelRecommendationsInput = z.infer<typeof PersonalizedTravelRecommendationsInputSchema>;

const PersonalizedTravelRecommendationsOutputSchema = z.object({
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
export type PersonalizedTravelRecommendationsOutput = z.infer<typeof PersonalizedTravelRecommendationsOutputSchema>;

export async function getPersonalizedTravelRecommendations(
  input: PersonalizedTravelRecommendationsInput
): Promise<PersonalizedTravelRecommendationsOutput> {
  return personalizedTravelRecommendationsFlow(input);
}

const personalizedTravelRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedTravelRecommendationsPrompt',
  input: {schema: PersonalizedTravelRecommendationsInputSchema},
  output: {schema: PersonalizedTravelRecommendationsOutputSchema},
  prompt: `You are an expert travel agent specializing in creating personalized group trips. Based on the user\'s preferences, provide a list of recommended travel destinations and detailed itinerary suggestions. Leverage historical travel data and trending destinations to provide relevant and unique recommendations. Consider budget, travel style, interests, and group type.

User Preferences: {{{preferences}}}

Respond in the following format:
```json
{
  "destinations": ["Destination 1", "Destination 2", ...],
  "itinerarySuggestions": "Detailed itinerary suggestions for the user\'s trip.",
  "additionalNotes": "Any additional notes or recommendations."
}
```',
});

const personalizedTravelRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedTravelRecommendationsFlow',
    inputSchema: PersonalizedTravelRecommendationsInputSchema,
    outputSchema: PersonalizedTravelRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedTravelRecommendationsPrompt(input);
    return output!;
  }
);
