"use client";

import React, { useRef, useEffect } from "react";
import Lenis from "lenis";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImage = ({ src, alt }) => {
  const imageRaf = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const updateBounds = () => {
      if (imageRaf.current) {
        const rect = imageRaf.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const lenisAnimate = (time) => {
      lenisRef.current.raf(time);

      if (bounds.current) {
        const relativeScroll = lenisRef.current.scroll - bounds.current.top;
        targetTranslateY.current = relativeScroll * 0.2;
      }

      if (imageRaf.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );

        if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
          imageRaf.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
        }
      }

      rafId.current = requestAnimationFrame(lenisAnimate);
    };

    rafId.current = requestAnimationFrame(lenisAnimate);

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <img
      ref={imageRaf}
      src={src}
      alt={alt}
      style={{
        willChange: "transform",
        transform: "translateY(0) scale(1.25)",
      }}
    />
  );
};

export default ParallaxImage;