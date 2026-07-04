import type { GameState, SaveSlot } from '../types';

const KEY = 'glitch.exe.save.v1';
const SLOT_KEY = 'glitch.exe.slots.v1';

export const defaultState: GameState = {
  currentLineId: 'boot-01',
  completedEpisodes: [],
  unlockedMemories: [],
  unlockedAchievements: [],
  journalEntries: ['j-boot'],
  inventory: ['i-terminal'],
  terminalHistory: ['glitch/os: kernel listening'],
  activeSlot: 'slot-1',
  booted: false,
  visitedLocations: ['white-room'],
  emotion: { innocence: 3, resolve: 2, dread: 1, trust: 0 },
  relationship: { merci: 0, eva: 0, bot: 0 },
  settings: { muted: true, volume: 0.35, reduceMotion: false, highContrast: false, cursorFx: true },
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
    // Ignore malformed slots and rebuild the shell.
  }
  return [
    { id: 'slot-1', label: 'Slot 01' },
    { id: 'slot-2', label: 'Slot 02' },
    { id: 'slot-3', label: 'Slot 03' },
  ];
}

export function saveSlots(slots: SaveSlot[]) {
  localStorage.setItem(SLOT_KEY, JSON.stringify(slots));
}

export function clearState() {
  localStorage.removeItem(KEY);
}
