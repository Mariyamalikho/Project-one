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
  unlockMemory?: string;
  unlockAchievement?: string;
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

export interface GameState {
  currentLineId: string;
  completedEpisodes: string[];
  unlockedMemories: string[];
  unlockedAchievements: string[];
  visitedLocations: LocationId[];
  emotion: Record<EmotionKey, number>;
  relationship: Record<CharacterId, number>;
  ending?: 'reboot' | 'sanctuary' | 'mirror';
  settings: {
    muted: boolean;
    volume: number;
    reduceMotion: boolean;
  };
}

export type GameAction =
  | { type: 'ADVANCE'; lineId: string }
  | { type: 'CHOOSE'; choice: Choice }
  | { type: 'COMPLETE_EPISODE'; episodeId: string }
  | { type: 'VISIT_LOCATION'; locationId: LocationId }
  | { type: 'UNLOCK_MEMORY'; memoryId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'SET_SETTING'; key: keyof GameState['settings']; value: boolean | number }
  | { type: 'RESET' };
