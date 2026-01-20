import React, { useEffect, useRef, useCallback, useMemo } from 'react';

// --- CONFIGURATION ---
const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

// --- UTILS ---
const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

// --- STYLES INJECTION ---
const KEYFRAMES_ID = 'pc-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `;
  document.head.appendChild(style);
}

// --- ICONS ---
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// --- TYPES ---
interface ProfileCardProps {
  avatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string; // This will be the instagram ID
  showUserInfo?: boolean;
  onContactClick?: () => void;
  className?: string;
  enableTilt?: boolean;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

// --- COMPONENT ---
const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '',
  name = 'User Name',
  title = 'Developer',
  handle = 'recstacy', 
  showUserInfo = true,
  className = '',
  enableTilt = true
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  // --- TILT ENGINE ---
  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = (): void => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number): void {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number): void {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter(): void {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number): void {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent(): { x: number; y: number; tx: number; ty: number } {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel(): void {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement): { x: number; y: number } => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback((event: PointerEvent): void => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    const { x, y } = getOffsets(event, shell);
    tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerEnter = useCallback((event: PointerEvent): void => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    shell.classList.add('active');
    shell.classList.add('entering');
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => {
      shell.classList.remove('entering');
    }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);
    const { x, y } = getOffsets(event, shell);
    tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerLeave = useCallback((): void => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();
    const checkSettle = (): void => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardRadius = '24px'; 

  // Removed gradient and glow styles to ensure black background
  const cardStyle = useMemo(() => ({
    '--pointer-x': '50%',
    '--pointer-y': '50%',
    '--pointer-from-center': '0',
    '--pointer-from-top': '0.5',
    '--pointer-from-left': '0.5',
    '--card-opacity': '0',
    '--rotate-x': '0deg',
    '--rotate-y': '0deg',
    '--background-x': '50%',
    '--background-y': '50%',
    '--card-radius': cardRadius,
  }), [cardRadius]);

  return (
    <div ref={wrapRef} className={`relative touch-none ${className}`} style={{ perspective: '600px', transform: 'translate3d(0, 0, 0.1px)', ...cardStyle } as React.CSSProperties}>
      <div ref={shellRef} className="relative z-[1] group">
        <section className="grid relative overflow-hidden" style={{ width: '100%', height: '100%', aspectRatio: '0.718', borderRadius: cardRadius, backgroundBlendMode: 'color-dodge, normal, normal, normal', boxShadow: 'rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px', transition: 'transform 1s ease', transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)', background: '#000000', backfaceVisibility: 'hidden' }}>
          
          {/* Background is purely black now (#000000) - Removed shine/glare divs */}
          <div className="absolute inset-0" style={{ backgroundColor: '#000000', borderRadius: cardRadius, display: 'grid', gridArea: '1 / -1' }}>

            {/* Content Layer */}
            <div className="overflow-visible" style={{ mixBlendMode: 'normal', transform: 'translateZ(2px)', gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none', backfaceVisibility: 'hidden', zIndex: 10 }}>
              
              {/* Main Avatar */}
              <img className="w-full absolute left-1/2 bottom-[-1px] transition-transform duration-[120ms] ease-out" src={avatarUrl} alt={name} style={{ transformOrigin: '50% 100%', transform: 'translateX(-50%) scale(1)', borderRadius: cardRadius, backfaceVisibility: 'hidden', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />

              {/* User Info Overlay */}
              {showUserInfo && (
                <div 
                  className="absolute z-[20] flex items-center justify-between backdrop-blur-[30px] border border-white/20" 
                  style={{ 
                    bottom: '20px', 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '94%',
                    background: 'rgba(255, 255, 255, 0.85)', // High opacity white
                    borderRadius: '28px', 
                    padding: '24px 28px',
                    pointerEvents: 'auto' 
                  }}
                >
                  <div className="flex items-center gap-6"> 
                    {/* Avatar */}
                    <div className="rounded-full overflow-hidden border border-black/20 flex-shrink-0 w-20 h-20">
                      <img className="w-full h-full object-cover rounded-full" src={avatarUrl} alt="mini" />
                    </div>
                    
                    {/* Text Container */}
                    <div className="flex flex-col items-start gap-1"> 
                      <div className="text-5xl font-bold text-black leading-none drop-shadow-sm tracking-wide">
                        {name}
                      </div>
                      <div className="text-3xl font-medium text-black/80 leading-none margin-top-3">
                        {title}
                      </div>
                    </div>
                  </div>
                  
                  {/* Instagram Button */}
                  <a 
                     href={handle ? `https://instagram.com/${handle}` : '#'} 
                     target="_blank" 
                     rel="noreferrer"
                     onPointerDown={(e) => e.stopPropagation()} 
                     className="flex items-center justify-center w-16 h-16 rounded-full border border-black/30 bg-black/5 text-black transition-all hover:bg-black/10 hover:scale-110 active:scale-95 cursor-pointer shadow-lg ml-4" 
                     style={{ pointerEvents: 'auto' }}
                  >
                    <InstagramIcon className="w-8 h-8" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfileCardComponent);