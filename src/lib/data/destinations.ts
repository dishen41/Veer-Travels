import type { Destination } from '@/lib/types';

export const destinations: Destination[] = [
  {
    id: 'kerala',
    name: 'Kerala',
    image: 'dest-kerala',
    category: 'domestic',
    description: 'Known as "God\'s Own Country", Kerala is a coastal state famous for its palm-lined beaches, backwaters, and a network of canals. Inland are the Western Ghats, mountains whose slopes support tea, coffee and spice plantations as well as wildlife.',
    topPlaces: [
      { name: 'Munnar Tea Gardens', image: 'place-munnar' },
      { name: 'Alleppey Backwaters', image: 'place-alleppey' },
      { name: 'Thekkady Wildlife', image: 'place-thekkady' },
    ],
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    image: 'dest-kashmir',
    category: 'domestic',
    description: 'Often called "Paradise on Earth", Kashmir is a jewel of the Himalayas. It is renowned for its stunning natural beauty, including snow-capped mountains, crystal-clear lakes, and lush green valleys.',
    topPlaces: [
      { name: 'Srinagar Dal Lake', image: 'place-srinagar' },
      { name: 'Gulmarg Gondola', image: 'place-gulmarg' },
      { name: 'Pahalgam Valley', image: 'place-pahalgam' },
    ],
  },
  {
    id: 'goa',
    name: 'Goa',
    image: 'dest-goa',
    category: 'domestic',
    description: 'Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area’s tropical spice plantations.',
    topPlaces: [
      { name: 'Calangute Beach', image: 'place-calangute' },
      { name: 'Fort Aguada', image: 'place-aguada' },
      { name: 'Dudhsagar Falls', image: 'place-dudhsagar' },
    ],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    image: 'dest-dubai',
    category: 'international',
    description: 'Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline.',
    topPlaces: [
      { name: 'Burj Khalifa', image: 'place-burj-khalifa' },
      { name: 'Desert Safari', image: 'place-desert-safari' },
      { name: 'The Dubai Mall', image: 'place-dubai-mall' },
    ],
  },
  {
    id: 'bali',
    name: 'Bali',
    image: 'dest-bali',
    category: 'international',
    description: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.',
    topPlaces: [
      { name: 'Ubud Monkey Forest', image: 'place-ubud' },
      { name: 'Tanah Lot Temple', image: 'place-tanah-lot' },
      { name: 'Kuta Beach', image: 'place-kuta' },
    ],
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    image: 'dest-switzerland',
    category: 'international',
    description: 'Switzerland is a mountainous Central European country, home to numerous lakes, villages and the high peaks of the Alps. Its cities contain medieval quarters, with landmarks like capital Bern’s Zytglogge clock tower.',
    topPlaces: [
      { name: 'Interlaken', image: 'place-interlaken' },
      { name: 'Jungfrau Region', image: 'place-jungfrau' },
      { name: 'Lucerne', image: 'place-lucerne' },
    ],
  },
];

export const getDestinationById = (id: string) => {
  return destinations.find((d) => d.id === id);
};
