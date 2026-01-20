import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Countdown: React.FC = () => {
  const daysRef = useRef<HTMLSpanElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const minsRef = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => Math.floor(n).toString().padStart(2, '0');

  useGSAP(() => {
    const targetDate = new Date("2026-01-30T00:00:00").getTime();
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

  const numberStyles = "text-6xl md:text-8xl font-black leading-none text-[#FFEBD0] w-[1.1em] text-center [text-shadow:0_4px_15px_rgba(0,0,0,0.9),0_0_25px_rgba(255,69,0,0.4)]";
  
  // CHANGED: Increased from text-sm -> text-xl (mobile) and text-xl -> text-3xl (desktop)
  const labelStyles = "text-xl md:text-3xl tracking-widest text-[#FFEBD0]/80 mt-2 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]";
  
  const separatorStyles = "text-4xl md:text-7xl text-[#FFEBD0]/80 mt-1 md:mt-0 mx-2 md:mx-4 [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]";

  return (
    <div
      className={`
          absolute z-40 select-none pointer-events-none flex items-start
          top-[48%] left-1/2 -translate-x-1/2
          md:top-auto md:bottom-12 md:left-12 md:right-auto md:translate-x-0
        `}
      style={{ fontFamily: "'Riot block', sans-serif" }}
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