import { Activity, BatteryMedium, CloudOff, Cpu, FolderOpen, HardDrive, WifiOff } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { locationSystemNames } from '../data/os';
import { dialogue } from '../data/world';
import { useGame } from '../state/GameProvider';

export function OSFrame() {
  const { state } = useGame();
  const line = dialogue[state.currentLineId];
  const progress = Math.min(99, Math.round(((state.completedEpisodes.length + state.unlockedMemories.length) / 11) * 100));
  return (
    <>
      <aside className="os-dock" aria-label="Operating system dock">
        <NavLink to="/story" aria-label="Story process"><Cpu size={19} /></NavLink>
        <NavLink to="/journal" aria-label="Journal"><FolderOpen size={19} /></NavLink>
        <NavLink to="/inventory" aria-label="Inventory"><HardDrive size={19} /></NavLink>
        <NavLink to="/saves" aria-label="Save slots"><BatteryMedium size={19} /></NavLink>
      </aside>
      <div className="os-status">
        <span><Activity size={14} /> corruption {progress}%</span>
        <span><WifiOff size={14} /> offline</span>
        <span><CloudOff size={14} /> cloud save optional</span>
        <span>{locationSystemNames[line?.location ?? 'white-room']}</span>
      </div>
    </>
  );
}
