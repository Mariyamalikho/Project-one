import type { CharacterId, LocationId } from '../types';

export const journalEntries = [
  { id: 'j-boot', title: 'Kernel Prayer', body: 'The room booted before Evaa did. Bot says the walls are honest if you ignore the screaming pixels.' },
  { id: 'j-glass', title: 'Handprint In Glass', body: 'Marry speaks from the reflection like a child hiding under a table during a storm.' },
  { id: 'j-city', title: 'Billboard Eyes', body: 'Neon City knows Evaa by silhouette. Every advert stares back with borrowed pupils.' },
  { id: 'j-core', title: 'Partition Wound', body: 'Bot split a feeling into a child-shaped process and called it protection.' },
  { id: 'j-sanctuary', title: 'A Sky That Stays', body: 'Forgiveness did not reboot the world. It made the broken sky bearable.' },
];

export const inventoryItems = [
  { id: 'i-terminal', title: 'Cracked Terminal Key', type: 'tool', body: 'Unlocks console commands and lets Evaa hear the OS breathe.' },
  { id: 'i-glass', title: 'Glass Handprint', type: 'relic', body: 'Warm to the touch. The scan says it is younger than Evaa and older than grief.' },
  { id: 'i-ticket', title: 'Platform Zero Ticket', type: 'key item', body: 'A one-way fare to before. The destination keeps changing when Marry looks at it.' },
  { id: 'i-artwork', title: 'Secret Sanctuary Sketch', type: 'artwork', body: 'A hidden image file recovered from a folder named DO_NOT_OPEN_ME.' },
];

export const relationshipNotes: Record<CharacterId, string> = {
  merci: 'Evaa becomes more stable when she accepts contradiction instead of deleting it.',
  eva: 'Marry responds to trust, patience, and memories recovered without force.',
  bot: 'Bot hides tenderness behind diagnostics. Its sarcasm spikes when it is afraid.',
};

export const locationSystemNames: Record<LocationId, string> = {
  'white-room': 'BOOT_CHAMBER',
  'neon-city': 'RAIN_DISTRICT',
  'memory-forest': 'BLACK_ORCHARD',
  'archive-core': 'ROOT_ARCHIVE',
  'broken-station': 'PLATFORM_ZERO',
  'final-sanctuary': 'SANCTUARY_EXE',
};

export const easterEggs = ['type MARRY in the terminal', 'scan the paper moon', 'recover three memories', 'open archive after Bot apologizes'];
