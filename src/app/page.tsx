import Hero from '@/components/sections/hero';
import Destinations from '@/components/sections/destinations';
import Inspirations from '@/components/sections/inspirations';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import SocialFollow from '@/components/sections/social-follow';

export default function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <SocialFollow />
      <Inspirations />
      <Services />
      <About />
      <Contact />
    </>
  );
}
