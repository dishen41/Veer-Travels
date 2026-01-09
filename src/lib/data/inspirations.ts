import type { Inspiration } from '@/lib/types';

export const inspirations: Inspiration[] = [
  {
    id: 'corporate-offsite',
    title: 'Corporate Offsites',
    coverImage: 'insp-corporate',
    details: 'Re-energize your team with our custom-planned corporate offsites. From team-building activities in the mountains to brainstorming sessions on a beach, we handle all the logistics so you can focus on strategy and fun.',
    included: [
      'Conference Hall & AV Setup',
      'Team Building Activities',
      'Gala Dinner with DJ Night',
      'Professional Group Photography',
    ],
    groupImages: ['corp-gal-1', 'corp-gal-2', 'corp-gal-3', 'corp-gal-4'],
    testimonials: [
      { name: 'Amit Singh, CEO of Innovate Inc.', comment: 'The best offsite our company has ever had. Flawless execution by Veer Travels.', rating: 5 },
      { name: 'Priya Sharma, HR Head at Tech Solutions', comment: 'Our team came back so motivated. Everything was taken care of, from the stay to the activities.', rating: 5 },
    ],
  },
  {
    id: 'student-groups',
    title: 'Student Groups',
    coverImage: 'insp-student',
    details: 'Educational and fun-filled tours for students of all ages. We curate trips that are not only entertaining but also provide valuable learning experiences, from historical sites to industrial visits.',
    included: [
      'Safe & Secure Accommodations',
      'Guided Educational Tours',
      'Interactive Workshops',
      'Travel Insurance for all members',
    ],
    groupImages: ['stud-gal-1', 'stud-gal-2', 'stud-gal-3', 'stud-gal-4'],
    testimonials: [
      { name: 'Mr. Verma, Principal of DPS', comment: 'The safety and learning of our students were the top priorities, and Veer Travels delivered on both fronts.', rating: 5 },
      { name: 'Rohan, Student Council President', comment: 'It was the most memorable trip of our school life. So well organized!', rating: 4 },
    ],
  },
  {
    id: 'family-getaways',
    title: 'Family Getaways',
    coverImage: 'insp-family',
    details: 'Create lasting memories with a custom-designed family vacation. Whether it\'s a large family reunion or a small group getaway, we plan trips that have something for every generation, from kids to grandparents.',
    included: [
      'Family-friendly Resorts & Hotels',
      'Activities for All Age Groups',
      'Private Transportation',
      'Optional Childcare Services',
    ],
    groupImages: ['dest-goa', 'dest-bali', 'dest-kerala', 'dest-switzerland'],
    testimonials: [
      { name: 'The Sharma Family', comment: 'Our family reunion was a huge success. Veer Travels managed our group of 25 people effortlessly.', rating: 5 },
      { name: 'Anjali & Raj', comment: 'They planned a perfect trip for us and our parents. A great mix of relaxation and sightseeing.', rating: 5 },
    ],
  },
];

export const getInspirationById = (id: string) => {
    return inspirations.find((i) => i.id === id);
};
