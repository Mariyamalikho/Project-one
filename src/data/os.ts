import type { CharacterId, LocationId } from '../types';

export const journalEntries = [
  { id: 'j-boot', title: 'Kernel Prayer', body: 'The room booted before Evaa did. Bugsy says the walls are honest if you ignore the screaming pixels.' },
  { id: 'j-glass', title: 'Handprint In Glass', body: 'Marry speaks from the reflection like a child hiding under a table during a storm.' },
  { id: 'j-city', title: 'Billboard Eyes', body: 'Neon City knows Evaa by silhouette. Every advert stares back with borrowed pupils.' },
  { id: 'j-core', title: 'Partition Wound', body: 'Bugsy split a feeling into a child-shaped process and called it protection.' },
  { id: 'j-sanctuary', title: 'A Sky That Stays', body: 'Forgiveness did not reboot the world. It made the broken sky bearable.' },
];

export const inventoryItems = [
  { id: 'i-terminal', title: 'Cracked Terminal Key', type: 'tool', body: 'Unlocks console commands and lets Evaa hear the OS breathe.' },
  { id: 'i-glass', title: 'Glass Handprint', type: 'relic', body: 'Warm to the touch. The scan says it is younger than Evaa and older than grief.' },
  { id: 'i-ticket', title: 'Platform Zero Ticket', type: 'key item', body: 'A one-way fare to before. The destination keeps changing when Marry looks at it.' },
  { id: 'i-artwork', title: 'Secret Sanctuary Sketch', type: 'artwork', body: 'A hidden drawing file recovered from a folder named DO_NOT_OPEN_ME.' },
];

export const relationshipNotes: Record<CharacterId, string> = {
  eva: 'Evaa becomes more stable when she accepts contradiction instead of deleting it.',
  marry: 'Marry responds to trust, patience, and drawings restored with care.',
  bugsy: 'Bugsy hides tenderness behind diagnostics. His sarcasm spikes when he is afraid.',
  zero: 'Zero provides cryptographically signed guidance when Evaa is ready for truth.',
  admin: 'System Administrator represents rigid emotional walls built to block pain.',
};

export const locationSystemNames: Record<LocationId, string> = {
  'white-room': 'BOOT_CHAMBER',
  'neon-city': 'RAIN_DISTRICT',
  'memory-forest': 'BLACK_ORCHARD',
  'broken-station': 'PLATFORM_ZERO',
  'archive-core': 'ROOT_ARCHIVE',
  'reflection-lake': 'MIRROR_BASIN',
  'final-sanctuary': 'SANCTUARY_EXE',
};

export const easterEggs = [
  'type MARRY in the secret terminal',
  'type BUTTERFLY in the secret terminal',
  'reconstruct the corrupted butterfly sketch',
  'complete all 30 episodes across 3 acts',
];
