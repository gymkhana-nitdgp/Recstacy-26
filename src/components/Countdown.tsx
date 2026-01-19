import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Countdown: React.FC = () => {
  const daysRef = useRef<HTMLSpanElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const minsRef = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => Math.floor(n).toString().padStart(2, '0');

  useGSAP(() => {
    const targetDate = new Date("2026-02-01T00:00:00").getTime();
    const getRemaining = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      return diff <= 0 ? { d: 0, h: 0, m: 0 } : { d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000) };
    };
    const tracker = { d: 0, h: 0, m: 0 };
    gsap.to(tracker, {
      d: getRemaining().d, h: getRemaining().h, m: getRemaining().m,
      duration: 2.5, ease: "power3.out", snap: { d: 1, h: 1, m: 1 },
      onUpdate: () => {
        if (daysRef.current) daysRef.current.innerText = fmt(tracker.d);
        if (hoursRef.current) hoursRef.current.innerText = fmt(tracker.h);
        if (minsRef.current) minsRef.current.innerText = fmt(tracker.m);
      }
    });
  }, []);

  const labels = ["DAYS", "HOURS", "MINS"];
  const refs = [daysRef, hoursRef, minsRef];

  const numberStyles = "text-4xl md:text-6xl font-black leading-none text-[#FFEBD0] w-[1.5em] text-center [text-shadow:0_2px_10px_rgba(0,0,0,0.9),0_0_20px_rgba(255,69,0,0.3)]";
  const labelStyles = "text-[10px] md:text-xs tracking-widest text-[#FFEBD0]/80 mt-2 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]";
  const separatorStyles = "text-3xl md:text-5xl text-[#FFEBD0]/80 -mt-1 md:-mt-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]";

  return (
    <div
      className={`
          absolute z-40 select-none pointer-events-none flex gap-4 md:gap-6 items-start
          top-[48%] left-1/2 -translate-x-1/2
          md:top-auto md:bottom-12 md:left-12 md:right-auto md:translate-x-0
        `}
      style={{ fontFamily: "'Man of Space', sans-serif" }}
    >
      {labels.map((label, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col items-center">
            <span ref={refs[idx]} className={numberStyles}>00</span>
            <span className={labelStyles}>{label}</span>
          </div>
          {idx < labels.length - 1 && (
            <div className={separatorStyles}>:</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Countdown;