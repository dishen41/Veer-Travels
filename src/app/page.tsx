import Hero from '@/components/sections/hero';
import Destinations from '@/components/sections/destinations';
import Inspirations from '@/components/sections/inspirations';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <Inspirations />
      <Services />
      <About />
      <Contact />
    </>
  );
}
