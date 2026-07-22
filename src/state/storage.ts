import type { GameState, SaveSlot } from '../types';

const KEY = 'glitch.exe.save.v2';
const SLOT_KEY = 'glitch.exe.slots.v2';

export const defaultState: GameState = {
  currentLineId: 'ep1-1',
  completedEpisodes: [],
  unlockedMemories: [],
  repairedMemories: [],
  unlockedAchievements: [],
  journalEntries: ['j-boot'],
  inventory: ['i-terminal'],
  terminalHistory: ['glitch/os: kernel initialized'],
  activeSlot: 'slot-1',
  booted: false,
  visitedLocations: ['white-room'],
  emotion: { vulnerability: 3, resolve: 3, empathy: 2, suppression: 2 },
  relationship: { eva: 0, marry: 0, bugsy: 0, zero: 0, admin: 0 },
  settings: {
    muted: true,
    volume: 0.35,
    reduceMotion: false,
    highContrast: false,
    cursorFx: true,
    typewriterSpeed: 25,
  },
};

export function loadState(): GameState {
  try {
    const raw = localStorage.getItem(KEY);
    return hydrateState(raw ? JSON.parse(raw) : defaultState);
  } catch {
    return defaultState;
  }
}

export function saveState(state: GameState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function hydrateState(state: Partial<GameState>): GameState {
  return {
    ...defaultState,
    ...state,
    repairedMemories: state.repairedMemories || [],
    emotion: { ...defaultState.emotion, ...state.emotion },
    relationship: { ...defaultState.relationship, ...state.relationship },
    settings: { ...defaultState.settings, ...state.settings },
  };
}

export function loadSlots(): SaveSlot[] {
  try {
    const raw = localStorage.getItem(SLOT_KEY);
    if (raw) return JSON.parse(raw).map((slot: SaveSlot) => ({ ...slot, state: slot.state ? hydrateState(slot.state) : undefined }));
  } catch {
    // Fallback to empty slots
  }
  return [
    { id: 'slot-1', label: 'Checkpoint 01: White Room' },
    { id: 'slot-2', label: 'Checkpoint 02: Subconscious Sector' },
    { id: 'slot-3', label: 'Checkpoint 03: Final Sanctuary' },
  ];
}

export function saveSlots(slots: SaveSlot[]) {
  localStorage.setItem(SLOT_KEY, JSON.stringify(slots));
}

export function clearState() {
  localStorage.removeItem(KEY);
}
