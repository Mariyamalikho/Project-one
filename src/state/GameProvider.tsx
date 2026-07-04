import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { achievements, dialogue, episodes } from '../data/world';
import type { GameAction, GameState, SaveSlot } from '../types';
import { clearState, defaultState, loadSlots, loadState, saveSlots, saveState } from './storage';

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  slots: SaveSlot[];
  writeSlot: (slotId: string) => void;
  loadSlot: (slotId: string) => void;
  toast?: string;
  reset: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function episodeIdForLocation(location?: string) {
  return episodes.find((episode) => episode.location === location)?.id;
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADVANCE': {
      const currentLine = dialogue[state.currentLineId];
      const line = dialogue[action.lineId];
      const completedEpisodeId = currentLine?.location !== line?.location ? episodeIdForLocation(currentLine?.location) : undefined;
      return {
        ...state,
        currentLineId: action.lineId,
        completedEpisodes: completedEpisodeId ? unique([...state.completedEpisodes, completedEpisodeId]) : state.completedEpisodes,
        visitedLocations: line ? unique([...state.visitedLocations, line.location]) : state.visitedLocations,
        unlockedMemories: line?.unlockMemory ? unique([...state.unlockedMemories, line.unlockMemory]) : state.unlockedMemories,
        unlockedAchievements: line?.unlockAchievement
          ? unique([...state.unlockedAchievements, line.unlockAchievement])
          : state.unlockedAchievements,
        terminalHistory: unique([...state.terminalHistory, `route:${line?.location ?? 'unknown'} line:${action.lineId}`]).slice(-18),
      };
    }
    case 'CHOOSE': {
      const currentLine = dialogue[state.currentLineId];
      const nextLine = dialogue[action.choice.next];
      const completedEpisodeId =
        currentLine?.location !== nextLine?.location ? episodeIdForLocation(currentLine?.location) : undefined;
      const emotion = { ...state.emotion };
      const relationship = { ...state.relationship };
      Object.entries(action.choice.emotion ?? {}).forEach(([key, value]) => {
        const emotionKey = key as keyof GameState['emotion'];
        emotion[emotionKey] = Math.max(0, Math.min(10, emotion[emotionKey] + (value ?? 0)));
      });
      Object.entries(action.choice.relationship ?? {}).forEach(([key, value]) => {
        const relationshipKey = key as keyof GameState['relationship'];
        relationship[relationshipKey] = Math.max(-5, Math.min(10, relationship[relationshipKey] + (value ?? 0)));
      });
      return {
        ...state,
        currentLineId: action.choice.next,
        completedEpisodes: completedEpisodeId ? unique([...state.completedEpisodes, completedEpisodeId]) : state.completedEpisodes,
        emotion,
        relationship,
        visitedLocations: nextLine ? unique([...state.visitedLocations, nextLine.location]) : state.visitedLocations,
        unlockedMemories: action.choice.unlockMemory
          ? unique([...state.unlockedMemories, action.choice.unlockMemory])
          : state.unlockedMemories,
        unlockedAchievements: action.choice.unlockAchievement
          ? unique([...state.unlockedAchievements, action.choice.unlockAchievement])
          : state.unlockedAchievements,
        journalEntries: action.choice.addJournal ? unique([...state.journalEntries, action.choice.addJournal]) : state.journalEntries,
        inventory: action.choice.addInventory ? unique([...state.inventory, action.choice.addInventory]) : state.inventory,
        terminalHistory: unique([...state.terminalHistory, `choice:${action.choice.id}`]).slice(-18),
      };
    }
    case 'COMPLETE_EPISODE':
      return { ...state, completedEpisodes: unique([...state.completedEpisodes, action.episodeId]) };
    case 'VISIT_LOCATION':
      return { ...state, visitedLocations: unique([...state.visitedLocations, action.locationId]) };
    case 'UNLOCK_MEMORY':
      return { ...state, unlockedMemories: unique([...state.unlockedMemories, action.memoryId]) };
    case 'UNLOCK_ACHIEVEMENT':
      return { ...state, unlockedAchievements: unique([...state.unlockedAchievements, action.achievementId]) };
    case 'ADD_JOURNAL':
      return { ...state, journalEntries: unique([...state.journalEntries, action.entryId]) };
    case 'ADD_INVENTORY':
      return { ...state, inventory: unique([...state.inventory, action.itemId]) };
    case 'LOG_TERMINAL':
      return { ...state, terminalHistory: [...state.terminalHistory, action.line].slice(-18) };
    case 'SET_BOOTED':
      return { ...state, booted: action.booted };
    case 'LOAD_STATE':
      return action.state;
    case 'SET_SETTING':
      return { ...state, settings: { ...state.settings, [action.key]: action.value } };
    case 'RESET':
      clearState();
      return defaultState;
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  const [slots, setSlots] = useState<SaveSlot[]>(loadSlots);
  const [toast, setToast] = useState<string>();
  const achievementCount = state.unlockedAchievements.length;

  useEffect(() => saveState(state), [state]);
  useEffect(() => saveSlots(slots), [slots]);

  useEffect(() => {
    if (!achievementCount) return;
    const lastId = state.unlockedAchievements[achievementCount - 1];
    setToast(achievements.find((achievement) => achievement.id === lastId)?.title);
    const timer = window.setTimeout(() => setToast(undefined), 3200);
    return () => window.clearTimeout(timer);
  }, [achievementCount, state.unlockedAchievements]);

  function writeSlot(slotId: string) {
    const nextState = { ...state, activeSlot: slotId, booted: true };
    setSlots((items) =>
      items.map((slot) => (slot.id === slotId ? { ...slot, savedAt: new Date().toISOString(), state: nextState } : slot)),
    );
    dispatch({ type: 'LOAD_STATE', state: nextState });
  }

  function loadSlot(slotId: string) {
    const slot = slots.find((item) => item.id === slotId);
    if (slot?.state) dispatch({ type: 'LOAD_STATE', state: { ...slot.state, activeSlot: slotId, booted: true } });
  }

  const value = useMemo(
    () => ({ state, dispatch, slots, writeSlot, loadSlot, toast, reset: () => dispatch({ type: 'RESET' }) }),
    [slots, state, toast],
  );
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used inside GameProvider');
  return context;
}
