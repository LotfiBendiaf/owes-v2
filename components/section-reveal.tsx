"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function SectionReveal({
  children,
  direction,
}: {
  children: ReactNode;
  direction: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.revealed = "true";
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="section-reveal" data-direction={direction}>
      {children}
    </div>
  );
}
