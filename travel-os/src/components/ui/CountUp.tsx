"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string; // e.g. "500+" or "£340" or "94%"
  className?: string;
  duration?: number;
}

function parseNumber(val: string): { prefix: string; num: number; suffix: string } {
  const match = val.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/);
  if (!match) return { prefix: "", num: 0, suffix: val };
  return {
    prefix: match[1],
    num: parseInt(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

export default function CountUp({ value, className, duration = 1.8 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  const { prefix, num, suffix } = parseNumber(value);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      setDisplay(current >= 1000 ? current.toLocaleString() : String(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, num, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
