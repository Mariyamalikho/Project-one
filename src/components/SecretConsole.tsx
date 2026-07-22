import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useGame } from '../state/GameProvider';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SecretConsole({ open, onClose }: Props) {
  const { state, dispatch } = useGame();
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'glitch.exe terminal subsystem initialized [v7.03]',
    'Type HELP for available system operations.',
    'System status: ARCHIVE_CONTAINMENT_ACTIVE',
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, open]);

  function executeCommand(e: React.FormEvent) {
    e.preventDefault();
    const command = input.trim().toUpperCase();
    if (!command) return;

    const newLogs = [...logs, `> ${input}`];

    switch (command) {
      case 'HELP':
        newLogs.push(
          'AVAILABLE SYSTEM COMMANDS:',
          '  SCAN      - Scan local memory sectors for corrupted fragments',
          '  DECRYPT   - Attempt decryption of root identity payload',
          '  RECOVER   - Restore last verified subconscious checkpoint',
          '  ARCHIVE   - View archived process registry',
          '  HOME      - Return to kernel root desktop',
          '  STATUS    - Output current emotional & system stability diagnostics',
          '  MEMORY    - List unlocked memory fragment hashes',
          '  REBOOT    - Re-initialize kernel simulation',
          '  CLEAR     - Wipe terminal screen buffer'
        );
        break;

      case 'SCAN':
        newLogs.push(
          '[+] SCANNING ECHO GRID SECTORS...',
          '  Sector 0 (White Room): CLEAN',
          '  Sector 1 (Neon City): 2 Memory fragments detected',
          '  Sector 2 (Memory Forest): High density of butterfly glyphs',
          '  Sector 3 (Archive Core): LOCKED behind suppressed emotion cipher'
        );
        break;

      case 'DECRYPT':
        newLogs.push(
          '[!] DECRYPTION INITIATED...',
          '  Extracting identity payload: [E-V-A-A]',
          '  Child process payload detected: [M-A-R-R-Y]',
          '  Result: Marry is not an intruder. Marry is the archived self.'
        );
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'a-terminal' });
        break;

      case 'RECOVER':
        newLogs.push('[+] Subconscious memory cache synced to active RAM buffer.');
        break;

      case 'ARCHIVE':
        newLogs.push(
          'ARCHIVED PROCESS DUMP:',
          '  PID 001: EVAA.exe [STATUS: ACTIVE / SUPPRESSED EMOTION]',
          '  PID 002: MARRY.sys [STATUS: ARCHIVED / CREATIVE CORE]',
          '  PID 003: BUGSY.daemon [STATUS: MONITORING]',
          '  PID 004: SYSTEM_ADMIN.root [STATUS: PURGE INITIATED]'
        );
        break;

      case 'STATUS': {
        const totalUnlocked = state.unlockedMemories.length;
        const totalEp = state.completedEpisodes.length;
        const stability = Math.min(100, Math.round(((totalUnlocked + totalEp) / 35) * 100));
        newLogs.push(
          `SYSTEM DIAGNOSTICS:`,
          `  System Stability: ${stability}%`,
          `  Completed Episodes: ${totalEp} / 30`,
          `  Recovered Memories: ${totalUnlocked} / 6`,
          `  Vulnerability Index: ${state.emotion.vulnerability}/10`,
          `  Empathy Index: ${state.emotion.empathy}/10`
        );
        break;
      }

      case 'MEMORY':
        newLogs.push(
          'UNLOCKED MEMORY FRAGMENTS:',
          ...state.unlockedMemories.map((m) => `  [HASH] ${m.toUpperCase()}`),
          state.unlockedMemories.length === 0 ? '  No memories unlocked yet.' : ''
        );
        break;

      case 'MARRY':
        newLogs.push(
          '[SECRET COMMAND ACCEPTED]',
          '  "I was never gone, Evaa."',
          '  Unlocking secret archived drawing entry...'
        );
        dispatch({ type: 'UNLOCK_MEMORY', memoryId: 'm-sanctuary' });
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'a-terminal' });
        break;

      case 'EVAA':
        newLogs.push(
          '[SECRET COMMAND ACCEPTED]',
          '  "If it\'s broken... maybe it was trying to tell me something."'
        );
        break;

      case 'BUGSY':
        newLogs.push(
          '[SECRET COMMAND ACCEPTED]',
          '  Bugsy: "Hey! Stop sniffing through terminal binaries! I\'m trying to render butterflies here!"'
        );
        break;

      case 'BUTTERFLY':
        newLogs.push(
          '🦋 🦋 🦋 BUTTERFLY PROTOCOL ACTIVATED 🦋 🦋 🦋',
          '  Subconscious healing accelerated.'
        );
        break;

      case 'CLEAR':
        setLogs([]);
        setInput('');
        return;

      case 'REBOOT':
        newLogs.push('[!] System rebooting...');
        dispatch({ type: 'SET_BOOTED', booted: false });
        onClose();
        break;

      default:
        newLogs.push(`Command not recognized: "${command}". Type HELP for available commands.`);
        break;
    }

    setLogs(newLogs);
    dispatch({ type: 'LOG_TERMINAL', line: command });
    setInput('');
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-[80vh] w-full max-w-3xl flex-col rounded-xl border border-cyan/40 bg-black/95 font-mono shadow-2xl shadow-cyan/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan/20 bg-void-dark px-4 py-3 text-cyan">
              <div className="flex items-center gap-2">
                <Terminal size={18} />
                <span className="text-xs uppercase tracking-widest font-bold">glitch.exe // SECRET TERMINAL</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 text-xs space-y-1.5 text-cyan-200">
              {logs.map((log, i) => (
                <p key={i} className={log.startsWith('>') ? 'text-pink font-bold' : log.includes('SECRET') || log.includes('🦋') ? 'text-yellow-300 font-bold' : ''}>
                  {log}
                </p>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={executeCommand} className="flex border-t border-cyan/20 bg-void-dark p-3">
              <span className="mr-2 text-cyan font-bold">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command (e.g. HELP, SCAN, DECRYPT, MARRY)..."
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                autoFocus
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
