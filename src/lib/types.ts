export interface Destination {
  id: string;
  name: string;
  image: string;
  category: 'domestic' | 'international';
  description: string;
  topPlaces: { name: string; image: string }[];
}

export interface Inspiration {
  id: string;
  title: string;
  image: string;
  description: string;
}
