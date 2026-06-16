import { motion, useScroll, useTransform } from 'framer-motion';
import { CircuitBoard, Play, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function DigitalRain() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      {Array.from({ length: 48 }).map((_, index) => (
        <span
          key={index}
          className="absolute top-0 animate-rain font-mono text-xs text-cyan/70"
          style={{
            left: `${(index * 37) % 100}%`,
            animationDelay: `${(index % 9) * 0.16}s`,
            animationDuration: `${1.2 + (index % 6) * 0.2}s`,
          }}
        >
          0101 MARRY EVAA NULL
        </span>
      ))}
    </div>
  );
}

function City() {
  return (
    <div className="city-skyline" aria-hidden>
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          className="building"
          key={index}
          style={{
            height: `${18 + ((index * 17) % 48)}vh`,
            width: `${3 + (index % 4)}vw`,
            marginLeft: `${index % 2 ? 0.3 : 0.1}vw`,
          }}
        />
      ))}
    </div>
  );
}

export function LandingPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 90]);
  const titleY = useTransform(scrollY, [0, 500], [0, -55]);
  const [signal, setSignal] = useState('touch a fragment');
  const fragments = ['Evaa awake', 'Marry nested', 'Bot watching', 'memory door open'];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <DigitalRain />
      <motion.div style={{ y }} className="absolute inset-0">
        <City />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,10,.28),rgba(5,5,10,.86)_72%,#05050a)]" />
      <div className="relative z-10 flex min-h-screen items-center px-5 pb-24 pt-10">
        <motion.div style={{ y: titleY }} className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-display text-sm uppercase tracking-[0.45em] text-cyan">corrupted visual novel</p>
          <h1 className="glitch-title font-display text-[clamp(4rem,14vw,12rem)] font-black leading-none" data-text="glitch.exe">
            glitch.exe
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200 md:text-2xl">
            Follow Evaa through a fractured cyberpunk reality where a mysterious child named Marry waits inside every deleted feeling.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/story" className="primary-cta">
              <Play size={20} aria-hidden />
              <span>Start Journey</span>
            </Link>
            <Link to="/settings" className="secondary-cta">
              <Settings size={20} aria-hidden />
              <span>Settings</span>
            </Link>
          </div>
          <div className="landing-console mt-8 max-w-3xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-cyan">
              <CircuitBoard size={17} aria-hidden />
              <span className="font-display text-xs uppercase tracking-[0.22em]">pre-boot signal</span>
              <span className="ml-auto font-mono text-xs text-acid">{signal}</span>
            </div>
            <div className="grid gap-2 p-3 sm:grid-cols-4">
              {fragments.map((fragment) => (
                <button key={fragment} type="button" className="signal-fragment" onClick={() => setSignal(fragment)}>
                  {fragment}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/35 px-5 py-5 backdrop-blur">
        <div className="mx-auto grid max-w-6xl gap-4 text-xs uppercase tracking-[0.24em] text-slate-300 md:grid-cols-3">
          <span>auto-save enabled</span>
          <span>choices affect emotional state</span>
          <span>hidden console online</span>
        </div>
      </div>
    </section>
  );
}
