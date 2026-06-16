import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { achievements, dialogue, episodes } from '../data/world';
import type { GameAction, GameState } from '../types';
import { clearState, defaultState, loadState, saveState } from './storage';

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
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
      };
    }
    case 'CHOOSE': {
      const currentLine = dialogue[state.currentLineId];
      const nextLine = dialogue[action.choice.next];
      const completedEpisodeId =
        currentLine?.location !== nextLine?.location ? episodeIdForLocation(currentLine?.location) : undefined;
      const emotion = { ...state.emotion };
      Object.entries(action.choice.emotion ?? {}).forEach(([key, value]) => {
        const emotionKey = key as keyof GameState['emotion'];
        emotion[emotionKey] = Math.max(0, Math.min(10, emotion[emotionKey] + (value ?? 0)));
      });
      return {
        ...state,
        currentLineId: action.choice.next,
        completedEpisodes: completedEpisodeId ? unique([...state.completedEpisodes, completedEpisodeId]) : state.completedEpisodes,
        emotion,
        visitedLocations: nextLine ? unique([...state.visitedLocations, nextLine.location]) : state.visitedLocations,
        unlockedMemories: action.choice.unlockMemory
          ? unique([...state.unlockedMemories, action.choice.unlockMemory])
          : state.unlockedMemories,
        unlockedAchievements: action.choice.unlockAchievement
          ? unique([...state.unlockedAchievements, action.choice.unlockAchievement])
          : state.unlockedAchievements,
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
  const [toast, setToast] = useState<string>();
  const achievementCount = state.unlockedAchievements.length;

  useEffect(() => saveState(state), [state]);

  useEffect(() => {
    if (!achievementCount) return;
    const lastId = state.unlockedAchievements[achievementCount - 1];
    setToast(achievements.find((achievement) => achievement.id === lastId)?.title);
    const timer = window.setTimeout(() => setToast(undefined), 3200);
    return () => window.clearTimeout(timer);
  }, [achievementCount, state.unlockedAchievements]);

  const value = useMemo(() => ({ state, dispatch, toast, reset: () => dispatch({ type: 'RESET' }) }), [state, toast]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used inside GameProvider');
  return context;
}
