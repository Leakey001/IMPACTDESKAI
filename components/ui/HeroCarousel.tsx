"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CarouselSlide {
  src: string;
  alt: string;
  headline: string;
  sub: string;
}

// ─── Default slides (shared by homepage + dashboard) ─────────────────────────
// Images live in public/heroimages/ — served as static assets by Next.js
export const defaultSlides: CarouselSlide[] = [
  {
    src: "/heroimages/Image1.avif",
    alt: "ImpactDesk AI — Grant writing made effortless",
    headline: "Write Winning Grants",
    sub: "AI-powered proposals that move funders to say yes.",
  },


  {
    src: "/heroimages/image6.avif",
    alt: "ImpactDesk AI — Reach donors faster",
    headline: "Reach Donors Faster",
    sub: "Craft personalised donor communications at scale.",
  },
  {
    src: "/heroimages/image7.avif",
    alt: "ImpactDesk AI — Scale your mission",
    headline: "Scale Your Mission",
    sub: "Multiply your organisation's reach without multiplying its cost.",
  },
  {
    src: "/heroimages/image8.avif",
    alt: "ImpactDesk AI — Build funder confidence",
    headline: "Build Funder Confidence",
    sub: "Professional, consistent narratives that earn long-term trust.",
  },
  {
    src: "/heroimages/image9.avif",
    alt: "ImpactDesk AI — Streamline reporting",
    headline: "Streamline Reporting",
    sub: "Turn compliance reporting into a competitive advantage.",
  },
  {
    src: "/heroimages/image10.avif",
    alt: "ImpactDesk AI — Data-driven impact",
    headline: "Lead with Data",
    sub: "Translate your program outcomes into evidence funders trust.",
  },
  {
    src: "/heroimages/image11.avif",
    alt: "ImpactDesk AI — Consistent brand voice",
    headline: "Own Your Voice",
    sub: "AI that learns your tone so every document sounds like you.",
  },
  {
    src: "/heroimages/image12.avif",
    alt: "ImpactDesk AI — Accelerate your funding",
    headline: "Accelerate Funding",
    sub: "Draft in minutes, not days — and win more grants.",
  },
];

const INTERVAL_MS = 5000;

// ─── Props ────────────────────────────────────────────────────────────────────
interface HeroCarouselProps {
  className?: string;
  /** Override slides — defaults to defaultSlides if omitted */
  slides?: CarouselSlide[];
}

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroCarousel({ className, slides = defaultSlides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (!paused) {
      timerRef.current = setTimeout(advance, INTERVAL_MS);
    }
  }, [paused, advance, clearTimer]);

  useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [current, paused, scheduleNext, clearTimer]);

  const goToSlide = (index: number) => {
    clearTimer();
    setCurrent(index);
  };

  return (
    <section
      aria-label="Featured highlights carousel"
      aria-roledescription="carousel"
      className={cn(
        "relative w-full overflow-hidden rounded-2xl shadow-xl",
        // Default aspect ratio only applied when not overridden (standalone mode)
        !className?.includes("aspect-auto") && "aspect-[4/3] sm:aspect-[16/7]",
        // Fill parent height when used as a background layer
        className?.includes("h-full") && "h-full",
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ── Slides — crossfade via opacity ─────────────────────────────────── */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
          aria-hidden={index !== current}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Image — cover with top-anchor on mobile so subjects aren't cropped */}
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover object-[center_20%] sm:object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1280px"
          />

          {/* Dark scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10" />

          {/* Text overlay — only shown in standalone (non-background) mode */}
          {!className?.includes("aspect-auto") && (
            <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-8 sm:px-10 sm:pb-12">
              <p
                className={cn(
                  "text-white/75 text-[10px] sm:text-sm font-semibold tracking-widest uppercase mb-1 sm:mb-2",
                  "transition-all duration-500 ease-in-out",
                  index === current ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-3"
                )}
              >
                ImpactDesk AI
              </p>
              <h2
                className={cn(
                  "text-white text-lg sm:text-3xl md:text-4xl font-bold leading-tight mb-1 sm:mb-2",
                  "transition-all duration-500 ease-in-out",
                  index === current ? "opacity-100 translate-y-0 delay-[350ms]" : "opacity-0 translate-y-3"
                )}
              >
                {slide.headline}
              </h2>
              <p
                className={cn(
                  "text-white/75 text-xs sm:text-base max-w-xs sm:max-w-lg",
                  "transition-all duration-500 ease-in-out",
                  index === current ? "opacity-100 translate-y-0 delay-[400ms]" : "opacity-0 translate-y-3"
                )}
              >
                {slide.sub}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* ── Dot indicators ──────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"
        role="tablist"
        aria-label="Carousel slides"
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
            onClick={() => goToSlide(index)}
            className={cn(
              "rounded-full transition-all duration-300 ease-in-out",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
              index === current
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>

      {/* ── Progress bar ────────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30">
        <div
          key={`progress-${current}`}
          className="h-full bg-primary-blue origin-left"
          style={{
            animation: paused
              ? "none"
              : `progress-bar ${INTERVAL_MS}ms linear forwards`,
          }}
        />
      </div>
    </section>
  );
}
