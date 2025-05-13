import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Subscribe from "@/components/sections/Subscribe";
import Header from "@/components/layout/Header";
import SinglePagePreview from "@/components/sections/SinglePagePreview";
import JoinUsCTA from "@/components/sections/JoinUsCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Subscribe />
        <SinglePagePreview />
        <JoinUsCTA />
        <Contact />
      </main>
    </>
  );
}
