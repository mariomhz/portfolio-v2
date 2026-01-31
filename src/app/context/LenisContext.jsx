"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(undefined);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
};

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Connect Lenis to ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Tell GSAP to use Lenis's scroll position
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger and trigger resize after layout is ready
    setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    }, 100);

    return () => {
      gsap.ticker.remove(lenisInstance.raf);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisContext;
