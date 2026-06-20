import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioGrid from "@/components/PortfolioGrid";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { projectsData } from "@/data/projectsData";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PortfolioGrid projects={projectsData} />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
