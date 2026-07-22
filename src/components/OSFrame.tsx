import { Activity, BatteryMedium, Cpu, FolderOpen, HardDrive, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { dialogue, locations } from '../data/world';
import { useGame } from '../state/GameProvider';

export function OSFrame() {
  const { state } = useGame();
  const line = dialogue[state.currentLineId];
  const currentLocation = locations.find((l) => l.id === (line?.location ?? 'white-room'));

  const totalEpisodes = state.completedEpisodes.length;
  const totalMemories = state.unlockedMemories.length;
  const stability = Math.min(100, Math.round(((totalEpisodes + totalMemories) / 36) * 100));
  const glitchPercent = Math.max(0, 100 - stability);

  return (
    <>
      {/* Floating OS Dock */}
      <aside className="os-dock" aria-label="Operating system dock">
        <NavLink to="/story" aria-label="Story mode" className={({ isActive }) => (isActive ? 'text-cyan' : '')}>
          <Cpu size={19} />
        </NavLink>
        <NavLink to="/episodes" aria-label="Episodes" className={({ isActive }) => (isActive ? 'text-pink' : '')}>
          <Sparkles size={19} />
        </NavLink>
        <NavLink to="/journal" aria-label="Journal" className={({ isActive }) => (isActive ? 'text-purple' : '')}>
          <FolderOpen size={19} />
        </NavLink>
        <NavLink to="/inventory" aria-label="Inventory" className={({ isActive }) => (isActive ? 'text-cyan' : '')}>
          <HardDrive size={19} />
        </NavLink>
        <NavLink to="/saves" aria-label="Save slots" className={({ isActive }) => (isActive ? 'text-green-400' : '')}>
          <BatteryMedium size={19} />
        </NavLink>
      </aside>

      {/* Top Status Bar */}
      <div className="os-status">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-cyan">
          <Activity size={13} /> STABILITY: {stability}%
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-pink">
          GLITCH: {glitchPercent}%
        </span>
        <span className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-purple">
          <ShieldCheck size={13} /> {currentLocation?.systemName || 'BOOT_CHAMBER'}
        </span>
      </div>
    </>
  );
}
