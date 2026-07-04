import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../state/GameProvider';

const messages = ['FRAME LOST', 'MARRY_SIGNAL', 'DO NOT DELETE HER', 'MEMORY LEAK', 'EVAa://awake'];

export function GlitchOverlay() {
  const { state, dispatch } = useGame();
  const [active, setActive] = useState(false);
  const intensity = Math.min(1, (state.emotion.dread + state.unlockedMemories.length + state.completedEpisodes.length) / 18);
  const message = useMemo(() => messages[(state.unlockedMemories.length + state.completedEpisodes.length) % messages.length], [state.completedEpisodes.length, state.unlockedMemories.length]);

  useEffect(() => {
    if (state.settings.reduceMotion) return;
    const delay = 9000 + Math.max(0, 7000 - intensity * 5000);
    const timer = window.setInterval(() => {
      setActive(true);
      dispatch({ type: 'LOG_TERMINAL', line: `glitch:${message.toLowerCase()}` });
      window.setTimeout(() => setActive(false), 520);
    }, delay);
    return () => window.clearInterval(timer);
  }, [dispatch, intensity, message, state.settings.reduceMotion]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div className="glitch-event" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
