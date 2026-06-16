import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../state/GameProvider';

const responses: Record<string, string> = {
  EVA: 'MARRY_PROCESS: not missing. nested. alias EVA accepted.',
  MARRY: 'MARRY_PROCESS: not missing. nested.',
  MERCI: 'EVAA_USER: elevated permissions require self-compassion. alias MERCI accepted.',
  EVAA: 'EVAA_USER: elevated permissions require self-compassion.',
  REBOOT: 'LOCAL_SAVE: reset command armed.',
  HOME: 'ROUTE: landing sequence restored.',
  ARCHIVE: 'ROUTE: character archive exposed.',
};

export function SecretConsole({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<string[]>(['console ready. commands: MARRY / EVAA / REBOOT / HOME / ARCHIVE']);
  const navigate = useNavigate();
  const { reset } = useGame();

  function submit(event: FormEvent) {
    event.preventDefault();
    const command = input.trim().toUpperCase();
    if (!command) return;
    setInput('');
    setLog((items) => [...items, `> ${command}`, responses[command] ?? 'UNKNOWN_COMMAND: static answers in your voice.']);
    if (command === 'HOME') navigate('/');
    if (command === 'ARCHIVE') navigate('/archive');
    if (command === 'REBOOT') reset();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section
            initial={{ y: 22, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            className="holo-panel w-full max-w-2xl p-0"
            role="dialog"
            aria-modal="true"
            aria-label="Secret command console"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <p className="font-display text-cyan">hidden console</p>
              <button className="icon-button" type="button" onClick={onClose} aria-label="Close console">
                <X size={18} />
              </button>
            </div>
            <div className="h-72 overflow-auto p-4 font-mono text-sm text-acid">
              {log.map((item, index) => (
                <p key={`${item}-${index}`}>{item}</p>
              ))}
            </div>
            <form onSubmit={submit} className="border-t border-white/10 p-4">
              <label className="sr-only" htmlFor="console-command">
                Console command
              </label>
              <div className="flex gap-2">
                <input
                  id="console-command"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="min-w-0 flex-1 rounded border border-cyan/30 bg-black/60 px-4 py-3 font-mono text-cyan outline-none focus:border-cyan"
                  placeholder="ENTER COMMAND"
                  autoFocus
                />
                <button className="icon-button" type="submit" aria-label="Run command">
                  <CornerDownLeft size={18} />
                </button>
              </div>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
