'use server';

import { ai } from '@/ai/genkit';
import { ItinerarySchema, ItineraryRecommendation } from '@/ai/schemas';

export async function recommendItinerary(prompt: import('zod').infer<typeof ItinerarySchema>) {
  const recommendItineraryFlow = ai.defineFlow(
    {
      name: 'recommendItinerary',
      inputSchema: ItinerarySchema,
      outputSchema: ItineraryRecommendation,
    },
    async (prompt) => {
      const llmResponse = await ai.generate({
        prompt: `Recommend an itinerary for a trip to ${prompt.destination} for a group with the following requirements: ${prompt.groupInfo}.`,
        model: 'googleai/gemini-1.5-flash-preview',
        output: {
          schema: ItineraryRecommendation,
        },
      });

      return llmResponse.output()!;
    }
  );

  return await recommendItineraryFlow(prompt);
}
