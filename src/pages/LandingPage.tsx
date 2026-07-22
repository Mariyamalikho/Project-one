import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Terminal, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SecretConsole } from '../components/SecretConsole';
import { useGame } from '../state/GameProvider';

function DigitalRain() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      {Array.from({ length: 40 }).map((_, index) => (
        <span
          key={index}
          className="absolute top-0 animate-rain font-mono text-[10px] text-cyan/70"
          style={{
            left: `${(index * 37) % 100}%`,
            animationDelay: `${(index % 8) * 0.2}s`,
            animationDuration: `${1.5 + (index % 5) * 0.3}s`,
          }}
        >
          0101 MARRY EVAA BUTTERFLY ECHO_GRID
        </span>
      ))}
    </div>
  );
}

function EchoGridCity() {
  return (
    <div className="city-skyline pointer-events-none" aria-hidden>
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          className="building"
          key={index}
          style={{
            height: `${20 + ((index * 19) % 55)}vh`,
            width: `${2.8 + (index % 4)}vw`,
            marginLeft: `${index % 2 ? 0.3 : 0.1}vw`,
          }}
        >
          <div className="h-full w-full bg-gradient-to-t from-cyan/20 via-purple/10 to-transparent opacity-60" />
        </div>
      ))}
    </div>
  );
}

export function LandingPage() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 90]);
  const titleY = useTransform(scrollY, [0, 500], [0, -50]);
  const [consoleOpen, setConsoleOpen] = useState(false);

  function handleBeginRecovery() {
    dispatch({ type: 'SET_BOOTED', booted: true });
    navigate('/story');
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-void-dark">
      {/* Background VFX */}
      <DigitalRain />
      <motion.div style={{ y }} className="absolute inset-0">
        <EchoGridCity />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_60%),linear-gradient(180deg,rgba(5,5,6,0.3),#050506_85%)]" />

      {/* Floating Broken Moon */}
      <div className="absolute top-12 right-12 md:right-32 h-36 w-36 rounded-full border border-pink/30 bg-gradient-to-br from-pink/20 via-purple/10 to-transparent blur-[1px] shadow-neon-pink opacity-80 pointer-events-none animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-16 pt-12 text-center">
        <motion.div style={{ y: titleY }} className="mx-auto w-full max-w-4xl">
          {/* OS Header Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-cyan animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan font-bold">
              Subconscious OS v7.03 // Echo Grid
            </span>
          </motion.div>

          {/* Title */}
          <h1
            className="glitch-title font-display text-[clamp(4.5rem,15vw,11rem)] font-black leading-none tracking-tight"
            data-text="glitch.exe"
          >
            glitch.exe
          </h1>

          {/* Prompt Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-6 font-display text-xl md:text-3xl text-pink tracking-wide italic"
          >
            &quot;The version you archived never stopped waiting.&quot;
          </motion.p>

          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-body">
            Wake inside a corrupted digital simulation as Evaa. Discover archived memories, repair broken drawings with Marry, and face what you buried.
          </p>

          {/* Primary CTA: Begin Recovery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-col items-center justify-center gap-4"
          >
            <button
              onClick={handleBeginRecovery}
              type="button"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border-2 border-cyan bg-cyan/10 px-10 py-5 font-display text-lg uppercase tracking-[0.25em] text-cyan shadow-neon transition-all hover:bg-cyan hover:text-black hover:shadow-neon-cyan active:scale-95"
            >
              <Sparkles className="animate-spin-slow" size={22} />
              <span>Begin Recovery</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>

            <button
              onClick={() => setConsoleOpen(true)}
              type="button"
              className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-cyan transition-colors"
            >
              <Terminal size={14} />
              <span>Open Secret Console (CTRL_EXEC)</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between text-[11px] font-mono uppercase tracking-widest text-slate-400">
          <span>IDENTITY: EVAA // ARCHIVE: MARRY</span>
          <span>EMOTIONAL MEMORY ENGINE ONLINE</span>
          <span>30 EPISODES // 3 ACTS</span>
        </div>
      </div>

      <SecretConsole open={consoleOpen} onClose={() => setConsoleOpen(false)} />
    </section>
  );
}
