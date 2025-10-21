"use client";

import React, { useRef, useEffect } from "react";
import Lenis from "lenis";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxVideo = ({ src, type = "video/mp4", autoPlay = true, loop = true, muted = true }) => {
  const videoRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const updateBounds = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
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

    const animate = (time) => {
      lenisRef.current.raf(time);

      if (bounds.current) {
        const relativeScroll = lenisRef.current.scroll - bounds.current.top;
        targetTranslateY.current = relativeScroll * 0.2;
      }

      if (videoRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );

        if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
          videoRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      type={type}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      style={{
        willChange: "transform",
        transform: "translateY(0) scale(1.25)",
      }}
    />
  );
};

export default ParallaxVideo;