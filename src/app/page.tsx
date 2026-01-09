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

// --- SUB-COMPONENTS ---

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Text at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white pb-32">
             <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-in slide-in-from-bottom-10 fade-in duration-700">{slide.title}</h1>
                <p className="text-xl md:text-2xl font-light opacity-90">{slide.subtitle}</p>
             </div>
          </div>
        </div>
      ))}
      
      {/* Controls */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-md transition">
         <ChevronLeft className="w-8 h-8" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-md transition">
         <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}