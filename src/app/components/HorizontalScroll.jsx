"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HorizontalScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "PORTFOLIO V.1",
    description: "A compact portfolio/CV built with the Astro framework.",
    url: "https://portfolio-eight-iota-48.vercel.app/",
    image: "/portraits/gradient1.jpg",
    tags: ["Astro", "CSS", "JavaScript"],
  },
  {                                                                                                                id: 2,                                                                                                     
    title: "ASIREM",                                                                                           
    description: "A luxury fragrance e-commerce concept with dynamic color palettes, product catalog, and multi-step checkout flow.",
    url: "https://mariomhz.github.io/Fragrance-Website/",
    image: "/portraits/gradient2.jpg",
    tags: ["HTML", "CSS", "JavaScript"]
  },
];

const skills = [
  "JAVASCRIPT (ES16)",
  "TYPESCRIPT",
  "REACT",
  "NEXT.JS",
  "VUE",
  "HTML5 & CSS3",
  "TAILWIND CSS",
  "RESPONSIVE DESIGN & ACCESSIBILITY",
  "WEB PERFORMANCE & SEO",
  "STATE MANAGEMENT PATTERNS",
  "REST APIS & AUTHENTICATION (JWT)",
  "SPRING BOOT",
  "MYSQL",
  "TESTING (JEST, RTL, CYPRESS)",
  "GIT & CI/CD",
  "DOCKER",
  "FIGMA",
  "THREE.JS"
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    const timer = setTimeout(() => {
      const scrollDistance = wrapper.scrollWidth - window.innerWidth;

      const tween = gsap.to(wrapper, {
        x: -scrollDistance,
        ease: "none",
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });

      container._scrollTrigger = scrollTrigger;
      container._tween = tween;

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (container._scrollTrigger) {
        container._scrollTrigger.kill();
      }
      if (container._tween) {
        container._tween.kill();
      }
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={`${styles.horizontalSection} projects`}>
      <div ref={containerRef} className={styles.horizontalContainer}>
        <div ref={wrapperRef} className={styles.horizontalWrapper}>
          {/* Skills Panel */}
          <div className={`${styles.panel} ${styles.skillsPanel}`}>
            <div className={styles.skillsContent}>
              <h2 className={styles.skillsTitle}>Tech Skills</h2>
              <div className={styles.skillsList}>
                {skills.map((skill, index) => (
                  <p key={index}>/ {skill}</p>
                ))}
              </div>
            </div>
            <div className={styles.scrollHint}>
              <span>Scroll down to explore projects</span>
              <span className={styles.arrow}>→</span>
            </div>
          </div>

          {/* Project Panels */}
          {projects.map((project, index) => (
            <div key={project.id} className={`${styles.panel} ${styles.projectPanel}`}>
              <div className={styles.projectCard}>
                <div className={styles.projectImageWrapper}>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className={styles.projectInfo}>
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h1 className={styles.projectTitle}>
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h1>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Panel */}
          <div className={`${styles.panel} ${styles.ctaPanel}`}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>More projects coming soon</h2>
              <p className={styles.ctaText}>Stay tuned for updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
