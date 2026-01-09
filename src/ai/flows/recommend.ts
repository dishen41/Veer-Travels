'use server';

import * as z from 'zod';
import {ai} from '../genkit';

const ItinerarySuggestion = z.object({
  destination: z.string().describe('The suggested travel destination, e.g., "Bali, Indonesia"'),
  message: z.string().describe('A compelling message describing a sample itinerary for the user.'),
});

export const recommendItinerary = ai.defineFlow(
  {
    name: 'recommendItinerary',
    inputSchema: z.object({
      travelStyle: z.string().optional(),
      interests: z.string().optional(),
    }),
    outputSchema: ItinerarySuggestion,
  },
  async (input) => {
    const prompt = `You are an expert travel agent for 'Veer Travels', a company that specializes in customized group trips. A potential customer has provided their travel preferences.
    
    Travel Style: ${input.travelStyle || 'Not specified'}
    Interests: ${input.interests || 'Not specified'}
    
    Based on these preferences, recommend a single, exciting travel destination (city and country) and write a compelling, brief itinerary suggestion to put in a contact form. The message should be engaging, at least 2 sentences long, and make them want to book a trip.
    
    Provide your response as a JSON object that conforms to the following schema:
    {
      "destination": "string",
      "message": "string"
    }
    `;

    const llmResponse = await ai.generate({
        prompt: prompt,
        model: 'gemini-pro',
        output: {
            format: 'json',
            schema: ItinerarySuggestion,
        }
    });
    
    const suggestion = llmResponse.output;
    if (!suggestion) {
        throw new Error("Failed to generate AI recommendation.");
    }

    return suggestion;
  }
);
