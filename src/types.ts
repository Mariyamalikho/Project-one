export type CharacterId = 'eva' | 'marry' | 'bugsy' | 'zero' | 'admin';

export type EmotionKey = 'vulnerability' | 'resolve' | 'empathy' | 'suppression';

export type LocationId =
  | 'white-room'
  | 'neon-city'
  | 'memory-forest'
  | 'broken-station'
  | 'archive-core'
  | 'reflection-lake'
  | 'final-sanctuary';

export type MemoryKind = 'sketch' | 'photo' | 'audio' | 'terminal' | 'corrupt';

export type MinigameType = 'sketch-repair' | 'node-connect' | 'audio-tune' | 'hex-decrypt' | 'photo-lens';

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
  triggerMinigame?: MinigameType;
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
  triggerMinigame?: MinigameType;
}

export interface Episode {
  id: string;
  act: 1 | 2 | 3;
  actName: string;
  episodeNumber: number;
  title: string;
  subtitle: string;
  startLine: string;
  requiredEpisode?: string;
  location: LocationId;
  summary?: string;
}

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  alias: string;
  role: string;
  portraitStyle: 'eva' | 'marry' | 'bugsy' | 'zero' | 'admin';
  color: string;
  secondaryColor: string;
  quote: string;
  biography: string;
  voiceProfile: string;
  glitchPercent: number;
  emotionalState: string;
  secrets: string[];
  timeline: string[];
  relationships: Array<{ characterId: CharacterId; level: number; note: string }>;
}

export interface LocationNode {
  id: LocationId;
  name: string;
  systemName: string;
  subtitle: string;
  x: number;
  y: number;
  unlockEpisode?: string;
  description: string;
  healedDescription: string;
}

export interface MemoryFragment {
  id: string;
  title: string;
  kind: MemoryKind;
  location: LocationId;
  body: string;
  image?: string;
  audioFreq?: number;
  hexCode?: string;
  minigame?: MinigameType;
  repaired?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'story' | 'exploration' | 'secret' | 'link' | 'terminal';
  description: string;
  icon: string;
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
  repairedMemories: string[];
  unlockedAchievements: string[];
  journalEntries: string[];
  inventory: string[];
  terminalHistory: string[];
  activeSlot: string;
  booted: boolean;
  visitedLocations: LocationId[];
  emotion: Record<EmotionKey, number>;
  relationship: Record<CharacterId, number>;
  ending?: 'reboot' | 'sanctuary' | 'convergence';
  settings: {
    muted: boolean;
    volume: number;
    reduceMotion: boolean;
    highContrast: boolean;
    cursorFx: boolean;
    typewriterSpeed: number;
  };
}

export type GameAction =
  | { type: 'ADVANCE'; lineId: string }
  | { type: 'CHOOSE'; choice: Choice }
  | { type: 'COMPLETE_EPISODE'; episodeId: string }
  | { type: 'VISIT_LOCATION'; locationId: LocationId }
  | { type: 'UNLOCK_MEMORY'; memoryId: string }
  | { type: 'REPAIR_MEMORY'; memoryId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'ADD_JOURNAL'; entryId: string }
  | { type: 'ADD_INVENTORY'; itemId: string }
  | { type: 'LOG_TERMINAL'; line: string }
  | { type: 'SET_BOOTED'; booted: boolean }
  | { type: 'LOAD_STATE'; state: GameState }
  | { type: 'SET_SETTING'; key: keyof GameState['settings']; value: boolean | number }
  | { type: 'RESET' };
