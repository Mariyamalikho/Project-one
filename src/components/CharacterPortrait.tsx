import { motion } from 'framer-motion';
import { Eye, Shield, Sparkles, Terminal, UserCheck } from 'lucide-react';
import { characters } from '../data/world';
import type { CharacterId } from '../types';

interface Props {
  id: CharacterId;
  mood?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CharacterPortrait({ id, mood, size = 'md' }: Props) {
  const char = characters.find((c) => c.id === id) || characters[0];

  const sizeClasses = {
    sm: 'h-24 w-24',
    md: 'h-48 w-48',
    lg: 'h-64 w-64',
  }[size];

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-2xl border bg-void-dark/80 backdrop-blur-md transition-all ${sizeClasses}`}
        style={{ borderColor: `${char.color}60`, boxShadow: `0 0 25px ${char.color}25` }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none animate-pulse"
          style={{ background: `radial-gradient(circle, ${char.color} 0%, transparent 70%)` }}
        />

        {/* Dynamic Holographic Symbol per Character */}
        {id === 'eva' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="relative flex items-center justify-center"
          >
            <div className="h-28 w-28 rounded-full border-2 border-dashed border-cyan/60 flex items-center justify-center">
              <UserCheck size={48} className="text-cyan animate-pulse" />
            </div>
          </motion.div>
        )}

        {id === 'marry' && (
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative flex items-center justify-center"
          >
            <div className="h-28 w-28 rounded-full border-2 border-pink/60 flex items-center justify-center bg-pink/10">
              <Sparkles size={52} className="text-pink animate-spin-slow" />
            </div>
          </motion.div>
        )}

        {id === 'bugsy' && (
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="relative flex items-center justify-center"
          >
            <div className="h-24 w-24 rounded-full border-2 border-purple/80 bg-purple/20 flex items-center justify-center shadow-neon">
              <Eye size={44} className="text-purple animate-pulse" />
            </div>
          </motion.div>
        )}

        {id === 'zero' && (
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative flex items-center justify-center"
          >
            <div className="h-24 w-24 rounded-lg border border-slate-400/40 bg-slate-800/50 flex items-center justify-center">
              <Terminal size={40} className="text-slate-200" />
            </div>
          </motion.div>
        )}

        {id === 'admin' && (
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative flex items-center justify-center"
          >
            <div className="h-28 w-28 rounded-none border-2 border-rose-500 bg-rose-950/40 flex items-center justify-center">
              <Shield size={48} className="text-rose-500" />
            </div>
          </motion.div>
        )}

        {/* Scanline effect on portrait */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent pointer-events-none animate-scanline" />

        {/* Corner HUD markers */}
        <div className="absolute top-2 left-2 text-[9px] font-mono opacity-60" style={{ color: char.color }}>
          {char.id.toUpperCase()} // 0x99
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono opacity-60" style={{ color: char.color }}>
          {char.glitchPercent}% CORRUPT
        </div>
      </div>

      {mood && (
        <div
          className="mt-3 rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-widest backdrop-blur-md"
          style={{ borderColor: `${char.color}40`, color: char.color, backgroundColor: `${char.color}10` }}
        >
          {mood}
        </div>
      )}
    </div>
  );
}
