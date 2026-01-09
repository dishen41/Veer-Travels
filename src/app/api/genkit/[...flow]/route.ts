import { createFlows } from '@genkit-ai/next';
import { recommendItinerary } from '@/ai/flows/recommend';

export const { GET, POST } = createFlows({
  flows: [recommendItinerary],
  // Disabling streaming for this flow as we expect a single JSON object.
  streaming: {
    recommendItinerary: false,
  },
});
