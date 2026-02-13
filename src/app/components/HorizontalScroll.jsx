"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HorizontalScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "MOSIR",
    description: "Interactive 3D globe built with Three.js showcasing the languages I speak.",
    url: "https://mariomhz.github.io/mosir/",
    image: "/portraits/gradient1.jpg",
    screenshot: "/projects/mosir-screenshot.jpg",
    tags: ["Three.js", "JavaScript", "HTML"],
  },
  {
    id: 2,
    title: "SKYABOVE",
    description: "Live flight statistics dashboard with real-time aviation metrics and flip-clock animations.",
    url: "https://skyabove-dashboard.vercel.app",
    image: "/portraits/gradient2.jpg",
    screenshot: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    id: 3,
    title: "PROJECT 3",
    description: "in progress...",
    url: "#",
    image: "/portraits/gradient5.jpg",
    screenshot: null,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 4,
    title: "PROJECT 4",
    description: "in progress...",
    url: "#",
    image: "/portraits/gradient4.jpg",
    screenshot: null,
    tags: ["HTML", "CSS", "JavaScript"],
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
  const [hoveredProject, setHoveredProject] = useState(null);

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
              <span>Scroll to explore projects</span>
              <span className={styles.arrow}>→</span>
            </div>
          </div>

          {/* Project Panels */}
          {projects.map((project, index) => (
            <div key={project.id} className={`${styles.panel} ${styles.projectPanel}`}>
              <div className={styles.projectCard}>
                {project.url && project.url !== "#" ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.projectImageWrapper} ${hoveredProject === project.id ? styles.hovered : ''}`}
                    data-cursor="pointer"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.gradientImage}
                    />
                    {project.screenshot && (
                      <img
                        src={project.screenshot}
                        alt={`${project.title} screenshot`}
                        className={styles.screenshotImage}
                      />
                    )}
                  </a>
                ) : (
                  <div
                    className={styles.projectImageWrapper}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.gradientImage}
                    />
                    {project.screenshot && (
                      <img
                        src={project.screenshot}
                        alt={`${project.title} screenshot`}
                        className={styles.screenshotImage}
                      />
                    )}
                  </div>
                )}
                <div className={styles.projectInfo}>
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h1
                    className={styles.projectTitle}
                    {...(project.url && project.url !== "#" && {
                      onMouseEnter: () => setHoveredProject(project.id),
                      onMouseLeave: () => setHoveredProject(null)
                    })}
                  >
                    {project.url && project.url !== "#" ? (
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
