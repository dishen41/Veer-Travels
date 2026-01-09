import { Plane, Hotel, Compass, Users } from 'lucide-react';

const services = [
  {
    icon: <Plane className="h-10 w-10 text-primary" />,
    title: 'Custom Itinerary Planning',
    description: 'We design unique travel plans tailored to your group\'s interests, budget, and timeline.',
  },
  {
    icon: <Hotel className="h-10 w-10 text-primary" />,
    title: 'Hotel & Logistics',
    description: 'From booking the best hotels to managing all your transport, we handle all the details.',
  },
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: 'Guided Tours',
    description: 'Explore destinations with our expert local guides who bring each location to life.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Group Management',
    description: 'Specializing in trips for corporates, families, and students, ensuring a smooth experience for all.',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Services</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We provide end-to-end services to make your group travel seamless and memorable.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-card/50 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-headline font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
