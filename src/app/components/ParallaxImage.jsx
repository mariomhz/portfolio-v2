"use client";

import React, { useRef, useEffect } from "react";
import { useLenis } from "../context/LenisContext";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImage = ({ src, alt }) => {
  const imageRaf = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const lenisRef = useRef(null);
  const boundsInitialized = useRef(false);

  const lenis = useLenis();
  lenisRef.current = lenis;

  useEffect(() => {
    let resizeTimer = null;

    const updateBounds = () => {
      if (imageRaf.current) {
        const currentLenis = lenisRef.current;
        const scrollY = currentLenis ? currentLenis.scroll : window.scrollY;
        const rect = imageRaf.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
        };
        boundsInitialized.current = true;
      }
    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateBounds, 150);
    };

    const animate = () => {
      const currentLenis = lenisRef.current;

      if (currentLenis && !boundsInitialized.current) {
        updateBounds();
      }

      if (bounds.current && currentLenis && typeof currentLenis.scroll === 'number') {
        const relativeScroll = currentLenis.scroll - bounds.current.top;
        targetTranslateY.current = Math.max(-100, Math.min(100, relativeScroll * 0.2));
      }

      if (imageRaf.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );
        imageRaf.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleLoad = () => {
    if (imageRaf.current) {
      const currentLenis = lenisRef.current;
      const scrollY = currentLenis ? currentLenis.scroll : window.scrollY;
      const rect = imageRaf.current.getBoundingClientRect();
      bounds.current = {
        top: rect.top + scrollY,
        bottom: rect.bottom + scrollY,
      };
      boundsInitialized.current = true;
    }
  };

  return (
    <img
      ref={imageRaf}
      src={src}
      alt={alt}
      onLoad={handleLoad}
      style={{
        transform: "translateY(0) scale(1.25)",
      }}
    />
  );
};

export default ParallaxImage;
