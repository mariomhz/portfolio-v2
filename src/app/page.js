"use client"

import { useEffect, useState } from "react";
import ParallaxImage from "./components/ParallaxImage";
import ParallaxVideo from "./components/ParallaxVideo";
import Lenis from "lenis";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Loading effect
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
      setLoadingProgress(Math.floor(progress));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const isClickable = 
        target.closest('a, button, [onclick], .scroll-indicator, .footer-links h1') !== null;
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

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

  const scrollToNextSection = () => {
    scrollToSection('projects');
  };

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    const checkTouchDevice = () => {
      try {
        return (
          typeof window !== "undefined" &&
          ("ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0)
        );
      } catch {
        return false;
      }
    };

    const isTouch = checkTouchDevice();
    cursor.style.display = isTouch ? "none" : "block";

    const handleResize = () => {
      const touch = checkTouchDevice();
      cursor.style.display = touch ? "none" : "block";
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        opacity: loadingProgress === 100 ? 0 : 1,
        transition: 'opacity 0.5s ease'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-montserrat), sans-serif',
          fontSize: 'clamp(48px, 8vw, 120px)',
          fontWeight: 400,
          letterSpacing: '-2px',
          color: 'white',
          marginBottom: '2rem'
        }}>
          {loadingProgress}%
        </h1>
        <div style={{
          width: '60%',
          maxWidth: '400px',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${loadingProgress}%`,
            backgroundColor: 'white',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <p style={{
          marginTop: '2rem',
          fontSize: '12px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          Loading Portfolio
        </p>
      </div>
    );
  }

  return (
    <>
      <div 
        className="custom-cursor"
        style={{
          position: 'fixed',
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderRadius: '50%',
          border: '2px solid white',
          backgroundColor: 'white',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />
      
      <div className="app" style={{ cursor: 'auto' }}>
        <section className="hero">
          <div className="title">
            <h1>Front-end Developer <span className="italic">with UX/UI focus</span></h1>
          </div>

          <div className="nav">
            <p>MARIO HERNÁNDEZ</p>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>PROJECTS</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>PROFILE</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('banner'); }}>CONTACT</a>
          </div>

          <div className="scroll-indicator" onClick={scrollToNextSection} style={{ cursor: 'pointer' }}>
            <p style={{ pointerEvents: 'none' }}>SCROLL</p>
            <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ pointerEvents: 'none' }}>
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>

        <section className="projects">
          <div className="projects-brief">
            <p>/ NEXT.JS</p>
            <p>/ REACT</p>
            <p>/ VUE</p>
            <p>/ HTML</p>
            <p>/ CSS</p>
            <p>/ JAVASCRIPT</p>
            <p>/ TYPESCRIPT</p>
            <p>/ TAILWIND</p>
            <p>/ BOOTSTRAP</p>
            <p>/ FIGMA</p>
            <p>/ ILLUSTRATOR</p>
            <p>/ JAVA</p>
            <p>/ SPRING BOOT</p>
            <p>/ C#</p>
            <p>/ MYSQL</p>
          </div>

          <div className="col projects-cover">
            <div className="img">
              <ParallaxImage src="/portraits/gradient1.jpg" alt="" />
            </div>
          </div>
          <div className="col projects-list">
            <div className="project">
              <h1><a href="https://portfolio-eight-iota-48.vercel.app/" target="_blank" rel="noopener noreferrer">PORTFOLIO V.1</a></h1>
              <p>A compact portfolio/CV built with the Astro framework.</p>
            </div>
            <div className="project">
              <h1><a href="" target="_blank">MOCKUP #1</a></h1>
              <p>A mockup of a hypothetical luxury built with HTML and CSS.</p>
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
                <ParallaxImage src="/portraits/gradient3.jpg" alt="" />
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
              <h1 onClick={scrollToTop} style={{ cursor: 'none' }}>Back to top</h1>
              <h1 onClick={() => scrollToSection('projects')} style={{ cursor: 'none' }}>Projects</h1>
              <h1 onClick={() => scrollToSection('about')} style={{ cursor: 'none' }}>About</h1>
              <h1 onClick={() => scrollToSection('banner')} style={{ cursor: 'none' }}>Contact</h1>
            </div>
            <p>&copy; developed and designed by Mario Hernandez</p>
          </div>
        </section>
      </div>
    </>
  );
}