"use client"

import { useEffect } from "react";
import ParallaxImage from "./components/ParallaxImage";
import ParallaxVideo from "./components/ParallaxVideo";
import Lenis from "lenis";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionClass) => {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app">
      <section className="hero">
        {/* <div className="img">
          <ParallaxVideo
            src="/videos/muglervideo.mp4"
            autoPlay
            loop
            muted
          />
        </div> */}

        <div className="title">
          <h1>Front-end Craftsman <span className="italic">with UX/UI focus</span></h1>
        </div>

        <div className="nav">
          <p>MARIO HERNÁNDEZ</p>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>PROJECTS</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>PROFILE</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('banner'); }}>CONTACT</a>
        </div>

        <div className="scroll-indicator">
          <p>SCROLL</p>
          <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>


      <section className="projects">

        <div className="projects-brief">
          <p>To design is to communicate clearly by whatever means you can control or master. - MILTON GLASER</p>
        </div>

        <div className="col projects-cover">
          <div className="img">
            <ParallaxImage src="/portraits/gradient1.jpg" alt="" />
          </div>
        </div>
        <div className="col projects-list">
          <div className="project">
            <h1>PORTFOLIO V.1</h1>
            <p>A compact portfolio/CV built with the Astro framework, styled to resemble an IDE, where personal information replaces code variables.</p>
          </div>
          <div className="project">
            <h1>ASIREM</h1>
            <p>A mockup of a hypothetical luxury shop designed to practice CSS techniques, including Grid and Flexbox.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="col intro">
          <p>Who am I?</p>
          <p>
            I&apos;m Mario. A polyglot fluent in 8 languages, I enjoy breaking communication barriers and creating seamless digital experiences.
            I like to design impactful visuals and purposeful concepts,
            and I thrive in collaborative environments where my tech skills, creativity, and social abilities come together.
          </p>
        </div>
        <div className="col portrait">
          <div className="portrait-container">
            <div className="img">
              <ParallaxImage src="/portraits/portrait1.jpeg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="banner">
        <div className="img">
          <ParallaxImage src="/portraits/gradient2.jpg" alt="" />
        </div>

        <div className="banner-copy">
          <p>GET IN TOUCH WITH ME!</p>
          <p className="subtitle">I&apos;m always open to collaborating on new projects.</p>
          <div className="buttons">
            <a href="https://www.linkedin.com/in/josemariohernandez" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:mariohrdezdeveloper@gmail.com">
              Email Me
            </a>
            <a href="https://github.com/mariomhz" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </section>


      <section className="footer">
        <div className="col">
          <p><a href="https://instagram.com/mariocoding" target="_blank" rel="noopener noreferrer">Instagram</a> / <a href="https://github.com/mariomhz" target="_blank" rel="noopener noreferrer">Github</a> / <a href="https://www.linkedin.com/in/josemariohernandez/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <div className="footer-links">
            <h1 onClick={scrollToTop} style={{ cursor: 'pointer' }}>Back to top</h1>
            <h1 onClick={() => scrollToSection('projects')} style={{ cursor: 'pointer' }}>Projects</h1>
            <h1 onClick={() => scrollToSection('about')} style={{ cursor: 'pointer' }}>About</h1>
            <h1 onClick={() => scrollToSection('banner')} style={{ cursor: 'pointer' }}>Contact</h1>
          </div>
          <p>&copy; designed by Mario Hernandez</p>
        </div>
      </section>
    </div>
  );
}