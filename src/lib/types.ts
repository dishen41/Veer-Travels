export interface TopPlace {
  name: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  category: 'domestic' | 'international';
  topPlaces: TopPlace[];
}

export interface Testimonial {
  name: string;
  comment: string;
  rating: number;
}

export interface Inspiration {
  id: string;
  title: string;
  coverImage: string;
  details: string;
  included: string[];
  groupImages: string[];
  testimonials: Testimonial[];
}
