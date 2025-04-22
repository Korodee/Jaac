import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Subscribe from '@/components/sections/Subscribe';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Subscribe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
