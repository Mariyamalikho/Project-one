export type CharacterId = 'merci' | 'eva' | 'bot';
export type EmotionKey = 'innocence' | 'resolve' | 'dread' | 'trust';
export type LocationId =
  | 'white-room'
  | 'neon-city'
  | 'memory-forest'
  | 'archive-core'
  | 'broken-station'
  | 'final-sanctuary';

export type MemoryKind = 'image' | 'audio' | 'text' | 'corrupt';

export interface Choice {
  id: string;
  label: string;
  next: string;
  emotion?: Partial<Record<EmotionKey, number>>;
  relationship?: Partial<Record<CharacterId, number>>;
  unlockMemory?: string;
  unlockAchievement?: string;
  addJournal?: string;
  addInventory?: string;
}

export interface DialogueLine {
  id: string;
  character: CharacterId;
  text: string;
  mood: string;
  location: LocationId;
  choices?: Choice[];
  next?: string;
  unlockMemory?: string;
  unlockAchievement?: string;
}

export interface Episode {
  id: string;
  title: string;
  subtitle: string;
  startLine: string;
  requiredEpisode?: string;
  location: LocationId;
}

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  role: string;
  portrait: 'fractured-halo' | 'memory-orbit' | 'daemon-core';
  color: string;
  summary: string;
  secrets: string[];
}

export interface LocationNode {
  id: LocationId;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  unlockEpisode?: string;
  description: string;
}

export interface MemoryFragment {
  id: string;
  title: string;
  kind: MemoryKind;
  location: LocationId;
  body: string;
  image?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface SaveSlot {
  id: string;
  label: string;
  savedAt?: string;
  state?: GameState;
}

export interface GameState {
  currentLineId: string;
  completedEpisodes: string[];
  unlockedMemories: string[];
  unlockedAchievements: string[];
  journalEntries: string[];
  inventory: string[];
  terminalHistory: string[];
  activeSlot: string;
  booted: boolean;
  visitedLocations: LocationId[];
  emotion: Record<EmotionKey, number>;
  relationship: Record<CharacterId, number>;
  ending?: 'reboot' | 'sanctuary' | 'mirror';
  settings: {
    muted: boolean;
    volume: number;
    reduceMotion: boolean;
    highContrast: boolean;
    cursorFx: boolean;
  };
}

export type GameAction =
  | { type: 'ADVANCE'; lineId: string }
  | { type: 'CHOOSE'; choice: Choice }
  | { type: 'COMPLETE_EPISODE'; episodeId: string }
  | { type: 'VISIT_LOCATION'; locationId: LocationId }
  | { type: 'UNLOCK_MEMORY'; memoryId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'ADD_JOURNAL'; entryId: string }
  | { type: 'ADD_INVENTORY'; itemId: string }
  | { type: 'LOG_TERMINAL'; line: string }
  | { type: 'SET_BOOTED'; booted: boolean }
  | { type: 'LOAD_STATE'; state: GameState }
  | { type: 'SET_SETTING'; key: keyof GameState['settings']; value: boolean | number }
  | { type: 'RESET' };
